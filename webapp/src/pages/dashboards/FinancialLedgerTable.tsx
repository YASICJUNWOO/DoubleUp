import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Button,
    Dropdown,
    Flex,
    Form,
    GetRef,
    Input,
    InputRef,
    MenuProps,
    Popconfirm,
    Space,
    Table,
    TableProps,
    Tag,
    Typography
} from "antd";
import {Card} from "../../components";
import {ArrowLeftOutlined, ArrowRightOutlined, MinusCircleFilled} from "@ant-design/icons";
import {red} from "@ant-design/colors";
import {formatNumber} from "../../util/money";
import './css/FinacialLedger.css';
import dayjs from "dayjs";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    type: string;
    date: string;
    category: string;
    payment: string | null;
    name: string;
    amount: string;
    address: string;
}

interface EditableRowProps {
    index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
                                                                                title,
                                                                                editable,
                                                                                children,
                                                                                dataIndex,
                                                                                record,
                                                                                handleSave,
                                                                                ...restProps
                                                                            }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[{required: true, message: `${title} is required.`}]}
            >
                <Input
                    ref={inputRef}
                    onPressEnter={save}
                    onBlur={save}
                    style={{textAlign: 'center'}}
                />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{paddingInlineEnd: 24}}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

interface DataType {
    key: React.Key;
    type: string,
    date: string,
    category: string,
    payment: string | null,
    name: string;
    amount: number;
}

type ColumnTypes = Exclude<TableProps<DataType>['columns'], undefined>;

type Props = {
    year: number,
    handleYearChange: (year: number) => void
    saveLedger: (data: any) => void
}

export const FinancialLedgerTable: React.FC<Props> = ({
                                                         year,
                                                         handleYearChange,
                                                         saveLedger
                                                     }) => {

    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '0',
            type: '수입',
            date: "2023-01-01",
            category: "급여",
            payment: null,
            name: '월급',
            amount: 35_000,
        },
        {
            key: '1',
            type: '지출',
            date: "2023-01-10",
            category: "공과금",
            payment: "이체",
            name: '공과금 납부',
            amount: 400_000,
        },
    ]);

    useEffect(() => {
        console.log("초기 데이터:", dataSource); // 초기 데이터를 출력
    }, []);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        console.log("삭제할 데이터의 key:", key); // 삭제할 행의 key
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        console.log("삭제 후 데이터:", newData); // 삭제 후 남은 데이터
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: '구분',
            dataIndex: 'type',
            width: '5%',
            align: 'center',
            render: (_, record) =>
                <Typography.Text
                    strong
                    type={record.type === "수입" ? "success" : "danger"}
                >
                    {record.type}
                </Typography.Text>
        },
        {
            title: '날짜',
            dataIndex: 'date',
            width: '15%',
            align: 'center',
            editable: true,
        },
        {
            title: '카테고리',
            dataIndex: 'category',
            align: 'center',
            editable: true,
            render: (_, record) =>
                <Tag bordered={false} color="success">
                    {record.category}
                </Tag>
        },
        {
            title: '지불 방식',
            dataIndex: 'payment',
            align: 'center',
            editable: true,
        },
        {
            title: '내역',
            dataIndex: 'name',
            align: 'center',
            editable: true,
        },
        {
            title: '금액',
            dataIndex: 'amount',
            align: 'center',
            editable: true,
            render: (_, record) => formatNumber(record.amount),
        },
        {
            // title: 'operation',
            dataIndex: 'operation',
            align: 'center',
            width: '8%',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm
                        title="정말 삭제하시겠습니까?"
                        placement="topLeft"
                        showCancel={false}
                        okText="삭제"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <MinusCircleFilled
                            // onClick={() => handleDelete(record.key)}
                            style={{color: red[5], fontSize: "large"}}
                        />
                    </Popconfirm>
                ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            type: "수입",
            date: dayjs().format("YYYY-MM-DD"),
            category: "급여",
            payment: null,
            name: `Edward King ${count}`,
            amount: 80_000,
        };
        console.log("추가할 데이터:", newData); // 새로 추가할 데이터
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
        console.log("추가 후 데이터:", [...dataSource, newData]); // 추가 후 전체 데이터
    };


    const handleSave = (row: DataType) => {
        console.log("수정된 데이터:", row); // 수정된 데이터 값
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
        console.log("수정 후 데이터:", newData); // 수정 후 전체 데이터
    };


    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col; // 수정 불가능한 열은 그대로 반환
        }
        console.log("수정 가능한 열:", col); // 수정 가능한 열의 정보
        return {
            ...col,
            onCell: (record: DataType) => {
                console.log("현재 셀의 데이터:", record); // 셀에 적용될 데이터 출력
                return {
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave,
                };
            },
        };
    });

// 연도 범위 설정
    const startYear = 2020;
    const endYear = 2024;

// 연도 리스트 생성
    const years = Array.from({length: endYear - startYear + 1}, (_, index) => startYear + index);

    // 메뉴 항목 생성
    const items: MenuProps['items'] = years.map(year => ({
        key: year.toString(), // 고유한 키 설정 (문자열 형태)
        label: year.toString(), // 레이블 설정 (문자열 형태)
    }));

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const selectedYear = parseInt(e.key, 10);
       handleYearChange(selectedYear);
    };

    return (
        <Card
            title={
                <Flex justify="space-around" align="center">
                    <Button
                        icon={
                            <ArrowLeftOutlined
                                onClick={() => handleYearChange(year - 1)}
                            />}
                    />
                    <Space>
                        <Dropdown menu={{items, onClick: handleMenuClick}}>
                            <Button>
                                <Typography.Title level={5} style={{margin: "0px"}}>
                                    {year}
                                </Typography.Title>
                            </Button>
                        </Dropdown>

                        <Typography.Title level={5} style={{margin: "0px"}}>년 예산</Typography.Title>
                    </Space>
                    <Button
                        icon={
                            <ArrowRightOutlined
                                onClick={() => handleYearChange(year + 1)}
                            />}
                    />
                </Flex>
            }
        >
            <Space style={{display: "flex", justifyContent: "end"}}>
                <Button onClick={handleAdd} type="primary">
                    내역 추가
                </Button>
                <Button>
                    저장
                </Button>
            </Space>
            <Table<DataType>
                size="small"
                components={components}
                rowClassName={() => 'editable-row'}
                dataSource={dataSource}
                columns={columns as ColumnTypes}
                expandable={{
                    expandedRowRender: (record) => <p style={{margin: 0}}>{record.name}</p>,
                    // rowExpandable: (record) => record
                }}
            />
        </Card>
    );
}
import React, {useContext, useEffect, useRef, useState} from "react";
import {
    Button,
    Col,
    Divider,
    Dropdown,
    Flex,
    Form,
    GetRef,
    Input,
    InputRef,
    MenuProps,
    Row,
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
import {IncomeDetail} from "../../interface/interface";
import {ExpenseCategory, IncomeCategory} from "../../components/dashboard/ledger/LedgerAddModal";
import {IncomeGoal} from "../../components/dashboard/income/IncomeGoal";

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

type ColumnTypes = Exclude<TableProps<IncomeDetail>['columns'], undefined>;

type Props = {
    data: IncomeDetail[]
    year: number,
    month: number,
    handleDeleteIncomeDetail: (id: string) => void
    setIncomeDetailAddModalOpen: (open: boolean) => void
}

export const FinancialLedgerTable: React.FC<Props> = ({
                                                          data,
                                                          year,
                                                          month,
                                                          handleDeleteIncomeDetail,
                                                          setIncomeDetailAddModalOpen
                                                      }) => {

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: '구분',
            dataIndex: 'type',
            width: '5%',
            align: 'center',
            render: (_, record) =>
                <Typography.Text
                    strong
                    type={record.type === "INCOME" ? "success" : "danger"}
                >
                    {record.type === "INCOME" ? "수입" : "지출"}
                </Typography.Text>
        },
        {
            title: '날짜',
            dataIndex: 'date',
            width: '15%',
            align: 'center',
            editable: true,
            render: (_, record) =>
                dayjs(record.date).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: '카테고리',
            dataIndex: 'category',
            align: 'center',
            editable: true,
            render: (_, record) =>
                <Tag bordered={false} color="success">
                    {record.type === 'INCOME' ?
                        IncomeCategory[record.category as keyof typeof IncomeCategory].label :
                        ExpenseCategory[record.category as keyof typeof ExpenseCategory].label
                    }
                </Tag>
        },
        {
            title: '내역',
            dataIndex: 'content',
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
            dataIndex: 'operation',
            align: 'center',
            width: '8%',
            render: (_, record:IncomeDetail ) =>
                data.length >= 1 ?
                    <MinusCircleFilled
                        onClick={() => handleDeleteIncomeDetail(record.id)}
                        style={{color: red[5], fontSize: "large"}}
                    />
                : null,
        },
    ];

    const handleAdd = () => {
        setIncomeDetailAddModalOpen(true);
    };

    // ============================================================

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
        return {
            ...col,
            onCell: (record: DataType) => {
                return {
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title
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
        // handleYearChange(selectedYear);
    };

    return (
        <>
            <Card
                title={
                    <Flex justify="space-around" align="center">
                        <Button
                            icon={
                                <ArrowLeftOutlined
                                    // onClick={() => handleYearChange(year - 1)}
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

                            <Typography.Title level={5} style={{margin: "0px"}}>년 </Typography.Title>
                            <Typography.Title level={5} style={{margin: "0px"}}>{month} 월 </Typography.Title>
                        </Space>
                        <Button
                            icon={
                                <ArrowRightOutlined
                                    // onClick={() => handleYearChange(year + 1)}
                                />}
                        />
                    </Flex>
                }
            >
                <Row>
                    <Col span={12}>
                        <IncomeGoal
                            type='INCOME'
                            rangeType='MONTHLY'
                            year={year}
                            month={month}
                            data={data.filter((item) => item.type === 'INCOME').reduce((acc, cur) => acc + cur.amount, 0)}
                        />
                    </Col>
                    <Col span={12}>
                        <IncomeGoal
                            type='EXPENSE'
                            rangeType='MONTHLY'
                            year={year}
                            month={month}
                            data={data.filter((item) => item.type === 'EXPENSE').reduce((acc, cur) => acc + cur.amount, 0)}
                        />
                    </Col>
                </Row>
                <Divider/>
                <Space style={{display: "flex", justifyContent: "end"}}>
                    <Button onClick={handleAdd} type="primary">
                        내역 추가
                    </Button>
                </Space>
                <Table<IncomeDetail>
                    size="small"
                    components={components}
                    rowClassName={() => 'editable-row'}
                    dataSource={data}
                    columns={columns as ColumnTypes}
                />
            </Card>
        </>
    );
}
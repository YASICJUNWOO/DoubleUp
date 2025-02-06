import {Button, Col, DatePicker, Flex, Input, InputNumber, Modal, Radio, Row, Space, Typography} from "antd";
import {useFormik} from "formik";
import {EditFilled} from "@ant-design/icons";
import dayjs from "dayjs";
import {useEffect} from "react";

type Props = {
    visible: boolean;
    setVisible: (boolean: boolean) => void;
    year: number;
    month: number;
    onSaveIncomeDetail: (body: any) => void;
};

export const IncomeCategory = {
    SALARY: {
        label: '급여',
        icon: <EditFilled/>,
    },
    ALLOWANCE: {
        label: '수당',
        icon: <EditFilled/>,
    },
    BONUS: {
        label: '상여',
        icon: <EditFilled/>,
    },
    INCOME_ETC: {
        label: '기타',
        icon: <EditFilled/>,
    },
} as const;

export const ExpenseCategory = {
    FOOD: {
        label: '식비',
        icon: <EditFilled/>,
    },
    CLOTHES: {
        label: '의류',
        icon: <EditFilled/>,
    },
    TRANSPORTATION: {
        label: '교통',
        icon: <EditFilled/>,
    },
    COMMUNICATION: {
        label: '통신',
        icon: <EditFilled/>,
    },
    CULTURE: {
        label: '문화',
        icon: <EditFilled/>,
    },
    EDUCATION: {
        label: '교육',
        icon: <EditFilled/>,
    },
    MEDICAL: {
        label: '의료',
        icon: <EditFilled/>,
    },
    INSURANCE: {
        label: '보험',
        icon: <EditFilled/>,
    },
    TAX: {
        label: '세금',
        icon: <EditFilled/>,
    },
    PAY_ETC: {
        label: '기타',
        icon: <EditFilled/>,
    },
} as const;

export const ALL_CATEGORY = { ...IncomeCategory, ...ExpenseCategory };
export type IncomeCategoryType = keyof typeof IncomeCategory; // 타입 정의
export type ExpenseCategoryType = keyof typeof ExpenseCategory; // 타입 정의

export const LedgerAddModal: React.FC<Props> = ({
                                                    visible,
                                                    setVisible,
                                                    year,
                                                    month,
                                                    onSaveIncomeDetail
                                                }) => {

    console.log('LedgerAddModal', visible, year, month);

    const formik = useFormik({
        initialValues: {
            type: 'INCOME',
            category: 'SALARY',
            content: '',
            amount: 0,
            date: dayjs(`${year}-${month}-01`)
        },
        onSubmit: (values) => {
            const body = {
                ...values,
                type: values.type as 'INCOME' | 'EXPENSE',
                category: values.category as IncomeCategoryType | ExpenseCategoryType,
                date: values.date.format('YYYY-MM-DDTHH:mm:ss')
            };
            onSaveIncomeDetail(body);
        }
    });

    useEffect(() => {
        console.log('formik.values', formik.values);
    }, [formik.values]);

    return (
        <Modal
            title="가계부 추가"
            open={visible}
            onOk={formik.submitForm}
            onCancel={() => setVisible(false)}
        >
            <Row>
                <Col span={24}>
                    <Flex vertical align="start" gap={8}>
                        <Typography.Title level={5}> 종류 </Typography.Title>
                        <Radio.Group
                            name='type'
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            options={[
                                {value: 'INCOME', label: '수입'},
                                {value: 'EXPENSE', label: '지출'},
                            ]}
                        />
                    </Flex>
                </Col>
                <Col span={24}>
                    <Flex vertical align="start" gap={8}>
                        <Typography.Title level={5}> 카테고리 </Typography.Title>
                        <Space>
                            {formik.values.type === 'INCOME'
                                ? Object.entries(IncomeCategory).map(([key, category]) => (
                                    <Button
                                        key={key}
                                        icon={category.icon}
                                        onClick={() => formik.setFieldValue('category', key)} // key 값 설정
                                        style={{backgroundColor: formik.values.category === key ? '#e2ffd4' : 'white'}}
                                    >
                                        {category.label}
                                    </Button>
                                ))
                                : Object.entries(ExpenseCategory).map(([key, category]) => (
                                    <Button
                                        key={key}
                                        icon={category.icon}
                                        onClick={() => formik.setFieldValue('category', key)} // key 값 설정
                                        style={{backgroundColor: formik.values.category === key ? '#ffd4d4' : 'white'}}
                                    >
                                        {category.label}
                                    </Button>
                                ))}
                        </Space>
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex vertical align="start" gap={8}>
                        <Typography.Title level={5}> 일시 </Typography.Title>
                        <DatePicker
                            name='date'
                            showTime
                            picker="date"
                            defaultValue={formik.values.date}
                            onChange={(date) => formik.setFieldValue('date', date)}
                            disabledDate={(current) => {
                                return !(current && current.year() === year && current.month() === month - 1);
                            }}
                        />
                    </Flex>
                </Col>
                <Col span={12}>
                    <Flex vertical align="start" gap={8}>
                        <Typography.Title level={5}> 금액 </Typography.Title>
                        <InputNumber
                            name='amount'
                            value={formik.values.amount}
                            onChange={(value) =>
                                formik.setFieldValue('amount', value)}
                        />
                    </Flex>
                </Col>
                <Col span={24}>
                    <Flex vertical align="start" gap={8}>
                        <Typography.Title level={5}>내용</Typography.Title>
                        <Input.TextArea
                            name='content'
                            value={formik.values.content}
                            onChange={formik.handleChange}
                        />
                    </Flex>
                </Col>
            </Row>
        </Modal>
    )
}
import React, {useEffect, useState} from 'react';
import {
    Button,
    CardProps,
    Checkbox,
    Col,
    ConfigProvider,
    DatePicker,
    Flex,
    InputNumber,
    Radio,
    Row,
    Select,
    Steps,
    Table,
    Typography
} from 'antd';
import {DollarOutlined, HomeOutlined, SettingOutlined} from '@ant-design/icons';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useStylesContext} from "../../context";
import dayjs from 'dayjs';
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Card} from "../../components";
import {formatCurrency, formatNumber} from "../../util/money";
import {green, red} from "@ant-design/colors";
import {useMediaQuery} from "react-responsive";

const {Title, Text} = Typography;
const {Step} = Steps;

interface FormValues {
    age: number | null;
    salary: number | null;
    startAmount: number;
    goalAmount: number | null;
    deadline: dayjs.ConfigType;
    riskLevel: string;
    autoInvest: boolean;
    investmentAmount: number;
    investmentFrequency: string;
}

// 년도별 목표 설정 테이블 데이터 타입
type TableData = {
    key: number;
    year: number;
    age: number | null;
    goalAmount: number;
};

export const GoalSetup = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const [tableData, setTableData] = useState<TableData[]>([]);

    const formik = useFormik<FormValues>({
        initialValues: {
            age: null,
            salary: null,
            startAmount: 0,
            goalAmount: null,
            deadline: dayjs(),
            riskLevel: 'neutral',
            autoInvest: false,
            investmentAmount: 100,
            investmentFrequency: 'monthly',
        },
        validationSchema: Yup.object({
            goalAmount: Yup.number().required('목표 금액을 입력해주세요').min(0),
            // deadline: Yup.date()
            //     .required('목표 달성 기한을 입력해주세요')
            //     .test('isValid', '유효한 날짜가 아닙니다.', (value) => isValid(value)),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    useEffect(() => {
        console.log("formik.values 변경:", formik.values);
    }, [formik.values]);

    const handleGoalSave = () => {
        const body = {
            memeberId: 1,
            initialValues: formik.values.startAmount,
            goalAmount: formik.values.goalAmount,
            goalDate: formik.values.deadline,
            goalDetail: tableData.map((item) => ({
                year: item.year,
                goalAmount: item.goalAmount,
            })),
        }

        console.log(body);
    }

    const renderStepContent = () => {
        switch (current) {
            case 0:
                return <BasicInfoInput formik={formik} onNext={next}/>;
            case 1:
                return <GoalAmountAndDeadline formik={formik}
                                              tableData={tableData}
                                              setTableData={setTableData}
                                              onNext={next}/>;
            // case 3:
            //     return <RiskLevelAndInvestment formik={formik} onNext={next}/>;
            case 2:
                return <GoalSummaryAndGraph
                    tableData={tableData}
                    onNext={next}
                />;
            default:
                return null;
        }
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    InputNumber: {
                        controlHeight: 48,
                        fontSize: 16,
                    },
                    DatePicker: {
                        controlHeight: 48,
                        fontSize: 16,
                    },
                }
            }}
        >
            <Card style={{padding: '20px', maxWidth: '1200px', margin: 'auto'}}>
                <Steps current={current} style={{marginBottom: '20px'}}>
                    <Step title="기본 정보 입력" icon={<SettingOutlined/>}/>
                    <Step title="연도별 목표 설정" icon={<DollarOutlined/>}/>
                    {/*<Step title="리스크 및 투자 방식" icon={<SettingOutlined/>}/>*/}
                    <Step title="목표 요약 및 시각화" icon={<HomeOutlined/>}/>
                </Steps>

                <div style={{minHeight: '200px'}}>{renderStepContent()}</div>

                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    {current > 0 && (
                        <Button style={{marginRight: '8px'}} onClick={prev}>
                            이전
                        </Button>
                    )}
                    {current < 3 && (
                        <Button type="primary" onClick={next}>
                            다음
                        </Button>
                    )}
                    {current === 3 && (
                        <Button type="primary" onClick={handleGoalSave}>
                            완료
                        </Button>
                    )}
                </div>
            </Card>
        </ConfigProvider>
    );
};

type Props = {
    formik: ReturnType<typeof useFormik<FormValues>>;
    onNext?: () => void;
} & CardProps;

const BasicInfoInput = ({formik, onNext, ...others}: Props) => {
    const stylesContext = useStylesContext();

    const handleNext = async () => {
        const errors = await formik.validateForm();
        if (Object.keys(errors).length === 0) {
            onNext && onNext(); // 검증이 통과하면 다음 단계로 이동
        } else {
            await formik.setTouched({
                age: true,
                salary: true,
                goalAmount: true,
                deadline: true,
            }); // 모든 필드를 touched 상태로 설정하여 에러 메시지 표시
        }
    };

    const [currency, setCurrency] = useState('won');

    // Select 옵션을 함수로 정의하여 여러 곳에서 재사용 가능하게 설정
    const CurrencySelect = (
        <Select
            value={currency} // currency 상태 값으로 동기화
            options={[
                {value: 'won', label: '￦'},
                {value: 'dollar', label: '$'},
            ]}
            onChange={(value) => setCurrency(value)}
        />
    );

    return (
        <>
            < Row {...stylesContext?.rowProps}>
                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>시작 원금</Text>
                        <Text type="danger">{formatCurrency(formik.values.startAmount)}
                        </Text>
                    </Flex>
                    <InputNumber
                        value={formik.values.startAmount}
                        status={formik.errors.startAmount ? 'error' : undefined}
                        onChange={(value) =>
                            formik.setFieldValue('startAmount', value)
                        }
                        min={0}
                        addonAfter={CurrencySelect}
                        placeholder="시작 원금 입력"
                        formatter={value => formatNumber(Number(value))
                        }
                        style={{
                            width: '100%', marginBlock: '4px'
                        }}
                    />
                    {
                        formik.touched.startAmount && formik.errors.startAmount && (
                            <Text type="danger">{formik.errors.startAmount}</Text>
                        )
                    }
                </Col>


                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>목표 금액</Text>
                        <Text type="danger">{formatCurrency(formik.values.goalAmount)}</Text>
                    </Flex>
                    <InputNumber
                        value={formik.values.goalAmount}
                        status={formik.errors.goalAmount ? 'error' : undefined}
                        onChange={(value) => formik.setFieldValue('goalAmount', value)}
                        min={0}
                        addonAfter={CurrencySelect}
                        placeholder="목표 금액 입력"
                        formatter={value => formatNumber(Number(value))}
                        //size="large"
                        style={
                            {width: '100%', marginBlock: '4px'}
                        }
                    />
                    {formik.touched.goalAmount && formik.errors.goalAmount && (
                        <Text type="danger">{formik.errors.goalAmount}</Text>
                    )}
                </Col>


                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>목표 달성 기한</Text>
                        {formik.values.age && (
                            <Text>목표 달성
                                나이: {formik.values.age + (dayjs(formik.values.deadline).year() - dayjs().year())}</Text>
                        )}
                    </Flex>
                    <DatePicker
                        value={formik.values.deadline ? formik.values.deadline : null}
                        status={formik.errors.deadline ? 'error' : undefined}
                        onChange={(date) => formik.setFieldValue('deadline', date ? date : null)}
                        picker="year"
                        placeholder="목표 달성 기한"
                        //size="large"
                        style={
                            {width: '100%', marginBlock: '4px'}
                        }
                    />
                    {formik.touched.deadline && formik.errors.deadline && (
                        <Text type="danger">{String(formik.errors.deadline)}</Text>
                    )}
                </Col>

                <Col xs={24} sm={12}>
                    <Text>나이 (선택):</Text>
                    <InputNumber
                        value={formik.values.age}
                        onChange={(value) => formik.setFieldValue('age', value)}
                        min={0}
                        placeholder="나이 입력"
                        //size="large"
                        style={
                            {width: '100%', marginBlock: '4px'}
                        }
                    />
                    {formik.touched.age && formik.errors.age && (
                        <Text type="danger">{formik.errors.age}</Text>
                    )}
                </Col>

                <Col xs={24} sm={12}>
                    <Text>연봉 (선택):</Text>
                    <InputNumber
                        value={formik.values.salary}
                        onChange={(value) => formik.setFieldValue('salary', value)}
                        min={0}
                        placeholder="연봉 입력"
                        //size="large"
                        style={
                            {width: '100%', marginBlock: '4px'}
                        }
                    />
                    {formik.touched.salary && formik.errors.salary && (
                        <Text type="danger">{formik.errors.salary}</Text>
                    )}
                </Col>
            </Row>
        </>
    )
        ;
};

type Props2 = {
    formik: ReturnType<typeof useFormik<FormValues>>;
    tableData: TableData[];
    setTableData: React.Dispatch<React.SetStateAction<TableData[]>>;
    onNext?: () => void;
} & CardProps;

// GoalAmountAndDeadline 컴포넌트
const GoalAmountAndDeadline = ({formik, tableData, setTableData, ...others}: Props2) => {

    const isMobile = useMediaQuery({maxWidth: 767});

    useEffect(() => {
        // 폼의 값이 처음 설정되거나 특정 값이 변경될 때만 tableData 초기화
        if (!tableData.length || formik.values.deadline || formik.values.goalAmount || formik.values.startAmount) {
            const startYear = dayjs().year();
            const endYear = formik.values.deadline ? dayjs(formik.values.deadline).year() : startYear;
            const totalYears = endYear - startYear + 1;
            const incrementalAmount = formik.values.goalAmount !== null && formik.values.startAmount !== null
                ? (formik.values.goalAmount - formik.values.startAmount) / totalYears
                : 0;

            const data = Array.from({length: totalYears}, (_, index) => {
                const year = startYear + index;
                const existingData = tableData.find((item) => item.year === year);
                return {
                    key: index,
                    year,
                    age: formik.values.age ? formik.values.age + index : null,
                    goalAmount: existingData ? existingData.goalAmount : formik.values.startAmount + incrementalAmount * (index + 1),
                };
            });

            setTableData(data);
        }

    }, [formik.values.deadline, formik.values.goalAmount, formik.values.startAmount, formik.values.age]);

    const columns = [
        {
            title: '년도',
            dataIndex: 'year',
            key: 'year',
            width: isMobile ? '15%' : 'auto',
        },
        ...(formik.values.age !== null ? [{
            title: '나이',
            dataIndex: 'age',
            key: 'age',
            width: isMobile ? '15%' : 'auto',
            render: (age: number | null) => (age !== null ? age : '-'),
        }] : []),
        {
            title: '목표 금액',
            dataIndex: 'goalAmount',
            key: 'goalAmount',
            width: isMobile ? '30%' : 'auto',
            render: (goalAmount: number, record: any, index: number) => (
                <Flex vertical>
                    <Text>{formatCurrency(record.goalAmount)}</Text>
                    <InputNumber
                        min={0}
                        value={record.goalAmount}
                        formatter={value => formatNumber(Number(value))}
                        onChange={(value) => {
                            setTableData((prevData) =>
                                prevData.map((item) =>
                                    item.key === record.key ? {...item, goalAmount: value || 0} : item
                                )
                            );
                        }}
                        disabled={index === tableData.length - 1}
                        style={{width: isMobile ? '80%' : '60%'}}
                    />
                </Flex>
            ),
        },
        {
            title: '전년 대비 증가율',
            key: 'increaseRate',
            width: isMobile ? '25%' : 'auto',
            render: (_: any, record: any, index: number) => {

                if (index === 0) {
                    return '-';
                }

                const prevGoalAmount = tableData[index - 1].goalAmount;
                const increaseRate = ((record.goalAmount - prevGoalAmount) / prevGoalAmount) * 100;
                return (
                    <Typography.Text
                        style={{
                            color: increaseRate > 0 ? green[6] : red[5],
                            fontWeight: 500,
                            fontSize: isMobile ? '12px' : '16px'
                        }}
                    >
                        {increaseRate > 0 ? '+' : ''}{increaseRate.toFixed(2)}%
                    </Typography.Text>
                )
            },
        }
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{x: isMobile ? '100%' : undefined}}
                style={{marginBottom: '15px'}}
            />
        </>
    );
};


// 3단계 컴포넌트: 리스크 및 투자 방식 설정
const RiskLevelAndInvestment = ({formik, ...others}: Props) => {

    return (
        <Card title="리스크 수준 및 저축/투자 방식 설정">
            <Title level={4}>리스크 수준 선택</Title>
            <Radio.Group>
                <Radio value="conservative">보수적</Radio>
                <Radio value="neutral">중립적</Radio>
                <Radio value="aggressive">공격적</Radio>
            </Radio.Group>
            <Checkbox>자동 저축/투자 설정</Checkbox>
            <InputNumber placeholder="금액 설정" style={{width: '100%', marginBottom: '15px'}}/>
        </Card>
    );
};

type Props3 = {
    tableData: TableData[];
    onNext?: () => void;
} & CardProps;

// 4단계 컴포넌트: 목표 요약 및 시각화 화면
const GoalSummaryAndGraph = ({tableData, ...others}: Props3) => {


    const data = tableData.map((item) => {
        return {
            year: item.year,
            age: item.age,
            goalAmount: item.goalAmount
        };
    });

    return (
        <>
            <Title level={4}>목표 달성 예상 그래프</Title>
            <div style={{height: "400px", width: "100%"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="goalAmount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                        {/*<Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />*/}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

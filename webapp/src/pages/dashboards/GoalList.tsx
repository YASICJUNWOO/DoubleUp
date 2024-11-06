import React, {useCallback, useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {
    Button,
    Card,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Typography
} from "antd";
import {useStylesContext} from "../../context";
import {GoalCard} from "../../components";
import {useFormik} from "formik";
import {CalendarOutlined, DollarOutlined} from "@ant-design/icons";
import CountUp from "react-countup";
import dayjs from "dayjs";
import {GoalTypes, InstallFrequencyType, InstallFrequencyTypes} from "../../interface/GoalTypes";
import * as Yup from "yup";
import {deleteGoal, getGoal, postSubGoal} from "../../constants/api";
import {IGoal} from "../../interface/interface";
import {useAuth} from "../../context/AuthContext"; // ✅ Yup 추가 (폼 유효성 검사용)

const {Title, Text} = Typography;
const {Option} = Select;
const {RangePicker} = DatePicker;


// ✅ LargeInput 컴포넌트를 React.memo로 감싸서 불필요한 재렌더링 방지
const LargeInput = React.memo(({ field, form, ...props }: any) => {
    return <Input {...field} {...props} size="large" />;
});

const GoalTypeCard = React.memo(
    ({ type, selected, onSelect, icon, title, description, color }: any) => {
        return (
            <Card
                hoverable
                onClick={() => onSelect(type)}
                style={{
                    border: selected ? `2px solid ${color}` : "1px solid #d9d9d9",
                    width: "100%",
                    textAlign: "center",
                    padding: "24px",
                }}
            >
                <Space direction="vertical" size="small">
                    {icon}
                    <Text strong>{title}</Text>
                    <Text type="secondary">{description}</Text>
                </Space>
            </Card>
        );
    }
);

type FormType = {
    goalType: string;
    goalName: string;
    goalPeriod: string[];
    paymentType: string;
    goalAmount: number;
    installmentAmount: number;
    installmentFrequency: InstallFrequencyType;
}

type GoalCreateModalProps = {
    visible: boolean;
    handleSubmit: (values: any) => void;
    onClose: () => void;
}
const GoalCreateModal: React.FC<GoalCreateModalProps> = ({visible, onClose, handleSubmit}) => {

    // ✅ Yup을 사용하여 validationSchema 정의 (폼 유효성 검사 강화)
    const validationSchema = Yup.object().shape({
        goalType: Yup.string().required("목표 유형을 선택해주세요."),
        goalName: Yup.string().required("목표 이름을 입력해주세요."),
        goalPeriod: Yup.array()
            .of(Yup.string().required())
            .min(2, "목표 기간을 선택해주세요.")
            .required("목표 기간을 선택해주세요."),
        installmentFrequency: Yup.string().required("적립 주기를 선택해주세요."),
        goalAmount: Yup.number().when('goalType', (goalType: any, schema: any) => {
            if (goalType === GoalTypes.AMOUNT) {
                return schema
                    .min(1, "목표 금액을 입력해주세요.")
                    .required("목표 금액을 입력해주세요.");
            }
            return schema;
        }),
        installmentAmount: Yup.number().when('goalType', (goalType: any, schema: any) => {
            if (goalType === GoalTypes.PERIOD) {
                return schema
                    .min(1, "적립 금액을 입력해주세요.")
                    .required("적립 금액을 입력해주세요.");
            }
            return schema;
        }),
    });

    const formik = useFormik<FormType>({
        initialValues: {
            goalType: GoalTypes.PERIOD,
            goalName: '',
            goalPeriod: [],
            paymentType: 'installment',
            goalAmount: 0,
            installmentAmount: 0,
            installmentFrequency: InstallFrequencyTypes.DAY.type,
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    // ✅ goalPeriod 안전하게 접근하도록 수정
    const startDate = formik.values.goalPeriod?.[0];
    const endDate = formik.values.goalPeriod?.[1];

    // ✅ useCallback을 사용하여 함수 메모이제이션 (calculateDuration)
    const calculateDuration = useCallback(() => {
        if (!startDate || !endDate) {
            return 0;
        }
        const duration =
            dayjs(endDate).diff(dayjs(startDate), formik.values.installmentFrequency as any) + 1;
        return duration;
    }, [startDate, endDate, formik.values.installmentFrequency]);

    // ✅ useCallback을 사용하여 함수 메모이제이션 (calculateFinalAmount)
    const calculateFinalAmount = useCallback((): number => {
        if (!formik.values.installmentAmount || !startDate || !endDate) {
            return 0;
        }
        const duration = calculateDuration();
        return formik.values.installmentAmount * duration;
    }, [formik.values.installmentAmount, startDate, endDate, calculateDuration]);

    // ✅ useCallback을 사용하여 함수 메모이제이션 (calculateInstallmentAmount)
    const calculateInstallmentAmount = useCallback((): number => {
        if (!formik.values.goalAmount || !startDate || !endDate) {
            return 0;
        }
        const duration = calculateDuration();
        return formik.values.goalAmount / duration;
    }, [formik.values.goalAmount, startDate, endDate, calculateDuration]);

    // ✅ 의존성 배열을 최적화하여 불필요한 재실행 방지
    useEffect(() => {
        if (formik.values.goalType === GoalTypes.AMOUNT) {
            const installmentAmount = calculateInstallmentAmount();
            formik.setFieldValue("installmentAmount", installmentAmount);
        } else if (formik.values.goalType === GoalTypes.PERIOD) {
            const goalAmount = calculateFinalAmount();
            formik.setFieldValue("goalAmount", goalAmount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.goalPeriod, formik.values.goalType, calculateFinalAmount, calculateInstallmentAmount]);

    useEffect(() => {
        formik.setFieldValue("goalAmount", 0);
        formik.setFieldValue("installmentAmount", 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.goalType]);

    useEffect(() => {
        handleInstallmentFrequencyChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.installmentFrequency]);

    // ✅ handleInstallmentFrequencyChange 함수를 useCallback으로 최적화
    const handleInstallmentFrequencyChange = useCallback(() => {
        if (formik.values.installmentFrequency === InstallFrequencyTypes.CUSTOM.type) {
            formik.setFieldValue("installmentAmount", 0);
            formik.setFieldValue("goalAmount", 0);
            return;
        }

        if (formik.values.goalType === GoalTypes.AMOUNT) {
            const installmentAmount = calculateInstallmentAmount();
            formik.setFieldValue("installmentAmount", installmentAmount);
        } else if (formik.values.goalType === GoalTypes.PERIOD) {
            const goalAmount = calculateFinalAmount();
            formik.setFieldValue("goalAmount", goalAmount);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values.goalType, formik.values.installmentFrequency, calculateFinalAmount, calculateInstallmentAmount]);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width={1200}
        >
            <Row {...useStylesContext()?.rowProps}>
                <Col offset={2} span={12}>
                    <Title level={3}>목표 생성</Title>
                    <Form layout="vertical" onFinish={formik.handleSubmit}>
                        {/* 목표 유형 선택 */}
                        <Form.Item
                            label="목표 유형"
                            validateStatus={formik.errors.goalType && formik.touched.goalType ? "error" : ""}
                            help={formik.errors.goalType && formik.touched.goalType ? formik.errors.goalType : null}
                        >
                            <Space size="large">
                                <GoalTypeCard
                                    type={GoalTypes.PERIOD}
                                    selected={formik.values.goalType === GoalTypes.PERIOD}
                                    onSelect={() => formik.setFieldValue("goalType", GoalTypes.PERIOD)}
                                    icon={<CalendarOutlined style={{ fontSize: "48px", color: "#1890ff" }} />}
                                    title="기간형"
                                    color="#1890ff"
                                    description="목표 기간 동안 적립식 저축"
                                />
                                <GoalTypeCard
                                    type={GoalTypes.AMOUNT}
                                    selected={formik.values.goalType === GoalTypes.AMOUNT}
                                    onSelect={() => formik.setFieldValue("goalType", GoalTypes.AMOUNT)}
                                    icon={<DollarOutlined style={{ fontSize: "48px", color: "#52c41a" }} />}
                                    title="금액형"
                                    color="#52c41a"
                                    description="목표 금액 달성을 위한 저축"
                                />
                            </Space>
                        </Form.Item>

                        {/* 목표 이름 입력 */}
                        <Form.Item
                            label="목표 이름"
                            validateStatus={formik.errors.goalName && formik.touched.goalName ? "error" : ""}
                            help={formik.errors.goalName && formik.touched.goalName ? formik.errors.goalName : null}
                        >
                            <LargeInput
                                placeholder="목표 이름을 입력해주세요."
                                value={formik.values.goalName}
                                onChange={(e: any) => formik.setFieldValue('goalName', e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="목표 기간"
                            validateStatus={formik.errors.goalPeriod && formik.touched.goalPeriod ? "error" : ""}
                            help={formik.errors.goalPeriod && formik.touched.goalPeriod ? formik.errors.goalPeriod : null}
                        >
                            <RangePicker
                                size="large"
                                placeholder={['시작일', '종료일']}
                                onChange={(dates) =>
                                    formik.setFieldValue('goalPeriod', dates?.map(date => date?.format('YYYY-MM-DD')))}
                            />
                        </Form.Item>
                        <>
                            <Form.Item label="저축 주기 설정"
                                        validateStatus={formik.errors.installmentFrequency && formik.touched.installmentFrequency ? "error" : ""}
                                        help={formik.errors.installmentFrequency && formik.touched.installmentFrequency ? formik.errors.installmentFrequency : null}
                            >
                                <Space direction="vertical">
                                    <Radio.Group
                                        onChange={(e) => formik.setFieldValue('installmentFrequency', e.target.value)}
                                        value={formik.values.installmentFrequency}>
                                        <Radio value={InstallFrequencyTypes.DAY.type}>매일</Radio>
                                        <Radio value={InstallFrequencyTypes.WEEK.type}>매주</Radio>
                                        <Radio value={InstallFrequencyTypes.MONTH.type}>매월</Radio>
                                        <Radio value={InstallFrequencyTypes.YEAR.type}>매년</Radio>
                                        <Radio value={InstallFrequencyTypes.CUSTOM.type}>자유 적립</Radio>
                                    </Radio.Group>
                                </Space>
                            </Form.Item>
                        </>

                        {/* 기간형 선택 시 목표 기간 설정 */}
                        {formik.values.goalType === GoalTypes.PERIOD && (formik.values.installmentFrequency !== InstallFrequencyTypes.CUSTOM.type) && (
                            <>
                                <Form.Item
                                    label="적립 금액"
                                    validateStatus={formik.errors.installmentAmount && formik.touched.installmentAmount ? "error" : ""}
                                    help={formik.errors.installmentAmount && formik.touched.installmentAmount ? formik.errors.installmentAmount : null}
                                >
                                    <InputNumber
                                        placeholder="적립 금액 입력"
                                        min={0}
                                        onChange={(value) => {
                                            formik.setFieldValue("installmentAmount", value);
                                            const goalAmount = calculateFinalAmount();
                                            formik.setFieldValue("goalAmount", goalAmount);
                                        }}
                                        value={formik.values.installmentAmount}
                                    />
                                </Form.Item>
                            </>
                        )}

                        {/* 금액형 선택 시 목표 금액 및 예상 기간 설정 */}
                        {formik.values.goalType === GoalTypes.AMOUNT && (
                            <>
                                <Form.Item label="목표 금액"
                                             validateStatus={formik.errors.goalAmount && formik.touched.goalAmount ? "error" : ""}
                                             help={formik.errors.goalAmount && formik.touched.goalAmount ? formik.errors.goalAmount : null}
                                >
                                    <InputNumber
                                        placeholder="목표 금액 입력"
                                        min={0}
                                        onChange={(value) => {
                                            formik.setFieldValue("goalAmount", value);
                                            const installmentAmount = calculateInstallmentAmount();
                                            formik.setFieldValue("installmentAmount", installmentAmount);
                                        }}
                                        value={formik.values.goalAmount}
                                    />
                                </Form.Item>
                            </>
                        )}

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                저장
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{height: '100%'}}/>
                </Col>

                <Col span={8} style={{display: 'flex'}}>
                    <Space direction="vertical" size="large">
                        <Title level={3}>목표 미리보기</Title>
                        <Space direction="vertical">
                            <Title level={4} style={{margin: "0px"}}>{formik.values.goalName}</Title>
                            <Text type="secondary">
                                목표 기간: {formik.values.goalPeriod[0]} ~ {formik.values.goalPeriod[1]}
                            </Text>
                        </Space>
                        <Space direction="vertical">
                            {formik.values.goalType === GoalTypes.AMOUNT && (
                                <CountUp end={formik.values.goalAmount} duration={1} prefix="목표 금액: " suffix="원"/>
                            )}

                            <Text type="secondary">
                                적립 주기: {InstallFrequencyTypes[formik.values.installmentFrequency].label}
                            </Text>

                            {formik.values.goalType === GoalTypes.PERIOD ? (
                                <Text type="secondary">적립 금액: {formik.values.installmentAmount}원</Text>
                            ) : (
                                <Text type="secondary">
                                    적립 금액: {formik.values.installmentAmount || 0}원
                                </Text>
                            )}
                        </Space>
                        <Divider/>
                        <Space direction="vertical">
                            <Title level={4} style={{margin: "0px"}}>예상 최종 금액</Title>
                            <CountUp
                                end={formik.values.goalAmount}
                                duration={1}
                                suffix="원"
                                style={{fontSize: '24px'}}
                            />
                        </Space>
                    </Space>
                </Col>
            </Row>
        </Modal>
    )
        ;
};

export const GoalList: React.FC = () => {

    const {isAuthenticated, member} = useAuth();
    const stylesContext = useStylesContext();

    const [createModalOpen, setCreateModalOpen] = useState(false);
    const handleOpenCreateModal = () => setCreateModalOpen(true);
    const handleCloseCreateModal = () => setCreateModalOpen(false);

    const [isLoading, setIsLoading] = useState(false);
    const [goalData, setGoalData] = useState<IGoal[]>([]);


    const handleSubmit = (values: any) => {
        const withMemberId = {
            ...values,
            memberId: member!.id,
        };

        postSubGoal(withMemberId)
            .then(() => {
                message.success("목표가 생성되었습니다.");
                setCreateModalOpen(false);
                fetchGoalData();
            })
            .catch((e) => {
                if (e.status === 401) {
                    message.error("로그인이 필요합니다.");
                }
            });
    };


    const handleDelete = useCallback((id: string) => {
        Modal.confirm({
            title: '목표 삭제',
            content: '정말로 삭제하시겠습니까?',
            okText: '삭제',
            okType: 'danger',
            cancelText: '취소',
            onOk() {
                deleteGoal({goalId : id})
                    .then(() => {
                        message.success("목표가 삭제되었습니다.");
                        fetchGoalData();
                    })
                    .catch(() => {
                        message.error("목표 삭제에 실패했습니다.");
                    });
            },
        });
    }, []);

    useEffect(() => {

        if (!isAuthenticated || !member) {
            return;
        }
        fetchGoalData();
        setIsLoading(true);

    }, []);

    const fetchGoalData = useCallback(() => {
        getGoal({ memberId : member!.id.toString() })
            .then((res) => {
                console.log("목표 데이터", res.data);
                setGoalData(res.data);
            })
            .catch((e) => {
                console.error(e);
            })
            .finally(() => {
                setIsLoading(false); // ✅ 로딩 상태 변경
            });
    }, [member]);

    return (
        <div>
            <Helmet>
                <title>메인 | DoubleUp</title>
            </Helmet>
            <Row {...stylesContext?.rowProps}>
                <Col xs={24} lg={24}>
                    <GoalCard data={goalData}
                              loading={isLoading}
                              onDelete={handleDelete}
                              onOpen={handleOpenCreateModal}
                    />
                </Col>
            </Row>

            <GoalCreateModal
                visible={createModalOpen}
                handleSubmit={handleSubmit}
                onClose={handleCloseCreateModal}
            />
        </div>
    );

}
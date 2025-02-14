import React, {useState} from 'react';
import {Button, ConfigProvider, Steps} from 'antd';
import {DollarOutlined, HomeOutlined, SettingOutlined} from '@ant-design/icons';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import dayjs from 'dayjs';
import {Card} from "../../../components";
import {BasicInfoInput} from "../../../components/dashboard/goal/basicInfoInput/BasicInfoInput";
import {YearGoalAmountAndDeadline} from "../../../components/dashboard/goal/YearGoalAmountAndDeadline";
import {GoalSummaryAndGraph} from "../../../components/dashboard/goal/GoalSummaryAndGraph";
import {IGoalRoadMap, IGoalRoadMapDetail} from "../../../interface/interface";

const {Step} = Steps;

export interface FormValues {
    age: number | null;
    startAmount: number;
    goalAmount: number;
    dateRange: [dayjs.Dayjs, dayjs.Dayjs];
    details: IGoalRoadMapDetail[];
}

type Props = {
    handleGoalRoadMapChangeComplete: (body: any) => void;
    goalRoadMap?: IGoalRoadMap;
    isEdit: boolean;
};

export const GoalRoadMapPage: React.FC<Props> = ({
                                                     handleGoalRoadMapChangeComplete,
                                                     goalRoadMap,
                                                     isEdit
                                                 }) => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const formik = useFormik<FormValues>({
        initialValues: {
            age: goalRoadMap?.age || null,
            startAmount: goalRoadMap?.currentProgressAmount || 0,
            goalAmount: goalRoadMap?.goalAmount || 0,
            dateRange: goalRoadMap ?
                [dayjs().year(goalRoadMap.startYear), dayjs().year(goalRoadMap.endYear)] :
                [dayjs(), dayjs()],
            details: goalRoadMap?.goalRoadMapDetails || [],
        },
        validationSchema: Yup.object({
            goalAmount: Yup.number().required('목표 금액을 입력해주세요').min(0),
        }),
        onSubmit: values => {
            const body = {
                age: values.age,
                startYear: values.dateRange[0].year(),
                endYear: values.dateRange[1].year(),
                goalAmount: values.goalAmount,
                currentProgressAmount: values.startAmount,
                goalRoadMapDetails: values.details,
            }

            handleGoalRoadMapChangeComplete(body);
        },
    });

    const renderStepContent = () => {
        switch (current) {
            case 0:
                return <BasicInfoInput formik={formik}/>;
            case 1:
                return (
                    <YearGoalAmountAndDeadline
                        formik={formik}
                        isEdit={isEdit}
                        onNext={next}
                    />
                );
            case 2:
                return <GoalSummaryAndGraph formik={formik}/>;
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
                    <Step title="목표 요약 및 시각화" icon={<HomeOutlined/>}/>
                </Steps>

                <div style={{minHeight: '200px'}}>{renderStepContent()}</div>

                <div style={{marginTop: '20px', textAlign: 'center'}}>
                    {current > 0 && (
                        <Button style={{marginRight: '8px'}} onClick={prev}>
                            이전
                        </Button>
                    )}
                    {current < 2 && (
                        <Button type="primary" onClick={next}>
                            다음
                        </Button>
                    )}
                    {current === 2 && (
                        <Button type="primary" onClick={formik.submitForm}>
                            완료
                        </Button>
                    )}
                </div>
            </Card>
        </ConfigProvider>
    );
};
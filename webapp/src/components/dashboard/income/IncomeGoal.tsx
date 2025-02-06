import {Button, Flex, InputNumber, Modal, Typography} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {EditOutlined} from "@ant-design/icons";
import {gray} from "@ant-design/colors";
import {IIncomeGoal, IncomeGoalRequest} from "./interface";
import {addIncomeGoal, getIncomeGoal, updateIncomeGoal} from "../../../constants/api";
import {IncomeGoalBar} from "./IncomeGoalBar";

const {Title, Text} = Typography;

type Props = {
    type: GOAL_TYPE_KEY;
    rangeType: GOAL_RANGE_TYPE_KEY;
    year: number;
    month?: number;
    data: number;
};

export const GOAL_TYPE = {
    INCOME: "수입",
    EXPENSE: "지출",
};

export const GOAL_RANGE_TYPE = {
    YEARLY: "연간",
    MONTHLY: "월간",
};

export type GOAL_TYPE_KEY = keyof typeof GOAL_TYPE;
export type GOAL_RANGE_TYPE_KEY = keyof typeof GOAL_RANGE_TYPE;

export const IncomeGoal: React.FC<Props> = ({
                                                type,
                                                rangeType,
                                                year,
                                                month,
                                                data
                                            }) => {

    const [visible, setVisible] = useState(false);
    const [originGoal, setOriginGoal] = useState<IIncomeGoal>();
    const [goal, setGoal] = useState<number>();

    useEffect(() => {
        fetchIncomeGoal();
    }, [year]);

    const fetchIncomeGoal = () => {

        let param: {
            type: GOAL_TYPE_KEY;
            rangeType: GOAL_RANGE_TYPE_KEY;
            year: string;
            month?: string; // month를 선택적으로 포함
        } = {
            type: type,
            rangeType: rangeType,
            year: year.toString(),
        };

        if (rangeType === "MONTHLY" && month !== undefined) {
            param.month = month.toString();
        }

        getIncomeGoal(param)
            .then((response) => {
                setOriginGoal(response.data);
                setGoal(response.data.goalAmount);
            })
            .catch((error) => {
                console.error(error);
            });

    }


    const handleGoalSave = () => {

        const body: IncomeGoalRequest = {
            type: type,
            rangeType: rangeType,
            yearValue: year,
            monthValue: (rangeType === "MONTHLY" && month) ? month : null,
            goalAmount: goal!,
        }


        addIncomeGoal(body)
            .then(() => {
                setVisible(false);
                fetchIncomeGoal();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const editIncomeGoal = () => {

        console.log('editIncomeGoal', originGoal);
        const body: IncomeGoalRequest = {
            type: type,
            rangeType: rangeType,
            yearValue: year,
            monthValue: (rangeType === "MONTHLY" && month) ? month : null,
            goalAmount: goal!,
        }

        const pathParams = {
            "id": originGoal!.id
        }

        updateIncomeGoal(pathParams, body)
            .then(() => {
                setVisible(false);
                fetchIncomeGoal();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleGoalCancel = () => {
        setVisible(false);
        setGoal(originGoal?.goalAmount);
    }

    const barData = useCallback(() => {
        return [
            {
                type: '목표',
                value: goal,
            },
            {
                type: type === "INCOME" ? '수입' : '지출',
                value: data
            }
        ];
    }, [goal, data, type]);

    return (
        <>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{paddingBottom: 20}}
            >
                <Flex align="end" gap={8}>

                    <Title level={4} style={{margin: 0}}>
                        {GOAL_RANGE_TYPE[rangeType]} 목표 {GOAL_TYPE[type]}
                    </Title>
                    {originGoal &&
                        <Button
                            onClick={() => setVisible(true)}
                            size="small"
                            icon={
                                <EditOutlined style={{color: gray[4],}}/>
                            }
                        />
                    }
                </Flex>
                {originGoal ?
                    <IncomeGoalBar data={barData()}/>
                    :
                    <Button
                        onClick={() => setVisible(true)}
                    >
                        <Text type="danger"> {year}년 목표 설정하기</Text>
                    </Button>
                }
            </Flex>

            <Modal
                title="목표 설정"
                open={visible}
                onOk={() => originGoal ? editIncomeGoal() : handleGoalSave()}
                onCancel={() => handleGoalCancel()}
            >
                <Flex vertical>
                    <Text>목표 수입</Text>
                    <InputNumber
                        size="small"
                        min={0}
                        defaultValue={originGoal ? barData()[0].value : 0}
                        onChange={(value) => setGoal(value!)}
                    />
                </Flex>
            </Modal>
        </>
    )
}
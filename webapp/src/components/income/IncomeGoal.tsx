import {Button, Flex, InputNumber, Modal, Typography} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {Bar} from "@ant-design/charts";
import {EditOutlined} from "@ant-design/icons";
import {gray} from "@ant-design/colors";
import {IIncomeGoal, Income, IncomeGoalRequest} from "./interface";
import {addIncomeGoal, getIncomeGoal, updateIncomeGoal} from "../../constants/api";

const {Title, Text} = Typography;

type Props = {
    year: number;
    incomeList: Income[];
};


export const IncomeGoal: React.FC<Props> = ({
                                                year,
                                                incomeList
                                            }) => {

    const [visible, setVisible] = useState(false);
    const [originGoal, setOriginGoal] = useState<IIncomeGoal>();
    const [goal, setGoal] = useState<number>();

    useEffect(() => {
        fetchIncomeGoal();
    }, [year]);

    const fetchIncomeGoal = () => {

        const param = {
            type: "YEARLY",
            year: year.toString(),
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

        console.log('handleGoalSave', originGoal);
        const body: IncomeGoalRequest = {
            rangeType: "YEARLY",
            yearValue: year,
            monthValue: null, // 년간 목표만 설정
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
            rangeType: "YEARLY",
            yearValue: year,
            monthValue: null, // 년간 목표만 설정
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
                type: '수입',
                value: incomeList.reduce((acc, cur) => acc + cur.income, 0),
            }
        ];
    }, [goal, incomeList]);

    const config = {
        data: barData(),
        xField: 'value',
        yField: 'type',
        seriesField: 'type',
        height: 10, // 차트 높이를 데이터 개수에 맞게 줄임
        maxBarWidth: 20,
        style: {
            height: 100, // 캔버스 높이 직접 설정
            width: "100%", // 캔버스 너비 직접 설정
        },
    };

    return (
        <>
            <Flex
                vertical
                justify="center"
                align="center"
                style={{paddingBottom: 20}}
            >
                <Flex align="end" gap={8}>
                    <Title level={4} style={{margin: 0}}>목표 수입/지출</Title>
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
                    <Bar
                        {...config}
                        legend={false}
                    />
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
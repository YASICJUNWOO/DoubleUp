import {Button, Progress, Space, Tooltip, Typography} from "antd";
import {IGoalRoadMap} from "../../../interface/interface";
import {formatCurrency} from "../../../util/money";
import React from "react";
import {blue, cyan, green, red, yellow} from "@ant-design/colors";
import {Card} from "../../../components";

type Props = {
    goalRoadMap: IGoalRoadMap;
    handleDelete: () => void;
    handleEdit: () => void;
}

export const GoalRoadMapListPage: React.FC<Props> = ({
                                                         goalRoadMap,
                                                         handleDelete,
                                                         handleEdit
                                                     }) => {

    const getProgressColor = (percent: number) => {
        if (percent < 10) return red[5];    // #F5222D
        if (percent < 30) return yellow[5]; // #FAAD14
        if (percent < 50) return blue[5];   // #1890FF
        if (percent < 70) return cyan[5];  // #13C2C2
        if (percent < 90) return yellow[5]; // #FAAD14
        return green[5];                    // #52C41A
    };

    const color = getProgressColor(Number(goalRoadMap.currentProgressAmount / goalRoadMap.goalAmount * 100));

    return (
        <Card
            title='장기 목표 로드맵'
            extra={
            <Space>
                <Button onClick={() => handleEdit()}>목표 로드맵 수정</Button>
                <Button onClick={() => handleDelete()}>목표 로드맵 삭제</Button>
            </Space>
            }
        >
            {
                goalRoadMap.goalRoadMapDetails.map((goalDetail) => (
                    <div key={goalDetail.yearValue} style={{marginBottom: '20px'}}>
                        <Space align="end">
                            <Typography.Title level={4} style={{margin: "0px"}}>
                                {goalDetail.yearValue}년
                            </Typography.Title>
                            <Typography.Text>
                                {formatCurrency(goalDetail.goalAmount).replace(/\.\d+/, '')}
                            </Typography.Text>
                        </Space>
                        <Tooltip
                            title={`목표 금액: ${goalDetail.goalAmount.toLocaleString()}원, 현재 금액: ${goalRoadMap.currentProgressAmount.toLocaleString()}원`}
                        >
                            <Progress
                                percent={Number(goalRoadMap.currentProgressAmount / goalDetail.goalAmount * 100)}
                                strokeColor={color}
                                status={Number(goalRoadMap.currentProgressAmount / goalDetail.goalAmount * 100) === 100 ? 'success' : 'active'}
                            />
                        </Tooltip>
                    </div>
                ))
            }
        </Card>
    );
}
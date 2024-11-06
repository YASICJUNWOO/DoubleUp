import {Alert, Badge, Button, CardProps, Col, Flex, List, Progress, Row, Space, Tag, Typography,} from 'antd';
import React from 'react';

import './styles.css';
import {Card} from "../../../Card/Card";
import {CalendarOutlined, DeleteOutlined, DollarOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import {IGoal} from "../../../../interface/interface";
import {GoalTypeLabel, GoalTypes} from "../../../../interface/GoalTypes";
import {green} from "@ant-design/colors";
import {calculatePercent} from "../../../../util/goal";

type Props = {
    data?: IGoal[];
    loading?: boolean;
    onOpen?: () => void;
    onDelete?: (id: string) => void;
} & CardProps;

export const GoalCard: React.FC<Props> = ({data, loading, onOpen, onDelete, ...others}: Props) => {

        return (
            <Card
                title="목표"
                className="available-tucks-card card"
                extra={
                    <Button
                        onClick={onOpen}
                        style={{backgroundColor: green[6], color: 'white'}}
                    >
                        생성하기
                    </Button>
                }
                {...others}
            >
                {loading ? (
                    <Alert
                        message="Error"
                        description={"Error"}
                        type="error"
                        showIcon
                    />
                ) : (
                    <List
                        itemLayout="vertical"
                        className="available-truck-list"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 5,
                            align: 'center',
                        }}
                        dataSource={data}
                        renderItem={(goal) => (
                            <List.Item
                                key={goal.id}
                            >
                                <Flex style={{marginBottom: '.5rem'}} justify="space-between">
                                    <Space>
                                        <Typography.Text strong style={{textTransform: 'uppercase'}}>
                                            {goal.goalName}
                                        </Typography.Text>
                                        <Badge
                                            // className={`text-capitalize ${goal.status.toLowerCase() === 'in progress' ? 'badge-processing-animated' : ''}`}
                                            status={
                                                // goal.status.toLowerCase() === 'delivered'
                                                //     ? 'success'
                                                //     : goal.status.toLowerCase() === 'in transit'
                                                //         ? 'processing'
                                                //         : 'warning'
                                                'processing'
                                            }
                                            text={
                                                <span style={{textTransform: 'capitalize'}}>
                                                {/*{goal.status}*/}
                                                    In Progress
                                            </span>
                                            }
                                        />
                                    </Space>
                                    <Button
                                        danger
                                        icon={<DeleteOutlined/>}
                                        onClick={()=> onDelete!(goal.id.toString())}
                                    />
                                </Flex>
                                <Row gutter={16}>
                                    <Col span={10}>
                                        <Space direction="vertical">
                                            <Tag
                                                icon={goal.goalType === GoalTypes.PERIOD ? <CalendarOutlined/> :
                                                    <DollarOutlined/>}
                                                color={goal.goalType === GoalTypes.PERIOD ? 'blue' : 'green'}
                                                style={{textTransform: 'capitalize'}}
                                            >
                                                {GoalTypeLabel[goal.goalType]}
                                            </Tag>
                                            {/*<Badge*/}
                                            {/*    color="purple"*/}
                                            {/*    text={<Typography.Text>{""}</Typography.Text>}*/}
                                            {/*/>*/}
                                            <Space>
                                                <CalendarOutlined/>
                                                <Typography.Text>
                                                    {dayjs(goal.startDate).format('YYYY-MM-DD')} ~ {dayjs(goal.endDate).format('YYYY-MM-DD')}
                                                </Typography.Text>
                                            </Space>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        <Space direction="vertical">
                                            <Typography.Text>누적 금액: {goal.currentAmount}</Typography.Text>
                                            <Typography.Text>목표: {goal.goalAmount}</Typography.Text>
                                        </Space>
                                    </Col>
                                    <Col span={5}>
                                        <Space direction="vertical">
                                            <Typography.Text strong>{"item.mileage"} km</Typography.Text>
                                            <Typography.Text>Distance</Typography.Text>
                                        </Space>
                                    </Col>
                                    <Col span={1}>
                                        <Progress type="circle" percent={calculatePercent(goal)} size={48}/>
                                    </Col>
                                </Row>
                            </List.Item>
                        )}
                        loading={loading}
                    />
                )}

            </Card>
        );
    }
;

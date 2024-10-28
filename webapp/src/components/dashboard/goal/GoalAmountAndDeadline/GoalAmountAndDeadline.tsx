import React, {useState} from 'react';
import {Card, Col, DatePicker, InputNumber, Row, Slider, Typography} from 'antd';
import {Dayjs} from 'dayjs'; // dayjs 타입 임포트

const { Title, Text } = Typography;

export const GoalAmountAndDeadline = () => {
    const [goalAmount, setGoalAmount] = useState(1000); // 목표 금액 초기값
    const [deadline, setDeadline] = useState<Dayjs | null>(null); // 목표 기한 초기값 타입을 Dayjs | null로 지정

    return (
        <div>
            {/* 목표 금액 설정 */}
            <Card style={{ marginBottom: '20px' }}>
                <Title level={4}>목표 금액 설정</Title>
                <Row>
                    <Col span={12}>
                        <Slider
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={goalAmount}
                            onChange={(value) => setGoalAmount(value || 1000)} // 기본값 설정
                            tooltip={{ formatter: (value) => `${value?.toLocaleString() || '0'} 원` }}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={goalAmount}
                            onChange={(value) => setGoalAmount(value || 1000)}
                            formatter={(value) => `${value || 0} 원`}
                            parser={(value) => value ? parseInt(value.replace(/\s?원/g, '')) : 0}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </Card>

            {/* 목표 기한 설정 */}
            <Card>
                <Title level={4}>목표 기한 설정</Title>
                <Text>목표를 달성하고자 하는 날짜를 선택하세요</Text>
                <DatePicker
                    onChange={(date) => setDeadline(date)} // 날짜를 설정
                    style={{ width: '100%', marginTop: '10px' }}
                    placeholder="날짜 선택"
                />
            </Card>
        </div>
    );
};

import React, {useState} from 'react';
import {Card, Checkbox, InputNumber, Radio, Select, Typography} from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

export const RiskLevelAndInvestment = () => {
    // 리스크 수준과 저축/투자 설정 상태 관리
    const [riskLevel, setRiskLevel] = useState<'conservative' | 'neutral' | 'aggressive'>('neutral');
    const [autoInvest, setAutoInvest] = useState(false);
    const [investmentAmount, setInvestmentAmount] = useState(100); // 기본 투자 금액
    const [investmentFrequency, setInvestmentFrequency] = useState('monthly');

    return (
        <div>
            {/* 리스크 수준 선택 */}
            <Card style={{ marginBottom: '20px' }}>
                <Title level={4}>리스크 수준 선택</Title>
                <Radio.Group
                    onChange={(e) => setRiskLevel(e.target.value)}
                    value={riskLevel}
                >
                    <Radio value="conservative">보수적</Radio>
                    <Radio value="neutral">중립적</Radio>
                    <Radio value="aggressive">공격적</Radio>
                </Radio.Group>
                <Text style={{ display: 'block', marginTop: '10px' }}>
                    {riskLevel === 'conservative' && '안정적인 투자 전략을 선호하는 경우.'}
                    {riskLevel === 'neutral' && '균형 잡힌 투자 전략을 선호하는 경우.'}
                    {riskLevel === 'aggressive' && '높은 수익을 추구하는 적극적 투자자.'}
                </Text>
            </Card>

            {/* 저축/투자 방식 설정 */}
            <Card>
                <Title level={4}>자동 저축/투자 방식 설정</Title>
                <Checkbox
                    checked={autoInvest}
                    onChange={(e) => setAutoInvest(e.target.checked)}
                >
                    자동 저축/투자 설정
                </Checkbox>

                {autoInvest && (
                    <div style={{ marginTop: '15px' }}>
                        {/* 투자 금액 설정 */}
                        <Text>투자 금액</Text>
                        <InputNumber
                            min={10}
                            max={10000}
                            step={10}
                            value={investmentAmount}
                            onChange={(value) => setInvestmentAmount(value || 100)}
                            style={{ width: '100%', marginTop: '5px' }}
                        />

                        {/* 투자 주기 설정 */}
                        <Text style={{ marginTop: '15px', display: 'block' }}>투자 주기</Text>
                        <Select
                            value={investmentFrequency}
                            onChange={(value) => setInvestmentFrequency(value)}
                            style={{ width: '100%', marginTop: '5px' }}
                        >
                            <Option value="monthly">매월</Option>
                            <Option value="quarterly">매분기</Option>
                            <Option value="yearly">매년</Option>
                        </Select>
                    </div>
                )}
            </Card>
        </div>
    );
};

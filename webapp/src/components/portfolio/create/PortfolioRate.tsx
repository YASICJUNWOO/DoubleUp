import React from "react";
import {Col, Row} from "antd";
import {Template} from "../../../interface/interface";

interface Props {
    template: Template;
}

const PortfolioRate: React.FC<Props> = ({template}) => {

    const rates = template.rates;

    return (
        <Row justify={"center"}>
            {rates.map((rate) => (
                <Col
                    key={rate.type + "_section"}
                    span={Math.max(Math.floor((rate.rate / 100) * 24), 2)} // 최소 span 값을 2로 설정 // 비율을 24 그리드 기준으로 나누고, 버림 처리
                >
                    <Row>
                        <Col span={24}
                             id={rate.type + "_title"}
                             style={{
                                 backgroundColor: '#f0f0f0',
                                 textAlign: 'center',
                                 border: '1px solid #ddd',
                                 padding: '10px',
                             }}>
                            {rate.type}: {rate.rate}%
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}
                             style={{
                                 backgroundColor: '#f0f0f0',
                                 textAlign: 'center',
                                 border: '1px solid #ddd',
                                 padding: '10px',
                                 height: '100px',
                             }}>
                            asdfasdfads
                        </Col>
                    </Row>
                </Col>
            ))}
        </Row>
    );
}

export default PortfolioRate;

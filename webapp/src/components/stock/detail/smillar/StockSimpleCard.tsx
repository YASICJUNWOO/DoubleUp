import React from "react";
import {Card, Image, List} from "antd";

const data = [
    {
        title: 'KOSPI 200',
        content: '한국 주식 시장의 대표 지수',
        nation: 'korea',
    },
    {
        title: 'KOSDAQ 100',
        content: '한국 기술주 중심의 지수',
        nation: 'korea',
    },
    {
        title: 'KOSPI 시가총액 TOP 10',
        content: '시가총액이 큰 주식들의 지수',
        nation: 'korea',
    },
    {
        title: 'IT 성장률 TOP 10',
        content: 'IT 기업의 성장률이 높은 주식들의 지수',
        nation: 'usa',
    },
];


export const StockSimpleCard: React.FC = () => {
    return (
        <List
            grid={{gutter: 16, column: 4}}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Card
                        title={item.title}
                        extra={<Image width={25} src={`/images/flags/${item.nation}.png`} preview={false} />}
                    >
                        {item.content}
                    </Card>
                </List.Item>
            )}
        />
    );
}
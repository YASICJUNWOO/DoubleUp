import {Line} from "@ant-design/plots";
import React from "react";

export const Test = () => {
    const indexPriceList = [
        {
            index: 'KOSPI',
            price: 2_500,
            priceRangeRate: 0.5
        },
        {
            index: 'KOSDAQ',
            price: 1_500
        },
        {
            index: 'S&P500',
            price: 3_000
        },
        {
            index: 'NASDAQ',
            price: 2_000
        },
    ];

    const indexPriceData= [
        {
            time: '8:00',
            price: 2_500
        },
        {
            time: '9:00',
            price: 1_500
        },
        {
            time: '10:00',
            price: 3_000
        },
        {
            time: '11:00',
            price: 2_000
        },
        {
            time: '12:00',
            price: 2_500
        }
    ]

    return (
        <Line
            data={indexPriceData}
            padding="auto"
            xField="time"
            yField="price"
            smooth
            autoFit={true} /* 부모 크기에 맞게 자동 조정 */
            appendPadding={[10, 10, 10, 10]} /* 그래프 여백 설정 */
            tooltip={false}
            xAxis={{
                line: null, // X축 라인 제거
                label: null, // X축 레이블 제거
                tickLine: null, // X축 눈금선 제거
            }}
            yAxis={{
                line: null, // Y축 라인 제거
                label: null, // Y축 레이블 제거
                tickLine: null, // Y축 눈금선 제거
                grid: null, // Y축 격자선 제거
            }}
        />
    );
};
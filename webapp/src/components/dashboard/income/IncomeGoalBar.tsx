import {Bar} from "@ant-design/charts";
import React from "react";

type Props = {
    data: any[];
};

export const IncomeGoalBar: React.FC<Props> = ({data}) => {


    const config = {
        data: data,
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
        <Bar
            {...config}
            legend={false}
        />
    );
}
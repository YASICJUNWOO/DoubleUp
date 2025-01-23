import {Income} from "./interface";
import {DualAxes} from "@ant-design/charts";
import React from "react";

type Props = {
    data: Income[];
};

export const IncomeBarChart: React.FC<Props> = ({data}) => {

    // 주 Bar
    const transformDataList = (data: Income[]): any[] => {
        return data.flatMap((item) => [
            {time: item.month.toString(), value: item.income, type: "수입"},
            {time: item.month.toString(), value: item.expense, type: "지출"},
        ]);
    };

    // 보조 Line
    const transformData = data.map((item) => ({
        time: item.month.toString(),
        count: item.totalIncome,
    }));

    const maxValue = Math.max(...data.flatMap((item) => [item.income, item.expense]));

    const config = {
        data: [transformDataList(data), transformData],
        xField: 'time',
        yField: ['value', 'count'],
        yAxis: {
            value: {
                min: 0,
                max: maxValue,
            },
            count: {
                min: 0,
                max: maxValue,
            },
        },
        geometryOptions: [
            {
                geometry: 'column',
                isGroup: true,
                seriesField: 'type',
            },
            {
                geometry: 'line',
                lineStyle: {
                    lineWidth: 2,
                },
            },
        ],
    };

    return (
        <DualAxes
            {...config}
            legend={
                {
                    position: 'top',
                }
            }
        />
    )
}
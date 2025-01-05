import {InputNumber, Table} from "antd";
import React, {useEffect} from "react";
import {DualAxes} from "@ant-design/charts";

type Props = {
    data: any[];
    isEdit: boolean;
    setData: any;
};

export const IncomeTable: React.FC<Props> = ({data, isEdit, setData}) => {


    const columns = [
        {
            title: "월",
            dataIndex: "month",
            key: "month",
        },
        {
            title: "수입",
            dataIndex: "income",
            key: "income",
            render: (text: any, record: any) =>
                isEdit
                    ?
                    <InputNumber
                        size="small"
                        min={1}
                        defaultValue={Number(text)}
                        onChange={(value) => handleChange(value!, record.key, "income")}/>
                    : text
        },
        {
            title: "지출",
            dataIndex: "expense",
            key: "expense",
            render: (text: any, record: any) =>
                isEdit ? (
                    <InputNumber
                        size="small"
                        min={1} defaultValue={Number(text)}
                        onChange={(value) => handleChange(value!, record.key, "expense")}
                    />
                ) : text
        },
        {
            title: "순이익",
            dataIndex: "totalIncome",
            key: "totalIncome",
        }
    ];

    useEffect(() => {

    }, [data]);


    const handleChange = (value: number, key: string, field: string) => {
        console.log(value, key, field);
        const updatedData = data.map((item) => {
            if (item.key === key) {
                const newTotalIncome = field === "income" ? value - item.expense : item.income - value;
                return {
                    ...item,
                    [field]: value,
                    totalIncome: newTotalIncome
                };
            }
            return item;
        });

        setData(updatedData);
    };

    const transformDataList = (data: any[]): any[] => {
        let list: any[] = [];

        data.forEach((item) => {
            const income = item.income;
            const expense = item.expense;

            const items = {
                time: item.month,
                value: income,
                type: "수입"
            };

            console.log(items);

            list.push(items);

            list.push({
                time: item.month,
                value: expense,
                type: "지출"
            });

        });

        return list;
    }

    const transformData = data.map((item) => {
        return {
            time: item.month,
            count: item.totalIncome,
        };
    });

    const config = {
        data: [transformDataList(data), transformData],
        xField: 'time',
        yField: ['value', 'count'],
        yAxis: {
            value: {
                min: 0,
                max: 15000,
            },
            count: {
                min: 0,
                max: 15000,
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
        <>
            <DualAxes {...config} />
            <Table
                size="small"
                columns={columns}
                dataSource={data}
                pagination={false}/>
        </>
    )
}
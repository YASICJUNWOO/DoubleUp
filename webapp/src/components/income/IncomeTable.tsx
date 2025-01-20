import {InputNumber, Table} from "antd";
import React from "react";
import {Income} from "./interface";

type Props = {
    loading: boolean;
    data: Income[];
    isEdit: boolean;
    setData: any;
};

export const IncomeTable: React.FC<Props> = ({loading, data, isEdit, setData}) => {

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
            render: (text: any, record: Income) =>
                isEdit
                    ?
                    <InputNumber
                        size="small"
                        min={1}
                        defaultValue={Number(text)}
                        onChange={(value) => handleChange(value!, record.id, "income")}/>
                    : text
        },
        {
            title: "지출",
            dataIndex: "expense",
            key: "expense",
            render: (text: any, record: Income) =>
                isEdit ? (
                    <InputNumber
                        size="small"
                        min={1}
                        defaultValue={Number(text)}
                        onChange={(value) => handleChange(value!, record.id, "expense")}
                    />
                ) : text
        },
        {
            title: "순이익",
            dataIndex: "totalIncome",
            key: "totalIncome",
        }
    ];

    const handleChange = (value: number, id: string, field: string) => {
        const updatedData = data.map((item) => {
            if (item.id === id) {
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

    return (

        <Table
            loading={loading}
            size="small"
            columns={columns}
            dataSource={data.map((item) => ({...item, key: item.id}))}
            pagination={false}
        />
    )
}
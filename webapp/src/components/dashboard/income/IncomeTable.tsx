import {Button, Table, Typography} from "antd";
import React from "react";
import {Income} from "./interface";
import {EditFilled} from "@ant-design/icons";

const {Text} = Typography

type Props = {
    loading: boolean;
    data: Income[];
    setData: any;
    setSelectedIncome: (income: Income) => void
};

export const IncomeTable: React.FC<Props> = ({loading, data, setData, setSelectedIncome}) => {

    const columns = [
        {
            title: "월",
            dataIndex: "monthValue",
            key: "month",
        },
        {
            title: "수입",
            dataIndex: "income",
            key: "income",
        },
        {
            title: "지출",
            dataIndex: "expense",
            key: "expense",
        },
        {
            title: "순이익",
            dataIndex: "totalIncome",
            key: "totalIncome",
            render: (text: any, record: Income) =>
                <Text type={text < 0 ? "danger" : text > 0 ? "success" : undefined}>
                    {text}
                </Text>
        },
        {
            key: "detail",
            render: (record: Income) =>
                <Button
                    onClick={() => setSelectedIncome(record)}
                    icon={<EditFilled/>}
                    size="small"
                />
        }
    ];

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
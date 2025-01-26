import {Button, Table} from "antd";
import React from "react";
import {Income} from "./interface";
import {EditFilled} from "@ant-design/icons";

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
            dataIndex: "month",
            key: "month",
        },
        {
            title: "수입",
            dataIndex: "income",
            key: "income",
            render: (text: any, record: Income) =>
                // isEdit
                //     ?
                //     <InputNumber
                //         size="small"
                //         min={1}
                //         defaultValue={Number(text)}
                //         onChange={(value) => handleChange(value!, record.id, "income")}/>
                //     :
                text
        },
        {
            title: "지출",
            dataIndex: "expense",
            key: "expense",
            render: (text: any, record: Income) =>
                // isEdit ? (
                //     <InputNumber
                //         size="small"
                //         min={1}
                //         defaultValue={Number(text)}
                //         onChange={(value) => handleChange(value!, record.id, "expense")}
                //     />
                // ) :
                    text
        },
        {
            title: "순이익",
            dataIndex: "totalIncome",
            key: "totalIncome",
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
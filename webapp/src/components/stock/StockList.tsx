import React, {useEffect, useState} from "react";
import {Table, TableProps} from "antd";
import {IStock} from "../../interface/interface";
import axios from "axios";

type DataIndex = keyof IStock;

export const StockList: React.FC = () => {

    const [stocks, setStocks] = useState<IStock[]>([]);

    useEffect(() => {
        axios.get('/api/stock/all')
            .then(response => {
                setStocks(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const columns: TableProps<IStock>['columns'] = [
        {
            title: '티커',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '거래소',
            dataIndex: 'market',
            key: 'market',
            filters: [
                {
                    text: '한국',
                    value: 'korea',
                    children: [
                        {text: '코스피', value: 'KOSPI'},
                        {text: '코스닥', value: 'KOSDAQ'}
                    ]
                },
                {
                    text: '미국',
                    value: 'usa',
                    children: [
                        {text: 'NYSE', value: 'NYSE'},
                        {text: 'NASDAQ', value: 'NASDAQ'}
                    ]
                }
            ],
            onFilter: (value, record) => record.market.indexOf(value as string) === 0
        },
        {
            title: '유형',
            dataIndex: 'stockType',
            key: 'stockType',
            filters: [
                {text: '주식', value: 'COMMON'},
                {text: 'ETF', value: 'ETF'}
            ],
            onFilter: (value, record) => record.stockType.indexOf(value as string) === 0
        }
    ];

    return (
        <div>
            <Table dataSource={stocks} columns={columns} rowKey="id"/>
        </div>
    )
}
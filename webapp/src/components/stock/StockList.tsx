import React, {useEffect, useState} from "react";
import {Table, TableProps} from "antd";
import {IStock} from "../../interface/interface";
import axios from "axios";

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
		},
		{
			title: '유형',
			dataIndex: 'stockType',
			key: 'stockType',
        }
    ];

    return (
        <div>
			<Table dataSource={stocks} columns={columns} rowKey="id"/>
		</div>
	)
}
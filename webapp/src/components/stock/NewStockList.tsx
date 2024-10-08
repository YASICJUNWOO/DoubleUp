import React, {useEffect, useState} from "react";
import {Col, Row, Table} from "antd";
import {IStock} from "../../interface/interface";
import axios from "axios";
import {formatMarketCap} from "../../util/money";
import { useNavigate } from "react-router-dom";

const columns = [
    {
        title: '티커',
        dataIndex: 'symbol',
        key: 'symbol',
        width: 100
    },
    {
        title: '종목명',
        dataIndex: 'name',
        key: 'name',
        width: 200
    },
    {
        title: '시장',
        dataIndex: 'market',
        key: 'market',
        width: 100
    },
    {
        title: '종목유형',
        dataIndex: 'stockType',
        key: 'stockType',
        width: 100
    },
    {
        title: '시가총액(억)',
        dataIndex: 'marketCap',
        key: 'marketCap',
        width: 100,
        render: (marketCap: number) => formatMarketCap(marketCap)
    }
];

export const NewStockList:React.FC = () => {

    const [stocks, setStocks] = useState<IStock[]>([]);

    useEffect(() => {
        const dataFetch = async () => {
            axios.post<IStock[]>('/api/stocks/marketCap?size=10&page=0')
                .then(response => {
                    setStocks(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }


        dataFetch();
    }, []);

    // 행 클릭 시 실행될 함수
    const navigate = useNavigate();

    const handleRowClick = (record: IStock) => {
        navigate(`/stocks/${record.stockId}`);
    };

    return (
        <div>
            <Row>
                <Col offset={4} span={16}>
                    <Table
                        id="stockList"
                        dataSource={stocks}
                        columns={columns}
                        rowKey="stockId"
                        size="small"
                        onRow={(record) => {
                            return {
                                onClick: () => handleRowClick(record), // 행 클릭 이벤트 핸들러
                            };
                        }}
                    />
                </Col>
            </Row>
        </div>
    )

}
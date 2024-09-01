import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Card } from "antd";
import StockPriceChart from "./chart/StockPriceChart";

/**
 * 특정 일자 주식 가격 정보를 나타내는 컴포넌트
 */

interface StockPriceData {
    id: number;
    date: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
}

const StockPrice: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [stockPrices, setStockPrices] = useState<StockPriceData>();

    const [stockPriceList, setStockPriceList] = useState<StockPriceData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/stock-prices/date', {
                    params: {
                        stockId: '1',
                        date: '2021-01-01',
                    }
                });
                setStockPrices(response.data);
                console.log("<<<<<<<Stock prices>>>>>>", response.data);
            } catch (error) {
                console.error("Error fetching stock prices:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchStockPriceList = async () => {
            axios.get('/api/stock-prices', {
                params:{
                    'stockId': '1',
                    'periodType': 'DAILY'
                }
            }).then((response) => {
                console.log("<<<<<<<Stock prices list>>>>>>", response.data);
                setStockPriceList(response.data);
            }).catch((error) => {
                console.error("Error fetching stock prices list:", error);
            });
        }

        fetchData();
        fetchStockPriceList();
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            {isLoading ? (
                <Spin tip="Loading stock prices..." />
            ) : (
                <div>
                    {stockPrices ? (
                        <Card title="Stock Prices" bordered={true}>
                            <p><strong>Date:</strong> {stockPrices.date}</p>
                            <p><strong>Open Price:</strong> {stockPrices.openPrice}</p>
                            <p><strong>Close Price:</strong> {stockPrices.closePrice}</p>
                            <p><strong>High Price:</strong> {stockPrices.highPrice}</p>
                            <p><strong>Low Price:</strong> {stockPrices.lowPrice}</p>
                            <p><strong>Volume:</strong> {stockPrices.volume}</p>
                        </Card>
                    ) : (
                        <p>No stock prices available for the selected period.</p>
                    )}
                    <StockPriceChart stockPriceDataList={stockPriceList} />

                </div>
            )}
        </div>
    );
}

export default StockPrice;

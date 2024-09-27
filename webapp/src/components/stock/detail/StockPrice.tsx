import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spin, Statistic, Typography} from "antd";
import {ArrowUpOutlined} from "@ant-design/icons";
import {useStock} from "./StockDetail";

const {Text, Title} = Typography;

/**
 * 특정 일자 주식 가격 정보를 나타내는 컴포넌트
 */
interface StockPriceData {
    stockPriceId: number;
    date: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
}


const StockPrice: React.FC = () => {
    const {stockId} = useStock();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [stockPrices, setStockPrices] = useState<StockPriceData>();

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            try {
                const response = await axios.get('/api/stock-prices/date', {
                    params: {
                        stockId: stockId,
                        date: date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
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


        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Spin tip="Loading stock prices..."/>
            ) : (
                <div>
                    {stockPrices ? (
                        <div style={{display: 'flex'}}>
                            <div id="stock-detail-today-price" style={{marginInline: '10px'}}>
                                <Text strong style={{fontSize: "50px"}}>${stockPrices.closePrice}</Text>
                            </div>
                            <div id="stock-detail-change-rate"
                                 style={{display: 'flex', alignItems: 'flex-end', marginBottom: '15px'}}>
                                <Statistic
                                    value={11.28}
                                    precision={2}
                                    valueStyle={{color: '#3f8600'}}
                                    prefix={<ArrowUpOutlined/>}
                                    suffix="%"
                                />
                            </div>
                        </div>
                    ) : (
                        <p>No stock prices available for the selected period.</p>
                    )}
                </div>
            )}
        </>
    );
}

export default StockPrice;

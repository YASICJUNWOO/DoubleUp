import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spin, Statistic, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {useStock} from "./StockDetail";
import {formatNumber} from "../../../util/money";

const {Text} = Typography;

/**
 * 특정 일자 주식 가격 정보를 나타내는 컴포넌트
 */
interface StockPriceData {
    stockPriceId: number;
    date: string;
    currentPrice: number,
    priceChangeRate: number,
    priceChange: number,
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
            try {
                const response = await axios.get('/api/stock-prices/now', {
                    params: {
                        stockId: stockId
                    }
                });

                if(response.data.currentPrice !== null){
                    setStockPrices(response.data);
                }

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
                                <Text strong style={{fontSize: "50px"}}>₩{formatNumber(stockPrices.currentPrice)}</Text>
                            </div>
                            <div id="stock-detail-change-rate"
                                 style={{display: 'flex', alignItems: 'flex-end', marginBottom: '15px'}}>
                                <Statistic
                                    value={stockPrices.priceChange}
                                    precision={2}
                                    valueStyle={stockPrices.priceChangeRate > 0 ? {color: '#cf1322'} : {color: '#284ecc'}}
                                    prefix={stockPrices.priceChangeRate > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                                    suffix={` (${stockPrices.priceChangeRate.toFixed(2)}%)`}
                                />
                            </div>
                        </div>
                    ) : (
                        <Spin tip="데이터를 불러오는 중입니다..." />
                    )}
                </div>
            )}
        </>
    );
}

export default StockPrice;

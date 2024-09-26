import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Spin, Statistic, Typography} from "antd";
import StockPriceChart from "../chart/StockPriceChart";
import {useParams} from "react-router-dom";
import {ArrowUpOutlined} from "@ant-design/icons";
import {StockInfoTabs} from "./StockInfoTabs";

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

    const id = useParams<{ id: string }>().id!;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [stockPrices, setStockPrices] = useState<StockPriceData>();

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            try {
                const response = await axios.get('/api/stock-prices/date', {
                    params: {
                        stockId: id,
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
        <div>

            {isLoading ? (
                <Spin tip="Loading stock prices..."/>
            ) : (
                <div>
                    {stockPrices ? (
                        // <Card title="Stock Prices" bordered={true}>
                        //     <p><strong>Date:</strong> {stockPrices.date}</p>
                        //     <p><strong>Open Price:</strong> {stockPrices.openPrice}</p>
                        //     <p><strong>Close Price:</strong> {stockPrices.closePrice}</p>
                        //     <p><strong>High Price:</strong> {stockPrices.highPrice}</p>
                        //     <p><strong>Low Price:</strong> {stockPrices.lowPrice}</p>
                        //     <p><strong>Volume:</strong> {stockPrices.volume}</p>
                        // </Card>

                        <Row id={'summary'}>
                            <Col offset={2} span={6} style={{display: "flex"}}>
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
                            </Col>
                        </Row>
                    ) : (
                        <p>No stock prices available for the selected period.</p>
                    )}
                    <Row>
                        <Col offset={3} span={18}>
                            <StockInfoTabs/>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default StockPrice;

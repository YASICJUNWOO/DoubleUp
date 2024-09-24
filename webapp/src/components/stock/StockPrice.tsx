import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Flex, Row, Spin, Statistic, Typography} from "antd";
import StockPriceChart from "./chart/StockPriceChart";
import {useParams} from "react-router-dom";
import {ArrowUpOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

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

    const id = useParams<{ id: string }>().id;

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [stockPrices, setStockPrices] = useState<StockPriceData>();

    const [stockPriceList, setStockPriceList] = useState<StockPriceData[]>([]);

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

        const fetchStockPriceList = async () => {
            axios.get('/api/stock-prices', {
                params: {
                    'stockId': id,
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
                            <Col offset={2} span={6}>
                                <Flex>
                                    <div style={{marginInline: '10px'}}>
                                        <Text strong style={{fontSize: "50px"}}>{stockPrices.closePrice}</Text>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '20px'}}>
                                        <Statistic
                                            value={11.28}
                                            precision={2}
                                            valueStyle={{color: '#3f8600'}}
                                            prefix={<ArrowUpOutlined/>}
                                            suffix="%"
                                        />
                                    </div>
                                </Flex>
                            </Col>
                        </Row>
                    ) : (
                        <p>No stock prices available for the selected period.</p>
                    )}
                    <Row>
                        <Col offset={2} span={20}>
                            <StockPriceChart stockPriceDataList={stockPriceList}/>
                        </Col>
                    </Row>
                </div>
            )}
        </div>
    );
}

export default StockPrice;

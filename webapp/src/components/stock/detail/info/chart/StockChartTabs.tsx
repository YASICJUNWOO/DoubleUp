import React, {useEffect, useState} from "react";
import {ConfigProvider, Tabs} from "antd";
import {CompassOutlined, LineChartOutlined} from "@ant-design/icons";
import StockCandleChart from "./StockCandleChart"; // 추가한 컴포넌트 가져오기
import StockPriceChart from "./StockPriceChart";
import axios from "axios";
import {useStockOld} from "../../StockDetail";

const onChange = (key: string) => {
    console.log(key);
};

// contentTemplate 함수 정의
const contentTemplate = (Component: React.ReactNode) => {
    // 전달된 컴포넌트에 스타일을 적용하여 반환
    return (
        <div id="contentTemplate" style={{marginBottom:"20px", border:'1px solid #f0f0f0', padding:'20px'}} className={'custom-shadow'}>
            {Component}
        </div>
    );
};


export interface StockPriceData {
    stockPriceId: number;
    date: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
}

const StockInfoTabs: React.FC = () => {

    const {stockId} = useStockOld();
    const [stockPriceList, setStockPriceList] = useState<StockPriceData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // 주식 가격 정보 가져오기 ( 일봉 )
    useEffect(() => {
        const fetchStockPriceList = async () => {
            axios.get('/api/stock-prices', {
                params: {
                    'stockId': stockId,
                    'periodType': 'DAILY'
                }
            }).then((response) => {
                console.log("<<<<<<<Stock prices list>>>>>>", response.data);
                setStockPriceList(response.data);
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching stock prices list:", error);
            });
        }

        fetchStockPriceList();
    }, []);

    const items = [
        {label: '캔들차트', key: '2', children:contentTemplate(<StockCandleChart stockPriceList={stockPriceList}/>), icon: <CompassOutlined/>},
        {label: '라인차트', key: '1', children:contentTemplate(<StockPriceChart stockPriceList={stockPriceList}/>), icon: <LineChartOutlined/>},
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {},
                },
            }}
        >
            <Tabs
                destroyInactiveTabPane
                onChange={onChange}
                type="card"
                size="middle"
                items={items}
            />
        </ConfigProvider>
    );
}

export default StockInfoTabs;
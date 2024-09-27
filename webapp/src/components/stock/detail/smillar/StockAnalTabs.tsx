import React from "react";
import StockPriceChart from "../info/chart/StockPriceChart";
import {CompassOutlined, InfoCircleOutlined, LineChartOutlined} from "@ant-design/icons";
import StockInfo from "../info/StockInfo";
import {ConfigProvider, Tabs} from "antd";
import {StockSimpleCard} from "./StockSimpleCard";

const onChange = (key: string) => {
    console.log(key);
};

// contentTemplate 함수 정의
const contentTemplate = (Component: React.ReactNode) => {
    // 전달된 컴포넌트에 스타일을 적용하여 반환
    return (
        <div id="contentTemplate" style={{marginBottom:"20px", border:'1px solid #f0f0f0', padding:'20px'}}>
            {Component}
        </div>
    );
};

export const StockAnalTabs:React.FC = () => {
    const items = [
        {label: '국가', key: '1', children: contentTemplate(<StockSimpleCard/>), icon: <LineChartOutlined/>}, // remember to pass the key prop
        {label: '섹터', key: '2', children: contentTemplate(<StockInfo/>), icon: <InfoCircleOutlined/>},
        {label: '비교', key: '3', children: '예정', icon: <CompassOutlined />},
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
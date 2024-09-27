import React from "react";
import {ConfigProvider, Tabs} from "antd";
import StockPriceChart from "./chart/StockPriceChart";
import StockInfo from "./StockInfo";
import {CompassOutlined, InfoCircleOutlined, LineChartOutlined} from "@ant-design/icons";

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


const StockInfoTabs: React.FC = () => {

    const items = [
        {label: '차트', key: '1', children:contentTemplate(<StockPriceChart/>), icon: <LineChartOutlined/>}, // remember to pass the key prop
        {label: '상세 정보', key: '2', children: contentTemplate(<StockInfo/>), icon: <InfoCircleOutlined/>},
        {label: '비교', key: '3', children: contentTemplate(<span>구현예정</span>), icon: <CompassOutlined />},
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
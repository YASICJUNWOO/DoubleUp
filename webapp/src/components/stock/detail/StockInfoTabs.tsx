import React from "react";
import {ConfigProvider, Tabs} from "antd";
import {useParams} from "react-router-dom";
import StockPriceChart from "../chart/StockPriceChart";
import {InfoCircleOutlined, LineChartOutlined} from "@ant-design/icons";

const onChange = (key: string) => {
    console.log(key);
};

export const StockInfoTabs: React.FC = () => {

    const stockId = useParams().id! as string;

    const {TabPane} = Tabs;

    //1번은 <StockPriceChart stockId={stockId}/>

    const tab1 = (
        <TabPane tab="Tab 1" key="1">
            <StockPriceChart stockId={stockId}/>
        </TabPane>
    );

    //2번은 <StockPriceChart stockId={stockId}/>

    const tab2 = (
        <TabPane tab="Tab 2" key="2">

        </TabPane>
    );

    const items = [
        {label: '차트', key: '1', children: <StockPriceChart stockId={stockId}/>, icon:<LineChartOutlined />}, // remember to pass the key prop
        {label: '상세 정보', key: '2', children: 'Content 2', icon:<InfoCircleOutlined />},
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                    },
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
import React, {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Alert, Col, message, Row, Spin, Typography} from "antd";
import {StarOutlined} from "@ant-design/icons";
import StockPrice from "./StockPrice";
import {IStock} from "../../../interface/interface";
import {StockAnalTabs} from "./smillar/StockAnalTabs";
import StockInfoTabs from "./info/StockInfoTabs";

/**
 * 특정 주식 정보를 나타내는 컴포넌트
 */

interface StockContextType {
    stockId: string | null;
    stock: IStock | null;
    loading: boolean;
    error: string | null;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStock = (): StockContextType => {
    const context = useContext(StockContext);

    if (!context) {
        throw new Error("useStock must be used within a StockProvider");
    }

    return context;
};

const StockDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [stock, setStock] = useState<IStock | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [messageApi, contextHolder] = message.useMessage();
    const info = () => {
        messageApi.open({
            type: 'success',
            content: '즐겨찾기에 추가되었습니다',
        });
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/stock/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch stock data");
                    }
                    return res.json();
                })
                .then((data) => {
                    setStock(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load stock data.");
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <Spin tip="Loading..."/>;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon/>;
    }


    return (

        <>
            <StockContext.Provider value={{stockId: id!, stock, loading, error}}>
                {contextHolder}
                {stock ? (
                    <div>
                        <div id={'header'}>
                            {/* head */}
                            <Row>
                                <Col offset={4} span={20}>
                                    <Row id={'title'}>
                                        <Col style={{display: "flex"}}>
                                            <Typography.Title level={2} style={{marginBlock: '15px',}}>
                                                {stock.symbol} - <span style={{color: 'gray'}}>{stock.name}</span>
                                            </Typography.Title>
                                        </Col>
                                        <Col id='star' span={1}
                                             style={{
                                                 display: 'flex',
                                                 alignContent: "center",
                                                 justifyContent: 'center'
                                             }}>c
                                            <StarOutlined style={{fontSize: '25px', color: '#f1c40f'}} onClick={info}/>
                                        </Col>
                                    </Row>
                                    <Row id={'summary'}>
                                        <Col>
                                            <StockPrice/>
                                        </Col>
                                    </Row>
                                    <Row id="stockInfoTabsRow">
                                        <Col span={20}>
                                            <StockInfoTabs/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={20}>
                                            <StockAnalTabs/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div>No stock details available.</div>
                )}
            </StockContext.Provider>
        </>

    );
};

export default StockDetail;

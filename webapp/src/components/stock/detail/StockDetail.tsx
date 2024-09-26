import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Alert, Col, message, Row, Spin, Typography} from "antd";
import {StarOutlined} from "@ant-design/icons";
import StockPrice from "./StockPrice";
import {StockInfoTabs} from "./StockInfoTabs";

/**
 * 특정 주식 정보를 나타내는 컴포넌트
 */

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

interface StockDetailInfo {
    stockId: number;
    symbol: string;
    name: string;
    market: string;
}

const StockDetail: React.FC = () => {
    const {id} = useParams<RouteParams>();
    const [stock, setStock] = useState<StockDetailInfo | null>(null);
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
            {contextHolder}
            {stock ? (
                <div>
                    <div id={'header'}>
                        {/* head */}
                        <Row id={'title'}>
                            <Col id='star' offset={2} span={1}
                                 style={{display: 'flex', alignContent: "center", justifyContent: 'center'}}>
                                <StarOutlined style={{fontSize: '25px', color: '#f1c40f'}} onClick={info}/>
                            </Col>
                            <Col span={12} style={{display: "flex"}}>
                                <Typography.Title level={2} style={{marginBlock: '15px',}}>
                                    {stock.symbol} - <span style={{color: 'gray'}}>{stock.name}</span>
                                </Typography.Title>
                            </Col>
                        </Row>
                        <StockPrice/>
                    </div>
                </div>
            ) : (
                <div>No stock details available.</div>
            )}
        </>
    );
};

export default StockDetail;

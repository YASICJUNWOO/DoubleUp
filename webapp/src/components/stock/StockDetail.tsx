import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Alert, Card, Col, Row, Spin, Statistic, Typography} from "antd";
import StockPrice from "./StockPrice";

/**
 * 특정 주식 정보를 나타내는 컴포넌트
 */

interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

interface StockDetailInfo {
    id: number;
    symbol: string;
    name: string;
    market: string;
}

const StockDetail: React.FC = () => {
    const {id} = useParams<RouteParams>();
    const [stock, setStock] = useState<StockDetailInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return stock ? (
        <div>
            <div id={'header'}>
                {/* head */}
                <Row id={'title'}>
                    <Col offset={2} span={12}>
                        <Typography.Title level={2}>{stock.symbol} - {stock.name}</Typography.Title>
                    </Col>
                </Row>
                <StockPrice/>
            </div>
        </div>
    ) : (
        <div>No stock details available.</div>
    );
};

export default StockDetail;

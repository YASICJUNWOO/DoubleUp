import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, Alert, Space } from "antd";
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
    const { id } = useParams<RouteParams>();
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
        return <Spin tip="Loading..." />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    return stock ? (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title={stock.name} bordered={true}>
                <p><strong>ID:</strong> {stock.id}</p>
                <p><strong>Symbol:</strong> {stock.symbol}</p>
                <p><strong>Market:</strong> {stock.market}</p>
            </Card>
            <StockPrice />
        </Space>
    ) : (
        <div>No stock details available.</div>
    );
};

export default StockDetail;

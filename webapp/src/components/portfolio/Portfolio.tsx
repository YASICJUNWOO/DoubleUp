import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, List, Typography, Spin } from 'antd';
import PortfolioAssetPieChart from './PortfolioAssetPieChart'; // 차트 컴포넌트 가져오기

const { Title, Text } = Typography;

interface Stock {
    id: number;
    symbol: string;
    name: string;
    market: string;
}

interface PortfolioStock {
    id: number;
    stock: Stock;
    quantity: number;
    totalAmount: number;
    averagePrice: number;
}

interface PortfolioData {
    id: number;
    memberName: string;
    name: string;
    portfolioStocks: PortfolioStock[];
}

const Portfolio: React.FC = () => {
    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get('/api/portfolio/22')
            .then(response => {
                setPortfolio(response.data);
                console.log("Portfolio data fetched successfully!", response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the portfolio data!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spin tip="Loading portfolio..." />;
    }

    if (!portfolio) {
        return <div>No portfolio data found.</div>;
    }

    return (
        <Card title={<Title level={2}>{portfolio.name}</Title>} style={{ margin: '20px' }}>
            <Card type="inner" title={<Title level={4}>Member: {portfolio.memberName}</Title>}>
                <PortfolioAssetPieChart portfolioStocks={portfolio.portfolioStocks} />
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={portfolio.portfolioStocks}
                    renderItem={stockItem => (
                        <List.Item key={stockItem.id}>
                            <List.Item.Meta
                                title={<Title level={5}>{stockItem.stock.name} ({stockItem.stock.symbol})</Title>}
                                description={<Text type="secondary">{stockItem.stock.market}</Text>}
                            />
                            <div>
                                <Text>Quantity: {stockItem.quantity}</Text><br />
                                <Text>Total Amount: ₩{stockItem.totalAmount.toLocaleString()}</Text><br />
                                <Text>Average Price: ₩{stockItem.averagePrice.toLocaleString()}</Text>
                            </div>
                        </List.Item>
                    )}
                />
            </Card>
        </Card>
    );
};

export default Portfolio;

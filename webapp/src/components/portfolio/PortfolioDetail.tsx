import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, Col, List, Row, Segmented, Spin, Typography} from 'antd';
import PortfolioAssetPieChart from './PortfolioAssetPieChart';
import {useParams} from "react-router-dom";
import PortFolioStock from "./PortFolioStock"; // 차트 컴포넌트 가져오기
import {PortfolioStockDetail} from "../../interface/interface";

const {Title, Text} = Typography;

interface PortfolioData {
    id: number;
    memberName: string;
    name: string;
    portfolioStocks: PortfolioStockDetail[];
}

const PortfolioDetail: React.FC = () => {

    const {id} = useParams<{ id: string }>();

    const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [options, setOptions] = useState(['주식별', '유형별', '시장별']);

    const [totalSum, setTotalSum] = useState<number>(0);

    useEffect(() => {
        axios.get('/api/portfolio/' + id)
            .then(response => {
                setPortfolio(response.data);
                console.log("PortfolioDetail data fetched successfully!", response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the portfolio data!", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setTotalSum(portfolio?.portfolioStocks.reduce((acc, stock) => acc + Number(stock.totalAmount), 0) || 0);
    }, [portfolio]);

    if (loading) {
        return <Spin tip="Loading portfolio..."/>;
    }

    if (!portfolio) {
        return <div>No portfolio data found.</div>;
    }


    return (
        <Row>
            <Col span={12}>
                <Card type="inner" title={<Title level={4}>{portfolio.name}</Title>}>
                    <Segmented id='chartOption' options={options}/>
                    <PortfolioAssetPieChart portfolioStocks={portfolio.portfolioStocks}/>
                </Card>
            </Col>
            <Col span={12}>
                <Card type="inner" title={<Title level={4}>보유 주식 목록</Title>}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={portfolio.portfolioStocks}
                        renderItem={stockItem => <PortFolioStock stockItem={stockItem}/>}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default PortfolioDetail;

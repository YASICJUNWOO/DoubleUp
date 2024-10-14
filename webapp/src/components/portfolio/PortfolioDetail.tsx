import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Card, Col, List, Row, Segmented, Spin, Typography} from 'antd';
import PortfolioAssetPieChart from './PortfolioAssetPieChart';
import {useNavigate, useParams} from "react-router-dom";
import PortFolioStock from "./PortFolioStock"; // 차트 컴포넌트 가져오기
import {IPortfolio} from "../../interface/interface";

const {Title, Text} = Typography;

const PortfolioDetail: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
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

    const handleEditClick = () => {
        console.log("Edit button clicked!",portfolio);
        navigate(`/portfolio/edit/${id}`, { state: { portfolio } });
    };

    if (loading) {
        return <Spin tip="Loading portfolio..."/>;
    }

    if (!portfolio) {
        return <div>No portfolio data found.</div>;
    }


    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card type="inner"
                      title={
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Title level={4} style={{ marginBottom: 0 }}>{portfolio.name}</Title>
                              {/* 수정 버튼 추가 */}
                              <Button type="primary" onClick={handleEditClick}>
                                  수정
                              </Button>
                          </div>
                      }>
                    <Segmented id='chartOption' options={options}/>
                    <PortfolioAssetPieChart portfolioStocks={portfolio.portfolioStocks}/>
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    type="inner"
                    title={<Title level={4}>보유 주식 목록</Title>}
                >
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

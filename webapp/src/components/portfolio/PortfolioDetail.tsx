import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import {Button, Card, Col, List, Row, Segmented, Spin, Typography} from 'antd';
import PortfolioAssetPieChart from './PortfolioAssetPieChart';
import {useNavigate, useParams} from "react-router-dom";
import PortFolioStock from "./PortFolioStock"; // 차트 컴포넌트 가져오기
import {IPortfolio} from "../../interface/interface";

const {Title, Text} = Typography;

interface sortOption {
    value: string;
    label: string;
}

const sortOptions: sortOption[] = [
    {
        label: '수익률순',
        value: 'profitAndLossRate'
    }, {
        label: '수익금순',
        value: 'profitAndLoss'
    }, {
        label: '수량순',
        value: 'quantity'
    }, {
        label: '투자금액순',
        value: 'totalAmount'
    }
];

const chartOptions = ['주식별', '유형별', '시장별'];


const PortfolioDetail: React.FC = () => {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [chartOption, setChartOption] = useState<string>(chartOptions[0]);
    const [sortOption, setSortOption] = useState<sortOption>(sortOptions[0]);

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

    const handleEditClick = () => {
        console.log("Edit button clicked!", portfolio);
        navigate(`/portfolio/edit/${id}`, {state: {portfolio}});
    };

    // ==============================|| SORT CHANGE HANDLER ||============================== //
    const handleSortChange = (value: string) => {
        const selectedOption = sortOptions.find(option => option.value === value);
        if (selectedOption) {
            setSortOption(selectedOption);
        }
    };

    // useMemo를 사용하여 정렬된 포트폴리오 주식 목록을 캐싱
    const sortedPortfolioStocks = useMemo(() => {
        if (!portfolio || !portfolio.portfolioStocks) return [];

        const newPortfolioStocks = [...portfolio.portfolioStocks];
        return newPortfolioStocks.sort((a, b) => {
            switch (sortOption.value) {
                case 'profitAndLossRate':
                    return b.profitAndLossRate - a.profitAndLossRate;
                case 'profitAndLoss':
                    return b.profitAndLoss - a.profitAndLoss;
                case 'quantity':
                    return b.quantity - a.quantity;
                case 'totalAmount':
                    return b.investmentAmount - a.investmentAmount;
                default:
                    return 0;
            }
        });
    }, [portfolio, sortOption]);

    //==================================================================================================

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
                          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                              <Title level={4} style={{marginBottom: 0}}>{portfolio.name}</Title>
                              {/* 수정 버튼 추가 */}
                              <Button type="primary" onClick={handleEditClick}>
                                  수정
                              </Button>
                          </div>
                      }>
                    <Segmented id='chartOption' options={chartOptions} value={chartOption} onChange={setChartOption}/>
                    <PortfolioAssetPieChart portfolioStocks={portfolio.portfolioStocks} option={chartOption} />
                </Card>
            </Col>
            <Col span={12}>
                <Card
                    type="inner"
                    title={
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Title level={4} style={{marginBottom: 0}}>보유 주식 목록</Title>
                            <Segmented
                                options={sortOptions.map(option => ({label: option.label, value: option.value}))}
                                value={sortOption.value}
                                onChange={handleSortChange}
                            />
                        </div>
                    }
                >
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={sortedPortfolioStocks}
                        renderItem={stockItem => <PortFolioStock stockItem={stockItem}/>}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default PortfolioDetail;

import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, List} from "antd";
import {Link} from "react-router-dom";

interface PortfolioStock {
    id: number;
    stock: {
        id: number;
        symbol: string;
        name: string;
        market: string;
    };
    quantity: number;
    totalAmount: number;
    averagePrice: number;
}

interface PortfolioData {
    id: number;
    name: string;
    totalAmount: number;
    portfolioStocks: PortfolioStock[];
}

const PortfolioList: React.FC = () => {

    const [portfolioList, setPortfolioList] = useState<PortfolioData[]>([]);

    useEffect(() => {
        const fetchPortfolioList = async () => {
            axios.get('/api/portfolio')
                .then(response => {
                    setPortfolioList(response.data);
                    console.log("PortfolioDetail list fetched successfully!", response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the portfolio list!", error);
                });
        }

        fetchPortfolioList();
    }, []);
    return (
        <div style={{padding: "20px"}}>
            <List
                grid={{gutter: 16, column: 4}}
                dataSource={portfolioList}
                renderItem={portfolio => (
                    <List.Item>
                        <Link to={`/portfolio/${portfolio.id}`}>
                            <Card title={portfolio.name} bordered={true}>
                                <p>Total Amount: {portfolio.totalAmount}</p>
                            </Card>
                        </Link>
                    </List.Item>
                )}
                locale={{
                    emptyText: '포트폴리오가 없습니다', // 빈 리스트일 때 보여줄 메시지
                }}
            />
        </div>
    );
}

export default PortfolioList;
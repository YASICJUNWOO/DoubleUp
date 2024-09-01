import React, {useEffect, useState} from "react";
import {Card, List} from "antd";
import {Link} from "react-router-dom";

/**
 * 주식 정보 목록을 나타내는 컴포넌트
 */

interface Stock {
    id: number;
    symbol: string;
    name: string;
    market: string;
}

const StockList: React.FC = () => {
    const [stockList, setStockList] = useState<Stock[]>([]);

    useEffect(() => {
        fetch('/api/stock/all')
            .then(res => res.json())
            .then(data => {
                setStockList(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <div style={{padding: "20px"}}>
            <List
                grid={{gutter: 16, column: 4}} // 그리드 레이아웃 설정 (한 줄에 4개의 카드)
                dataSource={stockList}
                renderItem={item => (
                    <List.Item>
                        <Link to={`/stocks/${item.id}`}>
                            <Card title={item.symbol} bordered={true}>
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Market:</strong> {item.market}</p>
                            </Card>
                        </Link>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default StockList;

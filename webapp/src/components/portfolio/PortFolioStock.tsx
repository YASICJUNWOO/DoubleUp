import {IPortfolioStock, IStock} from "../../interface/interface";
import {Avatar, Descriptions, List, Typography} from "antd";
import React from "react";
import {formatMoney} from "../../util/money";

const { Title, Text } = Typography;

interface PortFolioStockProps {
    stockItem: IPortfolioStock;
}

const PortFolioStock: React.FC<PortFolioStockProps> = ({ stockItem }) => {

    console.log(stockItem);

    const items = [
        {
            key: 'quantity',
            label: '수량',
            children: <span>{stockItem.quantity}</span>
        },
        {
            key: 'totalAmount',
            label: '총 금액',
            children: <span>{formatMoney(stockItem.totalAmount)}</span>
        },
        {
            key: 'averagePrice',
            label: '평균 매수가',
            children: <span>{formatMoney(stockItem.averagePrice)}</span>
        },
        {
            key: 'currentPrice',
            label: '현재 가격',
            children: <span>미구현</span>
        },
        {
            key: 'profitAndLoss',
            label: '손익',
            children: <span>미구현</span>
        },

        //주식 이름 및 심볼: 보유한 주식의 이름과 심볼을 표시.
        // 보유 수량: 각 주식의 보유 주식 수량.
        // 평균 매입 가격: 주식의 평균 매수 단가.
        // 현재 가격: 실시간 주식의 현재 가격.
        // 변동률: 현재 가격 대비 수익률을 보여줌 (예: +5%).
        // 현재 가치: 각 주식의 보유 수량 × 현재 가격으로 계산된 현재 가치를 표시.
        // 수익/손실 금액: 현재 주식의 수익 또는 손실 금액을 표시 (예: +100,000 KRW).
        // 비율: 각 주식이 전체 포트폴리오에서 차지하는 비율(%)을 표시.

        {
            key: 'currentValue',
            label: '현재 가치',
            children: <span>미구현</span>
        },
        {
            key: 'profitAndLossAmount',
            label: '수익/손실 금액',
            children: <span>미구현</span>
        },
        {
            key: 'ratio',
            label: '비율',
            children: <span>미구현</span>
        }
    ];

    return (
        <List.Item key={stockItem.id}>
            <List.Item.Meta
                title={
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Avatar src={`https://logo.clearbit.com/${stockItem.stock.name.toLowerCase().replace(/\s+/g, '')}.com`}/>
                        <Text style={{alignItems: "center"}}>{stockItem.stock.name} ({stockItem.stock.symbol})</Text>
                    </div>
                    <Title level={5}>비율이 들어옴</Title>
                </div>
                }
                description={<Text type="secondary">{stockItem.stock.market}</Text>}
            />
            <Descriptions items={items} />
        </List.Item>
    );
}

export default PortFolioStock;
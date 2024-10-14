import {PortfolioStockDetail} from "../../interface/interface";
import {Avatar, Descriptions, List, Typography} from "antd";
import React from "react";
import {formatMoney, formatPercent} from "../../util/money";
import {useImageErrorHandling} from "../../util/image-loader";
import {Link} from "react-router-dom";

const {Title, Text} = Typography;

interface PortFolioStockProps {
    stockItem: PortfolioStockDetail;
}

const PortFolioStock: React.FC<PortFolioStockProps> = ({stockItem}) => {

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
            children: <span>{formatMoney(stockItem.currentPrice)}</span>
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
            children: <span>{formatMoney(stockItem.currentValue)}</span>
        }
    ];

    // 분리된 이미지 처리 함수 사용
    const {getImageSrc, handleImgError} = useImageErrorHandling();

    return (
        <List.Item key={stockItem.id}>
            <List.Item.Meta
                title={
                    <div
                        style={{
                            display: "flex", justifyContent: "space-between"
                        }}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Link to={`/stocks/${stockItem.stock.stockId}`}>
                                <Avatar
                                    src={getImageSrc(stockItem.stock.symbol, stockItem.stock.name)}
                                    onError={() => handleImgError(stockItem.stock.symbol)} // 이미지 로드 실패 시 호출
                                />
                                <Text
                                    style={{
                                        marginInline: "4px",
                                        alignItems: "center"
                                    }}
                                >
                                    {stockItem.stock.name} ({stockItem.stock.symbol})
                                </Text>
                            </Link>
                            <Text
                                style={{
                                    color: stockItem.profitAndLoss > 0 ? '#cf1322' : '#284ecc'
                                }}
                            >
                                {formatMoney(stockItem.profitAndLoss)} ({stockItem.profitAndLossRate}%)
                            </Text>
                        </div>
                        <Title level={5}>{formatPercent(stockItem.ratio)} %</Title>
                    </div>
                }
                description={<Descriptions items={items}/>
                }
            />

        </List.Item>
    );
}

export default PortFolioStock;
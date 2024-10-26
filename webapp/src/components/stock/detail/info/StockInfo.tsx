import React from "react";
import {Descriptions, DescriptionsProps} from "antd";
import {useStockOld} from "../StockDetail";
import {formatMarketCap} from "../../../../util/money";


const StockInfo:React.FC = () => {

    const { stock } = useStockOld();

    if (!stock) {
        return <p>주식 정보가 없습니다.</p>;
    }

    const borderedItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: '이름',
            children: stock.name,
        },
        {
            key: '2',
            label: '티커 / 구별번호',
            children: stock.symbol
        },
        {
            key: '3',
            label: '거래소',
            children: stock.market
        },
        {
            key: '4',
            label: '주식 유형',
            children: stock.stockType
        },
        {
            key: '5',
            label: '시가총액(억)',
            children: formatMarketCap(stock.marketCap)
        }
    ];

    return (
        <Descriptions
            bordered
            title="Custom Size"
            size="small"
            column={2}
            items={borderedItems}
        />
    );
};

export default StockInfo;
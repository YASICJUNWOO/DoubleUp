import {Avatar, Table, TableProps, Typography,} from 'antd';
import {IStock} from "../../../../interface/interface";
import {useImageErrorHandling} from "../../../../util/image-loader";
import React from "react";
import {useNavigate} from "react-router-dom";
import {formatMarketCap} from "../../../../util/money";

const COLUMNS = (getImageSrc: any, handleImgError: any) => [
   {
    title: '순위',
    key: 'rank',
    width: '8%',
    render: (_: any, __: any, index: number) => {
        let color;
        switch (index) {
            case 0:
                color = 'gold';
                break;
            case 1:
                color = 'silver';
                break;
            case 2:
                color = '#cd7f32';
                break;
            default:
                color = 'inherit';
        }
        return (
            <Typography.Paragraph
                ellipsis={{rows: 1}}
                className="text-capitalize"
                style={{marginBottom: 0, textAlign: 'center', color, fontSize: "16px", fontWeight: "bold"}}
            >
                {index + 1}
            </Typography.Paragraph>
        );
    }
},
    {
        title: '종목명',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: IStock) => {
            return (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0}}
                >
                    <Avatar
                        style={{marginRight: "10px"}}
                        src={getImageSrc(record.symbol, text)}
                        onError={() => handleImgError(record.symbol)}
                    />
                    {text}
                    <Typography.Text type="secondary" style={{marginLeft: "10px", fontSize: "12px"}}>
                        {record.symbol}
                    </Typography.Text>
                </Typography.Paragraph>
            );
        }
    },
    // {
    //     title: '티커',
    //     dataIndex: 'symbol',
    //     key: 'symbol',
    //     render: (_: any, {symbol}: IStock) => (
    //         <Typography.Paragraph
    //             ellipsis={{rows: 1}}
    //             className="text-capitalize"
    //             style={{marginBottom: 0}}
    //         >
    //             {symbol}
    //         </Typography.Paragraph>
    //     ),
    // },
    {
        title: "시장",
        dataIndex: "market",
        key: "market"
    },
    {
        title: '시가총액 (억)',
        dataIndex: 'marketCap',
        key: 'marketCap',
        render: (marketCap: number) => {
            return (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0}}
                >
                    {formatMarketCap(marketCap)}
                </Typography.Paragraph>
            );
        },
    },
];

type Props = {
    data: IStock[];
} & TableProps<any>;

export const StocksTable = ({data, ...others}: Props) => {

    const navigate = useNavigate();
    const {getImageSrc, handleImgError} = useImageErrorHandling(); // 훅을 컴포넌트 내부에서 호출

    return (
        <Table
            size="middle"
            dataSource={data}
            columns={COLUMNS(getImageSrc, handleImgError)} // 컬럼 데이터를 함수로 전달
            className="overflow-scroll"
            onRow={(record) => {
                return {
                    onClick: () => {
                        // 주식 상세 페이지로 이동
                        navigate(`/dashboards/stocks/detail/${record.stockId}`);
                    },
                };
            }}
            {...others}
        />
    );
};

import {Alert, Avatar, CardProps, Table, Typography} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {Card} from '../../../index';
import React, {ReactNode, useMemo} from 'react';
import {PortfolioStockDetail} from "../../../../interface/interface";
import {useImageErrorHandling} from "../../../../util/image-loader";
import {green, red} from "@ant-design/colors";
import CountUp from "react-countup";
import {useNavigate} from "react-router-dom";
import {formatNumber} from "../../../../util/money";

type Props = {
    data?: PortfolioStockDetail[];
    loading?: boolean;
    error?: ReactNode;
} & CardProps;

export const PortfolioStockCard = ({data, loading, error, ...others}: Props) => {

    const {getImageSrc, handleImgError} = useImageErrorHandling();
    const navigate = useNavigate();

    const columns: ColumnsType<PortfolioStockDetail> = useMemo(() => [
        {
            title: '티커',
            dataIndex: 'symbol',
            key: 'symbol',
            render: (_: any, {stock}: PortfolioStockDetail) => (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0}}
                >
                    {stock.symbol}
                </Typography.Paragraph>
            ),
        },
        {
            title: '종목명',
            dataIndex: 'stock',  // stock 전체 객체에 접근
            key: 'name',
            render: (_: any, record: PortfolioStockDetail) => {
                return (
                    <Typography.Paragraph
                        ellipsis={{rows: 1}}
                        className="text-capitalize"
                        style={{marginBottom: 0}}
                    >
                        <Avatar
                            style={{marginRight: "10px"}}
                            src={getImageSrc(record.stock.symbol, record.stock.name)}  // symbol과 name에 직접 접근
                            onError={() => handleImgError(record.stock.symbol)}
                        />
                        {record.stock.name} {/* stock.name에 직접 접근 */}
                    </Typography.Paragraph>
                );
            },
        },
        {
            title: "평균 매수가",
            dataIndex: 'averagePrice',
            key: 'averagePrice',
            render: (_: any) => <span className="text-capitalize">{formatNumber(Number(_))}</span>,
        },
        {
            title: "수량",
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any) => <span className="text-capitalize">{_}</span>,
        },
        {
            title: "투자액",
            dataIndex: 'investmentAmount',
            key: 'investValue',
            render: (_: any) => <span className="text-capitalize">{formatNumber(Number(_))}</span>,
        },
        {
            title: "평가액",
            dataIndex: 'currentAmount',
            key: 'currentValue',
            render: (_: any) => <span className="text-capitalize">{formatNumber(_)}</span>,
        },
        {
            title: "수익/손실",
            dataIndex: 'profitAndLoss',
            key: 'profitAndLoss',
            render: (_: any) => (
                <Typography.Text
                    style={{
                        color: _ > 0 ? green[6] : red[5],
                        fontWeight: 500,
                    }}
                >
                    <CountUp
                        end={_}
                    />
                </Typography.Text>
            )
        },
        {
            title: "수익률",
            dataIndex: 'profitAndLossRate',
            key: 'profitAndLossRate',
            render: (_: any) => (
                <Typography.Text
                    style={{
                        color: _ > 0 ? green[6] : red[5],
                        fontWeight: 500,
                    }}
                >
                    <CountUp
                        end={_}
                        decimals={2}
                    />%
                </Typography.Text>
            )
        }
    ], [getImageSrc, handleImgError]);

    // Memoize dataSource and ensure each row has a unique key
    const dataSource = useMemo(() => {
        return data?.map((item, index) => ({
            key: `${item.stock.symbol}-${index}`, // 고유 키 설정
            ...item,
        })) || [];
    }, [data]);

    return (
        <Card title="보유 종목" {...others}>
            {error ? (
                <Alert
                    message="Error"
                    description={error.toString()}
                    type="error"
                    showIcon
                />
            ) : (
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    scroll={{ y: 300 }} // 고정된 높이 설정하여 레이아웃 변경 최소화
                    className="overflow-scroll"
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                // 주식 상세 페이지로 이동
                                navigate(`/dashboards/stocks/detail/${record.stock.stockId}`);
                            },
                        };
                    }}
                />
            )}
        </Card>
    );
};

import {Alert, Avatar, CardProps, Table, Typography} from 'antd';
import {CheckCircleOutlined, PlusCircleOutlined, StockOutlined} from '@ant-design/icons';
import {ColumnsType} from 'antd/es/table';
import {Card} from '../../../index';
import React, {ReactNode} from 'react';
import {IStock} from "../../../../interface/interface";
import {useImageErrorHandling} from "../../../../util/image-loader";

const getCoursesColumns = (
    getImageSrc: any,
    handleImgError: any,
    setSelectedStock: any,
    selectedStock: IStock[]
): ColumnsType<IStock> => [
    {
        title: '티커',
        dataIndex: 'symbol',
        key: 'symbol',
        render: (_: any, {symbol}: IStock) => (
            <Typography.Paragraph
                ellipsis={{rows: 1}}
                className="text-capitalize"
                style={{marginBottom: 0}}
            >
                {symbol}
            </Typography.Paragraph>
        ),
    },
    {
        title: '종목명',
        dataIndex: 'stock',
        key: 'name',
        render: (_: any, record: IStock) => {
            return (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0}}
                >
                    <Avatar
                        style={{marginRight: "10px"}}
                        src={getImageSrc(record.symbol, record.name)}
                        onError={() => handleImgError(record.symbol)}
                    />
                    {record.name}
                </Typography.Paragraph>
            );
        },
    },
    {
        title: '',
        key: 'action',
        render: (_: any, record: IStock) => {
            const isSelected = selectedStock.some(stock => stock.stockId === record.stockId); // 이미 선택된 주식인지 확인

            return (
                <Typography.Paragraph
                    ellipsis={{rows: 1}}
                    className="text-capitalize"
                    style={{marginBottom: 0, fontSize: 20, textAlign: "center"}}
                >
                    {isSelected ? (
                        <CheckCircleOutlined style={{color: 'green'}}/>
                    ) : (
                        <PlusCircleOutlined
                            style={{cursor: 'pointer'}}
                            onClick={() => setSelectedStock && setSelectedStock(record)}
                        />
                    )}
                </Typography.Paragraph>
            );
        },
    },
];

type Props = {
    data?: IStock[];
    selectStock?: (stock: IStock) => void;
    selectedStock: IStock[];
    loading?: boolean;
    error?: ReactNode;
} & CardProps;

export const StockSelectCard = ({
                                    data,
                                    selectedStock = [],
                                    selectStock,
                                    loading,
                                    error,
                                    ...others
                                }: Props) => {

    const {getImageSrc, handleImgError} = useImageErrorHandling();

    return (
        <Card title={
            <Typography.Title level={5} style={{margin: 0}}>
                <StockOutlined/> 시가총액 상위
            </Typography.Title>
        } {...others}>
            {error ? (
                <Alert
                    message="Error"
                    description={error.toString()}
                    type="error"
                    showIcon
                />
            ) : (
                <Table
                    dataSource={data}
                    columns={getCoursesColumns(getImageSrc, handleImgError, selectStock, selectedStock)}
                    loading={loading}
                    className="overflow-scroll"
                    style={{maxHeight: 500, overflowY: 'auto'}}
                />
            )}
        </Card>
    );
};

import {Avatar, Button, CardProps, Flex, Form, InputNumber, Space, Typography} from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons';
import {Card} from '../../../index';
import React from 'react';
import {useImageErrorHandling} from "../../../../util/image-loader";
import {SelectedStock} from "../PortfolioCreateModal/PortfolioCreateModal";

type Props = {
    data: SelectedStock[];
    removeStock: (stock: SelectedStock) => void;
    updateStock: (stock: SelectedStock) => void;
} & CardProps;

export const StockSelectedCard = ({ data, removeStock, updateStock, ...others }: Props) => {

    const { getImageSrc, handleImgError } = useImageErrorHandling();

    // 타이틀에 로고와 이름을 함께 배치
    const title = (stock: SelectedStock) => (
        <Flex align="center" gap="small">
            <Avatar src={getImageSrc(stock.symbol, stock.name)} onError={() => handleImgError(stock.symbol)} />
            <Typography.Text>{stock.name || 'Stock Name'}</Typography.Text>
        </Flex>
    );

    // 수량이나 평균 단가가 변경되었을 때 호출될 핸들러
    const handleInputChange = (stock: SelectedStock, field: 'quantity' | 'averagePrice', value: number) => {
        const updatedStock = { ...stock, [field]: value };
        updateStock(updatedStock);
    };

    return (
        <Flex style={{ overflow: 'auto', flexWrap: 'wrap' }} gap="small">
            {data?.map((stock: SelectedStock) => (
                <Card
                    title={title(stock)}
                    key={stock.symbol}
                    extra={
                        <Button
                            type="text"
                            icon={<MinusCircleOutlined />}
                            onClick={() => removeStock(stock)}
                            style={{ color: 'red' }}
                        />
                    }
                    {...others}
                >
                    <Form layout="vertical">
                        <Space>
                            <Form.Item label="평균 단가" style={{ marginBottom: '8px' }}>
                                <InputNumber
                                    min={1}
                                    name={`averagePrice_${stock.symbol}`}
                                    value={stock.averagePrice}
                                    onChange={(value) => handleInputChange(stock, 'averagePrice', value as number)}
                                    placeholder="단가"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="수량" style={{ marginBottom: '8px' }}>
                                <InputNumber
                                    min={1}
                                    name={`quantity_${stock.symbol}`}
                                    value={stock.quantity}
                                    onChange={(value) => handleInputChange(stock, 'quantity', value as number)}
                                    placeholder="수량"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Space>
                    </Form>
                </Card>
            ))}
        </Flex>
    );
};

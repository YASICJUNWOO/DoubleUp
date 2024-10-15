import React from "react";
import {Avatar, Button, Col, InputNumber, Row, Typography} from "antd";
import {IStock} from "../../../interface/interface";
import {useImageErrorHandling} from "../../../util/image-loader";

type SelectedStockDetailsProps = {
    stock: IStock;
    onRemove: (stockId: number) => void;
    updatePortfolioData: (stockId: number, field: string, value: number) => void;
};

const SelectedStockDetails: React.FC<SelectedStockDetailsProps> = ({ stock, onRemove, updatePortfolioData }) => {
    const [quantity, setQuantity] = React.useState<number>(1);
    const [averagePrice, setAveragePrice] = React.useState<number>(1);

    const {getImageSrc, handleImgError} = useImageErrorHandling();

    const handleQuantityChange = (value: any) => {
        setQuantity(value);
        updatePortfolioData(stock.stockId, "quantity", value);
    };

    const handleAveragePriceChange = (value: any) => {
        setAveragePrice(value);
        updatePortfolioData(stock.stockId, "averagePrice", value);
    };

    return (
        <div style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <Row gutter={5}>
                <Col span={8} style={{display:"flex"}}>
                    <Avatar
                        style={{marginRight: "10px"}}
                        src={getImageSrc(stock.symbol, stock.name)}
                        onError={() => handleImgError(stock.symbol)}
                    />
                    <Typography>{stock.name}</Typography>
                </Col>
                <Col span={6}>
                    <InputNumber
                        min={1}
                        placeholder="매수량"
                        value={quantity}
                        addonAfter={"주"}
                        onChange={handleQuantityChange}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={6}>
                    <InputNumber
                        min={1}
                        placeholder="매수 평균 금액"
                        value={averagePrice}
                        addonAfter={"원"}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        onChange={handleAveragePriceChange}
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={2}>
                    <Button
                        danger
                        onClick={() => onRemove(stock.stockId)}
                    >
                        삭제
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default SelectedStockDetails;

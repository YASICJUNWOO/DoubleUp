import {Avatar, Button, CardProps, Flex, Space, Typography} from "antd";
import {useImageErrorHandling} from "../../../../../util/image-loader";
import {Card} from "../../../../Card/Card";
import {green, red} from "@ant-design/colors";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import {useStock} from "../../../../../pages/dashboards/sub/stocks/stockDetail";
import {formatNumber} from "../../../../../util/money";

type Props = {
    favorite: boolean;
    handleFavorite: () => void;
} & CardProps;

export const StockDetailHeader = ({favorite, handleFavorite, ...others}: Props) => {

    const {getImageSrc, handleImgError} = useImageErrorHandling();
    const stockWithPrice = useStock();

    return (
        <Card {...others}>
            <div id="whole-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Space align="center">
                    <Avatar
                        src={getImageSrc(stockWithPrice.stock.symbol, stockWithPrice.stock.name)}
                        onError={() => handleImgError(stockWithPrice.stock.symbol)}
                        alt="로고"
                        shape="square"
                        style={{width: 52, height: 52}}
                    />
                    <Flex vertical id="stock-header-info">
                        <Space id="stock-name-and-symbol" align="end">
                            <Typography.Title level={5} style={{margin: "0px"}}>
                                {stockWithPrice.stock.name}
                            </Typography.Title>
                            <Typography.Text type="secondary"
                                             style={{margin: "0px"}}>{stockWithPrice.stock.symbol}</Typography.Text>
                        </Space>
                        <Space id="current-money-and-change" align="end">
                            <Typography.Title level={3} style={{margin: "0px"}}>
                                {formatNumber(stockWithPrice.currentPrice)}원
                            </Typography.Title>
                            <Typography.Text
                                style={{
                                    color: 3000 > 0 ? green[6] : red[5],
                                    fontWeight: 500,
                                }}
                            >
                                {stockWithPrice.priceChange > 0 ? '+' : ''}{stockWithPrice.priceChange} ({stockWithPrice.priceChangeRate}%)
                            </Typography.Text>
                        </Space>
                    </Flex>
                </Space>
                {favorite ? (
                    <Button
                        icon={<StarFilled style={{fontSize: 24, color: "#FFD700"}}/>}
                        onClick={handleFavorite}
                    />
                ) : (
                    <Button
                        icon={<StarOutlined style={{fontSize: 24}}/>}
                        onClick={handleFavorite}
                    />
                )}
            </div>
        </Card>
    );
};

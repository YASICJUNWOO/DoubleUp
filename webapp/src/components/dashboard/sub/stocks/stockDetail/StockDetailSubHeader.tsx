import {CardProps, Flex, Typography} from "antd";
import {useImageErrorHandling} from "../../../../../util/image-loader";
import {Card} from "../../../../Card/Card";

type Props = {} & CardProps;

export const StockDetailSubHeader = ({...others}: Props) => {

    const {getImageSrc, handleImgError} = useImageErrorHandling();

    return (
        <Card {...others}>
            <Flex vertical gap={12}>
                <Flex justify="space-between">
                    <Typography.Text strong>시가총액</Typography.Text>
                    <Typography.Text>500조</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>시가</Typography.Text>
                    <Typography.Text>100,000원</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>고가</Typography.Text>
                    <Typography.Text>105,000원</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>저가</Typography.Text>
                    <Typography.Text>98,000원</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>거래량</Typography.Text>
                    <Typography.Text>10,000,000주</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>거래대금</Typography.Text>
                    <Typography.Text>1조원</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>PER</Typography.Text>
                    <Typography.Text>15배</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>PBR</Typography.Text>
                    <Typography.Text>1.5배</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>배당수익률</Typography.Text>
                    <Typography.Text>2%</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
};

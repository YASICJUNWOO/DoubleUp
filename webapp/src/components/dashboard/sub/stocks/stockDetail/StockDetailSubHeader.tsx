import {CardProps, Flex, Tag, Typography} from "antd";
import {Card} from "../../../../Card/Card";
import {SectorType} from "../../../../../interface/SectorType";
import {Loader} from "../../../../Loader/Loader";
import {useStock} from "../../../../../pages/dashboards/sub/stocks/stockDetail";

type Props = {} & CardProps;

export const StockDetailSubHeader = ({...others}: Props) => {

    const {stockInfo} = useStock();
    console.log(stockInfo);

    return (
        !stockInfo ? <Loader/> :
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
                {/*<Flex justify="space-between">*/}
                {/*    <Typography.Text strong>거래대금</Typography.Text>*/}
                {/*    <Typography.Text>1조원</Typography.Text>*/}
                {/*</Flex>*/}
                {/*<Flex justify="space-between">*/}
                {/*    <Typography.Text strong>PER</Typography.Text>*/}
                {/*    <Typography.Text>15배</Typography.Text>*/}
                {/*</Flex>*/}
                {/*<Flex justify="space-between">*/}
                {/*    <Typography.Text strong>PBR</Typography.Text>*/}
                {/*    <Typography.Text>1.5배</Typography.Text>*/}
                {/*</Flex>*/}
                <Flex justify="space-between">
                    <Typography.Text strong>CEO</Typography.Text>
                    <Typography.Text>{stockInfo?.ceo}</Typography.Text>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>섹터 분류</Typography.Text>
                   <Tag color="blue" style={{margin:"0px"}}>{SectorType[stockInfo.sectorCategory]}</Tag>
                </Flex>
                <Flex justify="space-between">
                    <Typography.Text strong>섹터</Typography.Text>
                    <Typography.Text>{stockInfo?.sectorName}</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
};

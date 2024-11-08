import {CardProps, Flex, Tag, Typography} from "antd";
import {Card} from "../../../../Card/Card";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getStockInfo} from "../../../../../constants/api";
import {IStockInfo} from "../../../../../interface/interface";
import {SectorType} from "../../../../../interface/SectorType";
import {Loader} from "../../../../Loader/Loader";

type Props = {} & CardProps;

export const StockDetailSubHeader = ({...others}: Props) => {

    const {stockId} = useParams();

    const [stockInfo, setStockInfo] = useState<IStockInfo>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        if (stockId) {
            setIsLoading(true);
            getStockInfo({stockId: stockId!.toString()})
                .then((res) => {
                    setStockInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [stockId]);

    if (isLoading || !stockInfo) {
        return <Loader/>;
    }

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

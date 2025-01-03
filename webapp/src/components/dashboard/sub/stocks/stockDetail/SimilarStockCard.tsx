import React, {useEffect, useState} from "react";
import {getCurrentStockPrice, getSimilarStockList} from "../../../../../constants/api";
import {useParams} from "react-router-dom";
import {IStock, IStockWithPresentPrice} from "../../../../../interface/interface";
import {Avatar, CardProps, Col, Flex, List, Row, Space, Tabs, TabsProps, Tooltip, Typography} from "antd";
import {Card} from "../../../../Card/Card";
import {useImageErrorHandling} from "../../../../../util/image-loader";
import {Loader} from "../../../../Loader/Loader";
import {useStylesContext} from "../../../../../context";
import {formatNumber} from "../../../../../util/money";
import {useStock} from "../../../../../pages/dashboards/sub/stocks/stockDetail";

type Props = {} & CardProps;

const SimilarStockList: React.FC<any> = ({data}: { data: IStock[] }) => {
    const stylesContext = useStylesContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [stockList, setStockList] = useState<IStockWithPresentPrice[]>([]);

    useEffect(() => {
        if (!data) return;

        setIsLoading(true);
        setStockList([]);
        data.map((stock: IStock) => {
            getCurrentStockPrice({stockId: stock.stockId.toString()})
                .then(response => {
                    setStockList(prevStockList => [...prevStockList, response.data]);
                })
                .catch(error => {
                    console.error("주식 가격을 가져오는 중 오류가 발생하였습니다.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });

    }, [data]);

    const {handleImgError, getImageSrc} = useImageErrorHandling();

    return (
        isLoading ?
            <Loader/> :
            <List
                dataSource={stockList}
                renderItem={item => (
                    <List.Item>
                        <Row {...stylesContext?.rowProps} style={{width: "100%"}}>
                            <Col span={12}>
                                <Space>
                                    <Avatar src={getImageSrc(item.stock.symbol, item.stock.name)}
                                            onError={() => handleImgError(item.stock.symbol)}/>
                                    <Typography.Text>{item.stock.name}</Typography.Text>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space>
                                    <Typography.Text
                                        style={{color: item.priceChange > 0 ? "green" : "red", fontWeight: "bold"}}
                                    >
                                        {formatNumber(item.currentPrice)}
                                    </Typography.Text>
                                    <Typography.Text
                                        style={{color: item.priceChange > 0 ? "green" : "red"}}
                                    >
                                        ({item.priceChange > 0 ? "+" : "-"}{formatNumber(item.priceChange)})
                                    </Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
    )
}

export const SimilarStockCard: React.FC<Props> = ({...other}) => {

    const {stockId} = useParams<{ stockId: string }>();
    const {stockInfo} = useStock();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [similarStockList, setSimilarStockList] = useState<IStock[]>([]);
    const [selectedTab, setSelectedTab] = useState<string>("sectorCode");

    useEffect(() => {
        if (!stockId) return;

        setIsLoading(true);
        getSimilarStockList({stockId: stockId, type: selectedTab})
            .then(response => {
                setSimilarStockList(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("유사주식 목록을 가져오는 중 오류가 발생하였습니다.");
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [stockId, selectedTab]);

    const items: TabsProps['items'] = [
        {
            key: 'sectorCode',
            label: (
                <Flex style={{width: "100%"}} justify="space-between">
                    <Tooltip title={stockInfo?.sectorName}>
                        <Typography.Text>업종</Typography.Text>
                    </Tooltip>
                </Flex>
            ),
            children: (<SimilarStockList data={similarStockList}/>)
        },
        {
            key: 'sectorCategory',
            label: (
                <Tooltip title={stockInfo?.sectorCategory}>
                    <Typography.Text>업종 카테고리</Typography.Text>
                </Tooltip>
            ),
            children: (<SimilarStockList data={similarStockList}/>)
        }
    ]

    return (
        <Card
            title="연관 종목"
            {...other}
        >
            <Tabs
                defaultActiveKey="sectorCode"
                centered
                items={items}
                onChange={(key) => {
                    console.log(key);
                    setSelectedTab(key)
                }}
            />
        </Card>
    )
}
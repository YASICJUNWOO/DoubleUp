import React, {useEffect, useState} from "react";
import {Avatar, Col, Row, Table, Tabs} from "antd";
import {IStock} from "../../interface/interface";
import axios from "axios";
import {formatMarketCap} from "../../util/money";
import {useNavigate} from "react-router-dom";
import {useImageErrorHandling} from "../../util/image-loader";

const { TabPane } = Tabs;

export const NewStockList:React.FC = () => {

    //=====================Columns=====================
    const { getImageSrc, handleImgError } = useImageErrorHandling();

    const columns = [
        {
            title: '티커',
            dataIndex: 'symbol',
            key: 'symbol',
            width: 80
        },
        {
            title: '종목명',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: (text: string, record: IStock) => {
                return (
                    <>
                        <Avatar
                            style={{ marginRight: "10px" }}
                            src={getImageSrc(record.symbol, text)}
                            onError={() => handleImgError(record.symbol)}
                        />
                        {text}
                    </>
                );
            }
        },
        {
            title: '시장',
            dataIndex: 'market',
            key: 'market',
            width: 100
        },
        {
            title: '종목유형',
            dataIndex: 'stockType',
            key: 'stockType',
            width: 100
        },
        {
            title: '시가총액(억)',
            dataIndex: 'marketCap',
            key: 'marketCap',
            width: 100,
            render: (marketCap: number) => formatMarketCap(marketCap)
        }
    ];
    //=================================================

    const [stocks, setStocks] = useState<IStock[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // 로딩 상태 추가
    const [stockType, setStockType] = useState<string>("COMMON"); // 기본값은 COMMON

    useEffect(() => {
        const dataFetch = async () => {
            setLoading(true); // 로딩 시작
            axios
                .post<IStock[]>(`/api/stocks/marketCap?size=10&page=0&stockType=${stockType}`)
                .then((response) => {
                    setStocks(response.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false); // 로딩 끝
                });
        };

        dataFetch();
    }, [stockType]); // stockType 변경 시 데이터 다시 가져오기

    // 행 클릭 시 실행될 함수
    const navigate = useNavigate();

    const handleRowClick = (record: IStock) => {
        navigate(`/stocks/${record.stockId}`);
    };

    // 탭 변경 시 호출될 함수
    const handleTabChange = (key: string) => {
        setStockType(key);
    };

    return (
        <div>
            <Row>
                <Col offset={4} span={16}  className='custom-shadow' style={{padding:'20px'}}>
                    <Tabs defaultActiveKey="COMMON" onChange={handleTabChange}>
                        <TabPane tab="일반주" key="COMMON">
                            <Table
                                id="stockList"
                                dataSource={stocks}
                                columns={columns}
                                rowKey="stockId"
                                scroll={{x: 768}}
                                size="small"
                                onRow={(record) => {
                                    return {
                                        onClick: () => handleRowClick(record), // 행 클릭 이벤트 핸들러
                                    };
                                }}
                                loading={loading} // 로딩 상태 반영
                            />
                        </TabPane>
                        <TabPane tab="ETF" key="ETF">
                            <Table
                                id="stockList"
                                dataSource={stocks}
                                columns={columns}
                                rowKey="stockId"
                                scroll={{x: 768}}
                                size="small"
                                onRow={(record) => {
                                    return {
                                        onClick: () => handleRowClick(record), // 행 클릭 이벤트 핸들러
                                    };
                                }}
                                loading={loading} // 로딩 상태 반영
                            />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    )

}
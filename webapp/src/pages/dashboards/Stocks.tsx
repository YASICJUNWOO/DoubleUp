import {
    Badge,
    Col,
    ConfigProvider,
    Divider,
    Image,
    Layout,
    List,
    Modal,
    Row,
    Space,
    Table,
    Tabs,
    TabsProps,
    Typography
} from 'antd';
import {Card, PageHeader, StocksTable} from '../../components';
import React, {ReactNode, useEffect, useState} from 'react';
import {CrownFilled, FundOutlined, LineChartOutlined,} from '@ant-design/icons';
import {Helmet} from 'react-helmet-async';
import {usePostData} from '../../hooks';
import {IStock} from "../../interface/interface";
import {SectorType, SectorTypeKey} from "../../interface/SectorType";
import {gray, yellow} from '@ant-design/colors';
import {getStockListByMarketCap} from "../../constants/api";
import {MOBILE_WIDTH} from "../../constants";
import {useMediaQuery} from "react-responsive";
import dayjs from "dayjs";
import {useStylesContext} from "../../context";
import CountUp from "react-countup";
import {ResponsiveTreeMap} from "@nivo/treemap";

const MyResponsiveTreeMap:React.FC = () => {

    const data33 = {
        "name": "nivo",
        "color": "hsl(105, 70%, 50%)",
        "children": [
            {
                "name": "viz",
                "color": "hsl(358, 70%, 50%)",
                "children": [
                    {
                        "name": "stack",
                        "color": "hsl(324, 70%, 50%)",
                        "children": [
                            {
                                "name": "cchart",
                                "color": "hsl(327, 70%, 50%)",
                                "loc": 120172
                            },
                            {
                                "name": "xAxis",
                                "color": "hsl(163, 70%, 50%)",
                                "loc": 6567
                            },
                            {
                                "name": "yAxis",
                                "color": "hsl(197, 70%, 50%)",
                                "loc": 154217
                            },
                            {
                                "name": "layers",
                                "color": "hsl(275, 70%, 50%)",
                                "loc": 160122
                            }
                        ]
                    },
                    {
                        "name": "ppie",
                        "color": "hsl(326, 70%, 50%)",
                        "children": [
                            {
                                "name": "chart",
                                "color": "hsl(161, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pie",
                                        "color": "hsl(89, 70%, 50%)",
                                        "children": [
                                            {
                                                "name": "outline",
                                                "color": "hsl(118, 70%, 50%)",
                                                "loc": 135252
                                            },
                                            {
                                                "name": "slices",
                                                "color": "hsl(264, 70%, 50%)",
                                                "loc": 122433
                                            },
                                            {
                                                "name": "bbox",
                                                "color": "hsl(212, 70%, 50%)",
                                                "loc": 139800
                                            }
                                        ]
                                    },
                                    {
                                        "name": "donut",
                                        "color": "hsl(212, 70%, 50%)",
                                        "loc": 77639
                                    },
                                    {
                                        "name": "gauge",
                                        "color": "hsl(175, 70%, 50%)",
                                        "loc": 30746
                                    }
                                ]
                            },
                            {
                                "name": "legends",
                                "color": "hsl(229, 70%, 50%)",
                                "loc": 149561
                            }
                        ]
                    }
                ]
            },
            {
                "name": "colors",
                "color": "hsl(262, 70%, 50%)",
                "children": [
                    {
                        "name": "rgb",
                        "color": "hsl(33, 70%, 50%)",
                        "loc": 114918
                    },
                    {
                        "name": "hsl",
                        "color": "hsl(57, 70%, 50%)",
                        "loc": 16599
                    }
                ]
            },
            {
                "name": "utils",
                "color": "hsl(192, 70%, 50%)",
                "children": [
                    {
                        "name": "randomize",
                        "color": "hsl(115, 70%, 50%)",
                        "loc": 54423
                    },
                    {
                        "name": "resetClock",
                        "color": "hsl(194, 70%, 50%)",
                        "loc": 99457
                    },
                    {
                        "name": "noop",
                        "color": "hsl(135, 70%, 50%)",
                        "loc": 165158
                    },
                    {
                        "name": "tick",
                        "color": "hsl(13, 70%, 50%)",
                        "loc": 30556
                    },
                    {
                        "name": "forceGC",
                        "color": "hsl(174, 70%, 50%)",
                        "loc": 110798
                    },
                    {
                        "name": "stackTrace",
                        "color": "hsl(157, 70%, 50%)",
                        "loc": 185905
                    },
                    {
                        "name": "dbg",
                        "color": "hsl(15, 70%, 50%)",
                        "loc": 27897
                    }
                ]
            },
            {
                "name": "generators",
                "color": "hsl(2, 70%, 50%)",
                "children": [
                    {
                        "name": "address",
                        "color": "hsl(325, 70%, 50%)",
                        "loc": 141824
                    },
                    {
                        "name": "city",
                        "color": "hsl(323, 70%, 50%)",
                        "loc": 118525
                    },
                    {
                        "name": "animal",
                        "color": "hsl(186, 70%, 50%)",
                        "loc": 193818
                    },
                    {
                        "name": "movie",
                        "color": "hsl(271, 70%, 50%)",
                        "loc": 96314
                    },
                    {
                        "name": "user",
                        "color": "hsl(230, 70%, 50%)",
                        "loc": 131593
                    }
                ]
            },
            {
                "name": "set",
                "color": "hsl(283, 70%, 50%)",
                "children": [
                    {
                        "name": "clone",
                        "color": "hsl(5, 70%, 50%)",
                        "loc": 197683
                    },
                    {
                        "name": "intersect",
                        "color": "hsl(148, 70%, 50%)",
                        "loc": 103734
                    },
                    {
                        "name": "merge",
                        "color": "hsl(138, 70%, 50%)",
                        "loc": 78917
                    },
                    {
                        "name": "reverse",
                        "color": "hsl(9, 70%, 50%)",
                        "loc": 197038
                    },
                    {
                        "name": "toArray",
                        "color": "hsl(48, 70%, 50%)",
                        "loc": 87396
                    },
                    {
                        "name": "toObject",
                        "color": "hsl(352, 70%, 50%)",
                        "loc": 54898
                    },
                    {
                        "name": "fromCSV",
                        "color": "hsl(270, 70%, 50%)",
                        "loc": 186616
                    },
                    {
                        "name": "slice",
                        "color": "hsl(117, 70%, 50%)",
                        "loc": 104382
                    },
                    {
                        "name": "append",
                        "color": "hsl(200, 70%, 50%)",
                        "loc": 191638
                    },
                    {
                        "name": "prepend",
                        "color": "hsl(17, 70%, 50%)",
                        "loc": 105457
                    },
                    {
                        "name": "shuffle",
                        "color": "hsl(177, 70%, 50%)",
                        "loc": 152560
                    },
                    {
                        "name": "pick",
                        "color": "hsl(123, 70%, 50%)",
                        "loc": 76965
                    },
                    {
                        "name": "plouc",
                        "color": "hsl(52, 70%, 50%)",
                        "loc": 2429
                    }
                ]
            },
            {
                "name": "text",
                "color": "hsl(209, 70%, 50%)",
                "children": [
                    {
                        "name": "trim",
                        "color": "hsl(123, 70%, 50%)",
                        "loc": 28171
                    },
                    {
                        "name": "slugify",
                        "color": "hsl(118, 70%, 50%)",
                        "loc": 126932
                    },
                    {
                        "name": "snakeCase",
                        "color": "hsl(146, 70%, 50%)",
                        "loc": 39470
                    },
                    {
                        "name": "camelCase",
                        "color": "hsl(155, 70%, 50%)",
                        "loc": 146752
                    },
                    {
                        "name": "repeat",
                        "color": "hsl(35, 70%, 50%)",
                        "loc": 6113
                    },
                    {
                        "name": "padLeft",
                        "color": "hsl(212, 70%, 50%)",
                        "loc": 60706
                    },
                    {
                        "name": "padRight",
                        "color": "hsl(354, 70%, 50%)",
                        "loc": 9387
                    },
                    {
                        "name": "sanitize",
                        "color": "hsl(40, 70%, 50%)",
                        "loc": 85069
                    },
                    {
                        "name": "ploucify",
                        "color": "hsl(18, 70%, 50%)",
                        "loc": 56668
                    }
                ]
            },
            {
                "name": "misc",
                "color": "hsl(307, 70%, 50%)",
                "children": [
                    {
                        "name": "greetings",
                        "color": "hsl(238, 70%, 50%)",
                        "children": [
                            {
                                "name": "hey",
                                "color": "hsl(297, 70%, 50%)",
                                "loc": 105156
                            },
                            {
                                "name": "HOWDY",
                                "color": "hsl(215, 70%, 50%)",
                                "loc": 156071
                            },
                            {
                                "name": "aloha",
                                "color": "hsl(82, 70%, 50%)",
                                "loc": 72057
                            },
                            {
                                "name": "AHOY",
                                "color": "hsl(23, 70%, 50%)",
                                "loc": 37467
                            }
                        ]
                    },
                    {
                        "name": "other",
                        "color": "hsl(316, 70%, 50%)",
                        "loc": 13534
                    },
                    {
                        "name": "path",
                        "color": "hsl(68, 70%, 50%)",
                        "children": [
                            {
                                "name": "pathA",
                                "color": "hsl(145, 70%, 50%)",
                                "loc": 158707
                            },
                            {
                                "name": "pathB",
                                "color": "hsl(70, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pathB1",
                                        "color": "hsl(209, 70%, 50%)",
                                        "loc": 160997
                                    },
                                    {
                                        "name": "pathB2",
                                        "color": "hsl(308, 70%, 50%)",
                                        "loc": 175361
                                    },
                                    {
                                        "name": "pathB3",
                                        "color": "hsl(207, 70%, 50%)",
                                        "loc": 130671
                                    },
                                    {
                                        "name": "pathB4",
                                        "color": "hsl(343, 70%, 50%)",
                                        "loc": 146688
                                    }
                                ]
                            },
                            {
                                "name": "pathC",
                                "color": "hsl(360, 70%, 50%)",
                                "children": [
                                    {
                                        "name": "pathC1",
                                        "color": "hsl(135, 70%, 50%)",
                                        "loc": 98992
                                    },
                                    {
                                        "name": "pathC2",
                                        "color": "hsl(84, 70%, 50%)",
                                        "loc": 173367
                                    },
                                    {
                                        "name": "pathC3",
                                        "color": "hsl(32, 70%, 50%)",
                                        "loc": 92490
                                    },
                                    {
                                        "name": "pathC4",
                                        "color": "hsl(327, 70%, 50%)",
                                        "loc": 9930
                                    },
                                    {
                                        "name": "pathC5",
                                        "color": "hsl(280, 70%, 50%)",
                                        "loc": 38424
                                    },
                                    {
                                        "name": "pathC6",
                                        "color": "hsl(155, 70%, 50%)",
                                        "loc": 183321
                                    },
                                    {
                                        "name": "pathC7",
                                        "color": "hsl(331, 70%, 50%)",
                                        "loc": 173973
                                    },
                                    {
                                        "name": "pathC8",
                                        "color": "hsl(76, 70%, 50%)",
                                        "loc": 78726
                                    },
                                    {
                                        "name": "pathC9",
                                        "color": "hsl(103, 70%, 50%)",
                                        "loc": 90816
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    const marketCapData = {
        name: "Market Cap",
        children: [
            {
                name: "삼성전자",
                symbol: "005930",
                loc: 1000000,  // 시가총액으로 설정
                color: "hsl(210, 70%, 50%)"
            },
            {
                name: "LG전자",
                symbol: "066570",
                loc: 1000000,  // 시가총액으로 설정
                color: "hsl(60, 70%, 50%)"
            },
            {
                name: "SK하이닉스",
                symbol: "000660",
                loc: 1000000,  // 시가총액으로 설정
                color: "hsl(120, 70%, 50%)"
            }
        ]
    };




    return(
        <ResponsiveTreeMap
            data={marketCapData}
            identity="name"
            value="loc"
            label={(node) => node.data.name}  // 회사 이름을 레이블로 표시
            orientLabel={false} // 레이블을 가로로 표시
            valueFormat=".02s"
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            labelSkipSize={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.2
                    ]
                ]
            }}
            parentLabelPosition="left"
            parentLabelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.1
                    ]
                ]
            }}
        />
    )
}

export const StocksDashboardPage = () => {

    const styleContext = useStylesContext();

    const isMobile = useMediaQuery({maxWidth: MOBILE_WIDTH});

    const [projectTabsKey, setProjectsTabKey] = useState<string>('marketCapStock');
    const [stockDataByMarketCap, setStockDataByMarketCap] = useState<IStock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [sectorModalVisible, setSectorModalVisible] = useState<boolean>(false);

    useEffect(() => {

        setIsLoading(true);
        getStockListByMarketCap(
            {
                size: "10",
                page: "0",
                stockType: 'COMMON'
            })
            .then((response) => {
                setStockDataByMarketCap(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    // POST 요청을 보내기 위한 훅 사용
    const {
        data: projectsData,
        error: projectsDataError,
        loading: projectsDataLoading,
        postData,
    } = usePostData<IStock[]>(`/api/stocks/marketCap?size=10&page=0&stockType=COMMON`);

    // 탭 변경 시마다 데이터를 불러오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            let url = '';
            switch (projectTabsKey) {
                case 'marketCapStock':
                    url = '/api/stocks/marketCap?size=10&page=0&stockType=COMMON';
                    break;
                case 'marketCapEtf':
                    url = '/api/stocks/marketCap?size=10&page=0&stockType=ETF';
                    break;
                case 'onHold':
                    url = '/api/stocks/marketCap?size=10&page=0&stockType=COMMON';
                    break;
                default:
                    break;
            }
            if (url) {
                await postData(url, {});  // postData에 URL과 payload를 전달
            }
        };

        fetchData();
    }, [projectTabsKey, postData]);


    const STOCK_TABS: TabsProps['items'] = [
        {
            key: 'marketCapStock',
            label: <><LineChartOutlined/>시가총액 TOP - 일반주</>,
            children: <StocksTable key="all-projects-table" data={projectsData}/>,
        },
        {
            key: 'marketCapEtf',
            label: <><FundOutlined/> 시가총액 TOP - ETF</>,
            children: <StocksTable
                key="in-progress-projects-table"
                data={projectsData}
            />,
        },
        {
            key: '3',
            label: 'Tab 3',
            children: <StocksTable
                key="on-hold-projects-table"
                data={projectsData}
            />,
        },
    ];

    const onProjectsTabChange = (key: string) => {
        setProjectsTabKey(key);
    };

    type SampleSectorData = {
        sector: SectorTypeKey;
        changeRate: number;
    }

    const sampleSectorData: SampleSectorData[] = [
        {
            sector: "MANUFACTURING",
            changeRate: 0.8
        },
        {
            sector: "EDUCATION",
            changeRate: 0.5
        },
        {
            sector: "IT_COMMUNICATIONS",
            changeRate: 0.1
        }
    ]

    const sampleSectorData2: SampleSectorData[] = [
        {
            sector: "AGRICULTURE",
            changeRate: 0.8
        },
        {
            sector: "FINANCE_INSURANCE",
            changeRate: 0.5
        },
        {
            sector: "TRANSPORT_LOGISTICS",
            changeRate: 0.1
        }
    ]

    const isBadge = (index: number, child: ReactNode) => {
        if (index === 0) {
            return (
                <Badge
                    count={
                        <CrownFilled
                            rotate={-30}
                            style={{fontSize: '16px', color: yellow[5]}}
                        />
                    }
                >
                    {child}
                </Badge>
            )
        }
        return child;
    }

    return (
        <div>
            <Helmet>
                <title>Projects | Antd Dashboard</title>
            </Helmet>
            <PageHeader
                title="주식 목록"
                breadcrumbs={[]}
            />
            <Row
                gutter={[
                    {xs: 8, sm: 16, md: 24, lg: 32},
                    {xs: 8, sm: 16, md: 24, lg: 32},
                ]}
            >
                <Col span={24}>
                    <Card
                        title="지금 뜨는 섹터"
                        extra={null}
                    >
                        <>
                            <Row>
                                <Col xs={24} md={12}>
                                    <Space align="end">
                                        <Typography.Title level={4} style={{margin: "0px"}}>국내</Typography.Title>
                                        <Typography.Text
                                            type="secondary">{dayjs().format("YYYY-MM-DD")} 기준</Typography.Text>
                                    </Space>
                                    <Divider style={{marginBlock: "12px"}}/>
                                    <List
                                        size={isMobile ? 'small' : 'large'}
                                        itemLayout={'horizontal'}
                                        dataSource={sampleSectorData}
                                        renderItem={(item, index) => (
                                            <List.Item
                                                onClick={() => setSectorModalVisible(true)}
                                                style={{cursor: 'pointer'}}
                                            >
                                                <List.Item.Meta
                                                    avatar={
                                                        <Image
                                                            preview={false}
                                                            src={`/images/sector/${item.sector}.png`}
                                                            width={isMobile ? 60 : 100} // 모바일에서는 작은 크기 사용
                                                            style={{
                                                                padding: isMobile ? "8px" : "12px",
                                                                border: "3px solid #f0f0f0",
                                                                borderRadius: "12px",
                                                            }}
                                                        />
                                                    }
                                                    title={
                                                        <ConfigProvider direction="rtl">
                                                            <div style={{marginTop: isMobile ? 2 : 4}}>
                                                                {isBadge(index,
                                                                    <Typography.Title level={5} style={{margin: 0}}>
                                                                        {SectorType[item.sector]}
                                                                    </Typography.Title>
                                                                )}
                                                            </div>
                                                        </ConfigProvider>
                                                    }
                                                    description={
                                                        <Typography.Title
                                                            level={3}
                                                            type={item.changeRate > 0 ? 'success' : 'danger'}
                                                            style={{margin: 0}}
                                                        >
                                                            {item.changeRate}%
                                                        </Typography.Title>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Col>
                                <Col xs={24} md={12}>
                                    <Space align="end">
                                        <Typography.Title level={4} style={{margin: "0px"}}>해외</Typography.Title>
                                        <Typography.Text
                                            type="secondary">{dayjs().format("YYYY-MM-DD")} 기준</Typography.Text>
                                    </Space>
                                    <Divider style={{marginBlock: "12px"}}/>
                                    <List
                                        itemLayout={'horizontal'}
                                        dataSource={sampleSectorData2}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Image
                                                            preview={false}
                                                            src={`/images/sector/${item.sector}.png`}
                                                            width={100}
                                                            style={{
                                                                padding: "12px",
                                                                border: "3px solid #f0f0f0",
                                                                borderRadius: "12px"
                                                            }}
                                                        />
                                                    }
                                                    title={
                                                        <ConfigProvider direction="rtl">
                                                            {isBadge(index,
                                                                <Typography.Title level={5} style={{margin: 0}}>
                                                                    {SectorType[item.sector]}
                                                                </Typography.Title>
                                                            )}
                                                        </ConfigProvider>
                                                    }
                                                    description={
                                                        <Space>
                                                            <Typography.Title
                                                                level={3}
                                                                type={item.changeRate > 0 ? 'success' : 'danger'}
                                                                style={{margin: 0}}
                                                            >
                                                                {item.changeRate}%
                                                            </Typography.Title>
                                                        </Space>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </>
                    </Card>
                </Col>

                <Col span={24}>
                    <Card
                        title="주식 스크리너"
                        extra={null}
                    >
                        <Tabs
                            items={STOCK_TABS}
                            activeKey={projectTabsKey}
                            onChange={onProjectsTabChange}
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="주식 스크리너"
                        extra={null}
                    >
                        <Tabs
                            items={STOCK_TABS}
                            activeKey={projectTabsKey}
                            onChange={onProjectsTabChange}
                        />
                    </Card>
                </Col>
            </Row>

            {sectorModalVisible && (
                <Modal
                    width={isMobile ? '100%' : '60%'}
                    title={
                        <Row>
                            <Col offset={1} span={9} style={{display:'flex', alignItems:"end"}}>
                                <Space align="end">
                                    <Typography.Title level={3} style={{margin: '0px'}}>제조업</Typography.Title>
                                    <Typography.Text type="secondary">MANUFACTURING</Typography.Text>
                                </Space>
                            </Col>
                            <Col span={4} style={{display:'flex', justifyContent:"center"}}>
                                <Image
                                    preview={false}
                                    src={`/images/sector/MANUFACTURING.png`}
                                    width={150}
                                    style={{
                                        padding: "12px",
                                    }}
                                />
                            </Col>
                        </Row>
                    }
                    open={sectorModalVisible}
                    onCancel={() => setSectorModalVisible(false)}
                    modalRender={modal => (
                        <Layout style={{background: gray[1], padding: "0px"}}>
                            {modal}
                        </Layout>
                    )}
                    footer={null}
                >
                    <Row {...styleContext?.rowProps} style={{marginTop:"36px"}}>
                        <Col xs={24} md={6}>
                            <Card>
                                <Typography.Text type="secondary">전일대비</Typography.Text>
                                <Typography.Title level={3} style={{margin: '0px'}}>
                                    <CountUp prefix='+' suffix='%' start={0} end={0.8} duration={2.5} decimals={1} />
                                </Typography.Title>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card>
                                <Typography.Text type="secondary">1주전 대비</Typography.Text>
                                <Typography.Title level={3} style={{margin: '0px'}}>
                                    <CountUp prefix='-' suffix='%' start={0} end={0.5} duration={2.5} decimals={1} />
                                </Typography.Title>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card>
                                <Typography.Text type="secondary">1달전 대비</Typography.Text>
                                <Typography.Title level={3} style={{margin: '0px'}}>
                                    <CountUp prefix='+' suffix='%' start={0} end={1.7} duration={2.5} decimals={1} />
                                </Typography.Title>
                            </Card>
                        </Col>
                        <Col xs={24} md={6}>
                            <Card>
                                <Typography.Text type="secondary">1년전 대비</Typography.Text>
                                <Typography.Title level={3} style={{margin: '0px'}}>
                                    <CountUp prefix='+' suffix='%' start={0} end={3.9} duration={2.5} decimals={1} />
                                </Typography.Title>
                            </Card>
                        </Col>

                        <Col span={24}>
                            <Table
                                pagination={false}
                                dataSource={[
                                    {
                                        key: '1',
                                        name: '삼성전자',
                                        symbol: '005930',
                                        price: 80000,
                                        changeRate: 0.8,
                                        marketCap: 1000000,
                                    },
                                    {
                                        key: '2',
                                        name: 'LG전자',
                                        symbol: '066570',
                                        price: 80000,
                                        changeRate: 0.8,
                                        marketCap: 1000000,
                                    },
                                    {
                                        key: '3',
                                        name: 'SK하이닉스',
                                        symbol: '000660',
                                        price: 80000,
                                        changeRate: 0.8,
                                        marketCap: 1000000,
                                    },
                                ]}
                                columns={[
                                    {
                                        title: '종목명',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: '티커',
                                        dataIndex: 'symbol',
                                        key: 'symbol',
                                    },
                                    {
                                        title: '현재가',
                                        dataIndex: 'price',
                                        key: 'price',
                                    },
                                    {
                                        title: '전일 대비',
                                        dataIndex: 'changeRate',
                                        key: 'changeRate',
                                    },
                                    {
                                        title: '시가총액',
                                        dataIndex: 'marketCap',
                                        key: 'marketCap',
                                    },
                                ]}
                            />
                        </Col>

                        <Col span={24}>
                            <div style={{ width: '100%', height: '300px' }}>  {/* 명시적으로 높이 설정 */}
                            <MyResponsiveTreeMap/>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            )}
        </div>
    );
};

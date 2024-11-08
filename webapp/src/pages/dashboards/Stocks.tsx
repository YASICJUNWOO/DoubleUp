import {Badge, Col, ConfigProvider, Image, List, Row, Space, Tabs, TabsProps, Typography} from 'antd';
import {Card, PageHeader, StocksTable} from '../../components';
import {ReactNode, useEffect, useState} from 'react';
import {CrownFilled, FundOutlined, LineChartOutlined,} from '@ant-design/icons';
import {Helmet} from 'react-helmet-async';
import {usePostData} from '../../hooks';
import {IStock} from "../../interface/interface";
import {SectorType, SectorTypeKey} from "../../interface/SectorType";
import {yellow} from '@ant-design/colors';
import {getStockListByMarketCap} from "../../constants/api";


export const StocksDashboardPage = () => {

    const [projectTabsKey, setProjectsTabKey] = useState<string>('marketCapStock');
    const [stockDataByMarketCap, setStockDataByMarketCap] = useState<IStock[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
                                    <List
                                        itemLayout={'horizontal'}
                                        dataSource={sampleSectorData}
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
                                                            <div style={{marginTop:4}}>
                                                                {isBadge(index,
                                                                    <Typography.Title level={5} style={{margin:0}}>
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
        </div>
    );
};

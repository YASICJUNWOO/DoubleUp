import {Button, Col, Row, Space} from 'antd';
import {Card, PageHeader, StocksTable} from '../../components';
import {Column} from '@ant-design/charts';
import {useEffect, useState} from 'react';
import {CloudUploadOutlined, HomeOutlined, PieChartOutlined, PlusOutlined,} from '@ant-design/icons';
import {DASHBOARD_ITEMS} from '../../constants';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useFetchData, usePostData} from '../../hooks';
import {IStock} from "../../interface/interface";


const RevenueColumnChart = () => {
    const data = [
        {
            name: 'Income',
            period: 'Mon',
            value: 18.9,
        },
        {
            name: 'Income',
            period: 'Tue',
            value: 28.8,
        },
        {
            name: 'Income',
            period: 'Wed',
            value: 39.3,
        },
        {
            name: 'Income',
            period: 'Thur',
            value: 81.4,
        },
        {
            name: 'Income',
            period: 'Fri',
            value: 47,
        },
        {
            name: 'Income',
            period: 'Sat',
            value: 20.3,
        },
        {
            name: 'Income',
            period: 'Sun',
            value: 24,
        },
        {
            name: 'Spent',
            period: 'Mon',
            value: 12.4,
        },
        {
            name: 'Spent',
            period: 'Tue',
            value: 23.2,
        },
        {
            name: 'Spent',
            period: 'Wed',
            value: 34.5,
        },
        {
            name: 'Spent',
            period: 'Thur',
            value: 99.7,
        },
        {
            name: 'Spent',
            period: 'Fri',
            value: 52.6,
        },
        {
            name: 'Spent',
            period: 'Sat',
            value: 35.5,
        },
        {
            name: 'Spent',
            period: 'Sun',
            value: 37.4,
        },
    ];
    const config = {
        data,
        isGroup: true,
        xField: 'period',
        yField: 'value',
        seriesField: 'name',

        /** set color */
        // color: ['#1ca9e6', '#f88c24'],

        /** Set spacing */
        // marginRatio: 0.1,
        label: {
            // Label data label position can be manually configured
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // Configurable additional layout method
            layout: [
                // Column chart data label position automatically adjusted
                {
                    type: 'interval-adjust-position',
                }, // Data label anti-obstruction
                {
                    type: 'interval-hide-overlap',
                }, // Data label text color automatically adjusted
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    // @ts-ignore
    return <Column {...config} />;
};

const PROJECT_TABS = [
    {
        key: 'marketCapStock',
        label: '시가총액 TOP - 일반주',
    },
    {
        key: 'marketCapEtf',
        label: '시가총액 TOP - ETF',
    },
    {
        key: 'onHold',
        label: 'On Hold',
    },
];

export const StocksDashboardPage = () => {

    const {
        data: clientsData,
        error: clientsDataError,
        loading: clientsDataLoading,
    } = useFetchData('../mocks/Clients.json');

    const [projectTabsKey, setProjectsTabKey] = useState<string>('marketCapStock');

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

    const PROJECT_TABS_CONTENT: Record<string, React.ReactNode> = {
        marketCapStock: <StocksTable key="all-projects-table" data={projectsData} />,
        marketCapEtf: (
            <StocksTable
                key="in-progress-projects-table"
                data={projectsData}
            />
        ),
        onHold: (
            <StocksTable
                key="on-hold-projects-table"
                data={projectsData}
            />
        ),
    };

    const onProjectsTabChange = (key: string) => {
        setProjectsTabKey(key);
    };

    return (
        <div>
            <Helmet>
                <title>Projects | Antd Dashboard</title>
            </Helmet>
            <PageHeader
                title="stocks dashboard"
                breadcrumbs={[
                    {
                        title: (
                            <>
                                <HomeOutlined />
                                <span>home</span>
                            </>
                        ),
                        path: '/',
                    },
                    {
                        title: (
                            <>
                                <PieChartOutlined />
                                <span>dashboards</span>
                            </>
                        ),
                        menu: {
                            items: DASHBOARD_ITEMS.map((d) => ({
                                key: d.title,
                                title: <Link to={d.path}>{d.title}</Link>,
                            })),
                        },
                    },
                    {
                        title: 'stocks',
                    },
                ]}
            />
            <Row
                gutter={[
                    { xs: 8, sm: 16, md: 24, lg: 32 },
                    { xs: 8, sm: 16, md: 24, lg: 32 },
                ]}
            >
                <Col span={24}>
                    <Card
                        title="Projects"
                        extra={
                            <Space>
                                <Button icon={<CloudUploadOutlined />}>Import</Button>
                                <Button icon={<PlusOutlined />}>New project</Button>
                            </Space>
                        }
                        tabList={PROJECT_TABS}
                        activeTabKey={projectTabsKey}
                        onTabChange={onProjectsTabChange}
                    >
                        {PROJECT_TABS_CONTENT[projectTabsKey]}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

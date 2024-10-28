import {Col, Row} from 'antd';
import {Card, PageHeader, StocksTable} from '../../components';
import {useEffect, useState} from 'react';
import {FundOutlined, HomeOutlined, LineChartOutlined, PieChartOutlined,} from '@ant-design/icons';
import {DASHBOARD_ITEMS} from '../../constants';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {usePostData} from '../../hooks';
import {IStock} from "../../interface/interface";

const PROJECT_TABS = [
    {
        key: 'marketCapStock',
        label: <><LineChartOutlined /> 시가총액 TOP - 일반주</>,
    },
    {
        key: 'marketCapEtf',
        label: <><FundOutlined /> 시가총액 TOP - ETF</>,
    },
    {
        key: 'onHold',
        label: 'On Hold',
    },
];

export const StocksDashboardPage = () => {

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
                        extra={null}
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

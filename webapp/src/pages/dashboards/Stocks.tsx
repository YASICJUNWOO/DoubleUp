import type {TabsProps} from 'antd';
import {Col, Row, Tabs} from 'antd';
import {Card, PageHeader, StocksTable} from '../../components';
import {useEffect, useState} from 'react';
import {FundOutlined, LineChartOutlined,} from '@ant-design/icons';
import {Helmet} from 'react-helmet-async';
import {usePostData} from '../../hooks';
import {IStock} from "../../interface/interface";


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


    const STOCK_TABS: TabsProps['items'] = [
        {
            key: 'marketCapStock',
            label: <><LineChartOutlined />시가총액 TOP - 일반주</>,
            children: <StocksTable key="all-projects-table" data={projectsData} />,
        },
        {
            key: 'marketCapEtf',
            label: <><FundOutlined /> 시가총액 TOP - ETF</>,
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

    return (
        <div>
            <Helmet>
                <title>Projects | Antd Dashboard</title>
            </Helmet>
            <PageHeader
                title="주식 목록"
                breadcrumbs={[
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

                <Col span={18}>
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

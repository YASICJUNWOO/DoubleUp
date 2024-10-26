import {Button, ButtonProps, Col, Flex, message, Popover, Row, Segmented, Space, Tag, Typography} from 'antd';
import {
    Card,
    PageHeader,
    PortfolioCreateModal,
    PortfolioHeaderCard,
    PortfolioStatCard,
    PortfolioStockCard,
} from '../../components';
import {ArrowUpOutlined, HomeOutlined, PieChartOutlined, PlusCircleOutlined, QuestionOutlined} from '@ant-design/icons';
import {DASHBOARD_ITEMS} from '../../constants';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useStylesContext} from '../../context';
import React, {CSSProperties, memo, useCallback, useEffect, useMemo, useState} from "react";
import {Area, Pie} from "@ant-design/charts";
import {IPortfolio} from "../../interface/interface";
import CountUp from "react-countup";
import {deletePortfolio, getPortfolioDetail, getPortfolioList} from "../../constants/api";

const {Text, Title} = Typography;

const chartTypes = [
    {label: '종목별' , value: 'stock'},
    {label: '유형별', value: 'type'},
]

const SalesChart: React.FC = memo(() => {
    const data = useMemo(() => [
        {
            country: '평가 금액',
            date: 'Jan',
            value: 800.5,
        },
        {
            country: '평가 금액',
            date: 'Feb',
            value: 1000.5,
        },
        {
            country: '평가 금액',
            date: 'Mar',
            value: 902.7,
        },
        {
            country: '평가 금액',
            date: 'Apr',
            value: 1021.9,
        },
        {
            country: '평가 금액',
            date: 'May',
            value: 1703.7,
        },
        {
            country: '평가 금액',
            date: 'Jun',
            value: 1767.8,
        },
        {
            country: '평가 금액',
            date: 'Jul',
            value: 1806.2,
        },
        {
            country: '평가 금액',
            date: 'Aug',
            value: 1803.5,
        },
        {
            country: '평가 금액',
            date: 'Sept',
            value: 1986.6,
        },
        {
            country: '평가 금액',
            date: 'Oct',
            value: 1952,
        },
        {
            country: '평가 금액',
            date: 'Nov',
            value: 1910.4,
        },
        {
            country: '평가 금액',
            date: 'Dec',
            value: 2015.8,
        },
        {
            country: '투자 원금',
            date: 'Jan',
            value: 109.2,
        },
        {
            country: '투자 원금',
            date: 'Feb',
            value: 1150.7,
        },
        {
            country: '투자 원금',
            date: 'Mar',
            value: 1200.5,
        },
        {
            country: '투자 원금',
            date: 'Apr',
            value: 1280,
        },
        {
            country: '투자 원금',
            date: 'May',
            value: 1340.4,
        },
        {
            country: '투자 원금',
            date: 'Jun',
            value: 1420.2,
        },
        {
            country: '투자 원금',
            date: 'Jul',
            value: 1570.5,
        },
        {
            country: '투자 원금',
            date: 'Aug',
            value: 1840.5,
        },
        {
            country: '투자 원금',
            date: 'Sept',
            value: 1860.3,
        },
        {
            country: '투자 원금',
            date: 'Oct',
            value: 1950.5,
        },
        {
            country: '투자 원금',
            date: 'Nov',
            value: 1980,
        },
        {
            country: '투자 원금',
            date: 'Dec',
            value: 2110.7,
        },
    ], []);

    const config = useMemo(() => ({
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'country',
        slider: {
            start: 0.1,
            end: 0.9,
        },
    }), [data]);

    return <Area {...config} />;
});

// 포트폴리오 데이터를 가공하는 함수
const processPortfolioDataForPieChart = (portfolio: IPortfolio): {
    type: string;
    value: number
}[] => {
    return portfolio.portfolioStocks.map((ps) => ({
        type: ps.stock.name, // 주식의 이름을 type으로 사용
        value: parseFloat((ps.currentAmount / portfolio.totalInvestmentAmount * 100).toFixed(2)), // 주식의 비중을 value로 사용
    }));
};

interface CategoriesChartProps {
    data: { type: string; value: number }[]; // 차트에 필요한 데이터 타입 정의
}

// 파이차트 데이터 정의
const CategoriesChart: React.FC<CategoriesChartProps> = ({data}) => {

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}%',
            style: {
                textAlign: 'center',
                fontSize: 16,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 18,
                },
                content: '총 투자 금액',
            },
        },
    };

    // @ts-ignore
    return <Pie {...config} />;
};

const POPOVER_BUTTON_PROPS: ButtonProps = {
    type: 'text',
};

const cardStyles: CSSProperties = {
    height: '100%',
};

export const PortfolioDashboardPage = () => {
    const stylesContext = useStylesContext();

    // 차트 유형을 ApexChart에서 허용하는 타입으로 제한
    const [selectedPieChartType, setSelectedPieChartType] = useState<"stock" | "type">('stock');

    // 차트 유형 변경 핸들러
    const handleRangeChange = (value: string) => {
        setSelectedPieChartType(value as "stock" | "type");
    };

    const [portfolioList, setPortfolioList] = useState<IPortfolio[]>([]);
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null);
    const [portfolio, setPortfolio] = useState<IPortfolio | null>(null);

    const [isPortfolioListExpanded, setIsPortfolioListExpanded] = useState(true); // 목록 확장 여부 상태
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // 모달 가시성 상태

    // 빈 카드 수 계산
    const emptyCards = useCallback(() => {
        return portfolioList.length % 4 === 0 ? 0 : 4 - (portfolioList.length % 4);
    }, [portfolioList]);

    // 포트폴리오 목록을 가져오는 함수
    const fetchPortfolioList = async (): Promise<IPortfolio[]> => {
        try {
            const response = await getPortfolioList();
            setPortfolioList(response.data);
            return response.data;  // 데이터를 반환
        } catch (error) {
            console.error(error);
            return [];  // 오류 발생 시 빈 배열 반환
        }
    };

    // 포트폴리오 상세 정보를 가져오는 함수
    const fetchPortfolio = async (id: number) => {
        getPortfolioDetail({portfolioId: id.toString()})
            .then(response => {
                setPortfolio(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 포트폴리오 삭제
    const onPortfolioDelete = async (id: number) => {
        try {
            await deletePortfolio({portfolioId: id.toString()});
            message.success('포트폴리오가 성공적으로 삭제되었습니다.');

            const updatedPortfolioList = await fetchPortfolioList(); // 삭제 후 바로 갱신

            if (updatedPortfolioList.length > 0) {
                setSelectedPortfolioId(updatedPortfolioList[0].id); // 첫 번째 포트폴리오 선택
                setPortfolio(updatedPortfolioList[0]);
            } else {
                setSelectedPortfolioId(null);
                setPortfolio(null);
            }
        } catch (error) {
            message.error('포트폴리오 삭제 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    // 포트폴리오 목록을 가져오는 useEffect
    useEffect(() => {
        fetchPortfolioList();
    }, []);

    // 포트폴리오 목록이 업데이트되면 첫 번째 포트폴리오 선택
    useEffect(() => {
        if (portfolioList.length > 0 && !selectedPortfolioId) {
            const firstPortfolioId = portfolioList[0].id;
            setSelectedPortfolioId(firstPortfolioId);
            fetchPortfolio(firstPortfolioId);
        }
    }, [portfolioList]);


    // 선택된 포트폴리오가 변경될 때 데이터를 다시 가져오는 useEffect
    useEffect(() => {
        if (selectedPortfolioId) {
            fetchPortfolio(selectedPortfolioId);
        }
    }, [selectedPortfolioId]);

    // 포트폴리오 목록 접고 펼치기 토글 핸들러
    const togglePortfolioList = () => {
        setIsPortfolioListExpanded(!isPortfolioListExpanded);
    };

    // ======================================= CHART ===============================================

    // 데이터를 가공하여 Pie 차트에 맞는 형식으로 변환
    const pieChartData = useMemo(() => {
        return portfolio?.portfolioStocks
            ? processPortfolioDataForPieChart(portfolio)
            : [];
    }, [portfolio?.portfolioStocks]);

    // =============================================================================================

    // ======================================= MODAL ===============================================
    const showCreateModal = () => {
        setIsEdit(false);
        setIsCreateModalVisible(true); // 모달 보이기
    };

    const handleCreateModalClose = () => {
        setIsCreateModalVisible(false); // 모달 닫기
    };
    // =============================================================================================

    const handlePortfolioClick = useCallback((id: number) => {
        setSelectedPortfolioId(id);
    }, []);

    const [isEdit, setIsEdit] = useState(false);

    function onPortfolioEdit() {
        setIsEdit(true);
        setIsCreateModalVisible(true);
    }

    return (
        <div>
            <Helmet>
                <title>포트폴리오</title>
            </Helmet>
            <PageHeader
                title="포트폴리오"
                breadcrumbs={[
                    {
                        title: (
                            <>
                                <HomeOutlined/>
                                <span>home</span>
                            </>
                        ),
                        path: '/',
                    },
                    {
                        title: (
                            <>
                                <PieChartOutlined/>
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
                        title: '포트폴리오',
                    },
                ]}
            />
            <Row {...stylesContext?.rowProps}>
                {/* 포트폴리오 목록을 접고 펼치는 토글 버튼 */}
                <Col span={24}>
                    <Button onClick={togglePortfolioList}>
                        {isPortfolioListExpanded ? "포트폴리오 목록 접기" : "포트폴리오 목록 펼치기"}
                    </Button>
                </Col>

                {/* isPortfolioListExpanded가 true일 때만 포트폴리오 목록 렌더링 */}
                {isPortfolioListExpanded && portfolioList?.map((portfolio: IPortfolio) => (
                    <Col xs={24} sm={12} lg={6} key={portfolio.id}>
                        <PortfolioStatCard
                            data={[274, 337, 81, 497]}
                            title={portfolio.name}
                            diff={12.5}
                            value={portfolio.totalInvestmentAmount}
                            style={{height: '100%'}}
                            onClick={() => handlePortfolioClick(portfolio.id)}
                        />
                    </Col>
                ))}

                {isPortfolioListExpanded && (
                    <Col xs={24} sm={12} lg={6}>
                        <Flex align="center" justify="flex-start" style={{height: '100%', padding: "20px"}}>
                            <PlusCircleOutlined
                                style={{cursor: 'pointer', fontSize: 35, color: "gray"}}
                                onClick={showCreateModal}
                            />
                        </Flex>
                    </Col>
                )}

                {/* 빈 칸을 카드로 채우기 */}
                {Array(emptyCards).fill(() => 0 ).map((_, index) => (
                    <Col xs={24} sm={12} lg={6} key={`empty-card-${index}`}>
                    </Col>
                ))}

                <Col span={24}>
                    {/* 포트폴리오 헤더 카드 */}
                    {portfolio && (
                        <PortfolioHeaderCard
                            title={portfolio.name}
                            onEdit={() => onPortfolioEdit()}
                            onDelete={() => onPortfolioDelete(portfolio.id)}
                            style={{height: '100%'}}/>
                    )}
                </Col>

                {/* 포트폴리오 생성 모달 */}
                <PortfolioCreateModal
                    isEdit={isEdit}
                    portfolio={portfolio}
                    visible={isCreateModalVisible}
                    onClose={handleCreateModalClose}
                    fetchPortfolioList={fetchPortfolioList}
                />

                <Col xs={24} lg={12}>
                    <Card
                        title="자산 추이"
                        extra={
                            <Popover content="Total sales over period x" title="Total sales">
                                <Button icon={<QuestionOutlined/>} {...POPOVER_BUTTON_PROPS} />
                            </Popover>
                        }
                        style={cardStyles}
                    >
                        <Flex vertical gap="middle">
                            <Space>
                                <Title level={3} style={{margin: 0}}>
                                    ₩ <CountUp end={24485.67}/>
                                </Title>
                                <Tag color="green-inverse" icon={<ArrowUpOutlined/>}>
                                    8.7%
                                </Tag>
                            </Space>
                            <SalesChart/>
                        </Flex>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title="비중"
                        extra={
                            <Segmented
                                options={chartTypes} // 차트 유형 옵션
                                value={selectedPieChartType} // 현재 선택된 차트 유형
                                onChange={handleRangeChange} // 차트 유형 변경 핸들러
                            />
                        }
                        style={cardStyles}
                    >
                        <CategoriesChart data={pieChartData}/>
                    </Card>
                </Col>
                <Col span={24}>
                    <PortfolioStockCard
                        data={portfolio?.portfolioStocks}
                    />
                </Col>
            </Row>
        </div>
    );
};

import {useStylesContext} from "../../../../context";
import {HomeOutlined, PieChartOutlined} from "@ant-design/icons";
import {DASHBOARD_ITEMS} from "../../../../constants";
import {Link, useParams} from "react-router-dom";
import {Col, message, Row, Spin, Tabs} from "antd";
import {
    Card,
    CustomerReviewsCard,
    PageHeader,
    StockCandleChart,
    StockDetailHeader,
    StockDetailSubHeader,
    StockNews
} from "../../../../components";
import {Helmet} from "react-helmet-async";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {
    deleteStockFavorite,
    getCurrentStockPrice,
    getNewsListByStock,
    getStockFavorite,
    postStockFavorite
} from "../../../../constants/api";
import {INews, IStockWithPresentPrice} from "../../../../interface/interface";
import {CommunityCard} from "../../../../components/dashboard/sub/stocks/stockDetail/CommunityCard";

// StockContext 생성
const StockContext = createContext<IStockWithPresentPrice | undefined>(undefined);

// StockProvider 정의
export const StockProvider = ({stockWithPrice, children}: {
    stockWithPrice: IStockWithPresentPrice;
    children: ReactNode
}) => {
    return (
        <StockContext.Provider value={stockWithPrice}>
            {children}
        </StockContext.Provider>
    );
};

// useStockId 훅 정의
export const useStock = () => {
    const context = useContext(StockContext);

    if (!context) {
        throw new Error("useStockId must be used within a StockProvider");
    }
    return context;
};


export const StockDetailPage = () => {
    const {stockId} = useParams();
    const stylesContext = useStylesContext();

    const [stockWithPrice, setStockWithPrice] = useState<IStockWithPresentPrice | undefined>(undefined);
    const [newsList, setNewsList] = useState<INews[]>([]);

    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [favorite, setFavorite] = useState<boolean>(false);


    const [activeTabKey, setActiveTabKey] = useState('1'); // 선택된 탭 키 관리


    const handleFavorite = () => {

        if (favorite) {
            deleteStockFavorite({memberId: '1', stockId: stockId!})
                .then((res) => {
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            postStockFavorite({memberId: '1', stockId: stockId!})
                .then((res) => {
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        setFavorite((prev) => !prev)
        message.success(`즐겨찾기 ${favorite ? '삭제' : '추가'} 완료`);
    }

    useEffect(() => {
        getCurrentStockPrice({stockId: stockId!})
            .then((res) => {
                setStockWithPrice(res.data);
                setLoading(false); // 로딩 완료
            })
            .catch((err) => {
                console.error(err);
                setLoading(false); // 에러가 발생해도 로딩 완료
            });

        getStockFavorite({memberId: '1', stockId: stockId!})
            .then((res) => {
                setFavorite(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        getNewsListByStock({stockId: stockId!})
            .then((res) => {
                setNewsList(res.data);
            })
            .catch((err) => {
                    console.error(err);
                }
            );

    }, [stockId]);

    if (loading) {
        return <Spin size="large"/>; // 로딩 중일 때 Spin 컴포넌트 표시
    }

    if (!stockWithPrice) {
        return <div>주식 데이터를 불러오지 못했습니다.</div>; // 에러 처리
    }

    // 탭 변경 핸들러
    const handleTabChange = (key: string) => {
        setActiveTabKey(key); // 선택된 탭 업데이트
    };

    const items = [
        {key: '1', label: '공지사항', content: <StockNews data={newsList}/>},
        {key: '2', label: '커뮤니티', content: <CommunityCard/>},
    ];

    return (
        <StockProvider stockWithPrice={stockWithPrice}>
            <div>
                <Helmet>
                    <title>Marketing | Antd Dashboard</title>
                </Helmet>
                <PageHeader
                    title="marketing dashboard"
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
                            title: 'marketing',
                        },
                    ]}
                />
                <Row {...stylesContext?.rowProps}>
                    <Col xs={24} xl={16}>
                        <Row {...stylesContext?.rowProps}>
                            <Col span={24}>
                                <StockDetailHeader favorite={favorite} handleFavorite={handleFavorite}/>
                            </Col>

                            <Col span={24}>
                                <StockCandleChart title="차트"/>
                            </Col>

                            <Col span={24}>
                                <Card
                                    title={
                                        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onChange={handleTabChange}>
                                            {items.map((item) => (
                                                <Tabs.TabPane tab={item.label} key={item.key} />
                                            ))}
                                        </Tabs>
                                    }
                                >
                                    {/* 선택된 탭의 content 렌더링 */}
                                    {items.find((item) => item.key === activeTabKey)?.content}
                                </Card>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} xl={8}>
                        <Row {...stylesContext?.rowProps}>
                            <Col span={24}>
                                <StockDetailSubHeader/>
                            </Col>

                            <Col span={24}>
                                <CustomerReviewsCard title="의견"/>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            </div>
        </StockProvider>
    );
};

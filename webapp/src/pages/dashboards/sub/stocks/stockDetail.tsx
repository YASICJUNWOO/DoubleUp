import {useStylesContext} from "../../../../context";
import {useParams} from "react-router-dom";
import {Col, message, Row, Spin, Tabs} from "antd";
import {Card, CustomerReviewsCard, StockDetailHeader, StockDetailSubHeader, StockNews} from "../../../../components";
import {Helmet} from "react-helmet-async";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {
    deleteStockFavorite,
    getCurrentStockPrice,
    getNewsListByStock,
    getStockFavorite,
    getStockInfo,
    postStockFavorite
} from "../../../../constants/api";
import {INews, IStockInfo, IStockWithPresentPrice} from "../../../../interface/interface";
import {CommunityCard} from "../../../../components/dashboard/sub/stocks/stockDetail/CommunityCard";
import {formatNumber} from "../../../../util/money";
import {StockChart} from "../../../../components/dashboard/sub/stocks/stockDetail/chart/StockChart";
import {SimilarStockCard} from "../../../../components/dashboard/sub/stocks/stockDetail/SimilarStockCard";

// StockContext 생성
const StockContext = createContext<StockContextType | undefined>(undefined);


// StockContext에서 사용할 타입 정의
interface StockContextType {
    stockWithPrice: IStockWithPresentPrice;
    stockInfo: IStockInfo;
}

// StockProvider 정의
export const StockProvider = ({stockWithPrice, stockInfo, children}: {
    stockWithPrice: IStockWithPresentPrice;
    stockInfo: IStockInfo;
    children: ReactNode
}) => {
    return (
        <StockContext.Provider value={{stockWithPrice, stockInfo}}>
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
    const [stockInfo, setStockInfo] = useState<IStockInfo>();
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

        if (stockId) {
            getStockInfo({stockId: stockId!.toString()})
                .then((res) => {
                    setStockInfo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

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
        <StockProvider stockWithPrice={stockWithPrice} stockInfo={stockInfo!}>
            <div>
                <Helmet>
                    <title>{`${stockWithPrice.stock.name} | 현재가 : ${formatNumber(stockWithPrice.currentPrice)}`}</title>
                </Helmet>
                <Row {...stylesContext?.rowProps}>
                    <Col xs={24} xl={16}>
                        <Row {...stylesContext?.rowProps}>
                            <Col span={24}>
                                <StockDetailHeader favorite={favorite} handleFavorite={handleFavorite}/>
                            </Col>

                            <Col span={24}>
                                <StockChart/>
                            </Col>

                            <Col span={24}>
                                <Card
                                    title={
                                        <Tabs defaultActiveKey="1" activeKey={activeTabKey} onChange={handleTabChange}>
                                            {items.map((item) => (
                                                <Tabs.TabPane tab={item.label} key={item.key}/>
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
                                <SimilarStockCard/>
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

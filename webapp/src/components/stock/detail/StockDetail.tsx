import React, {createContext, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Alert, Col, message, Row, Spin, Typography} from "antd";
import {StarFilled, StarOutlined} from "@ant-design/icons";
import StockPrice from "./StockPrice";
import {IStock} from "../../../interface/interface";
import {StockAnalTabs} from "./smillar/StockAnalTabs";
import StockInfoTabs from "./info/StockInfoTabs";
import axios from "axios";
import {useAuth} from "../../auth/AuthContext";

/**
 * 특정 주식 정보를 나타내는 컴포넌트
 */

interface StockContextType {
    stockId: string | null;
    stock: IStock | null;
    loading: boolean;
    error: string | null;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export const useStock = (): StockContextType => {
    const context = useContext(StockContext);

    if (!context) {
        throw new Error("useStock must be used within a StockProvider");
    }

    return context;
};

const StockDetail: React.FC = () => {
    const {member} = useAuth();
    const {id} = useParams<{ id: string }>();
    const [stock, setStock] = useState<IStock | null>(null);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [messageApi, contextHolder] = message.useMessage();

    // 즐겨찾기 여부 조회 함수
    const checkFavoriteStatus = async () => {
        if (member && id) {
            try {
                const response = await axios.get(`/api/favorites/check`, {
                    params: { memberId: member.id, stockId: id }
                });
                setIsFavorite(response.data.isFavorite);
            } catch (err) {
                console.error('Error checking favorite status', err);
            }
        }
    };

    // 즐겨찾기 수정
    const updateFavorite = (body: any) => {

        if(isFavorite){
            axios.delete('/api/favorites', {data: body})
                .then((data) => {
                    console.log(data);
                    setIsFavorite(false); // 즐겨찾기 삭제 시 false로 변경

                    messageApi.open({
                        type: 'success',
                        content: '즐겨찾기에서 삭제되었습니다',
                    });

                })
                .catch((err) => {
                    console.error(err);

                    messageApi.open({
                        type: 'error',
                        content: '즐겨찾기 삭제에 실패했습니다',
                    });
                });
        }

        axios.post('/api/favorites', body)
            .then((data) => {
                console.log(data);
                setIsFavorite(true); // 즐겨찾기 성공 시 true로 변경

                messageApi.open({
                    type: 'success',
                    content: '즐겨찾기에 추가되었습니다',
                });

            })
            .catch((err) => {
                console.error(err);

                messageApi.open({
                    type: 'error',
                    content: '즐겨찾기 추가에 실패했습니다',
                });
            });
    }

    // 즐겨찾기 버튼 클릭 시
    const requestFavorite = () => {

        if (!member) {
            messageApi.open({
                type: 'error',
                content: '로그인이 필요한 서비스입니다',
            });
            return;
        }

        const body = {
            stockId: id,
            memberId: member.id,
        }

        updateFavorite(body);
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/stocks/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch stock data");
                    }
                    return res.json();
                })
                .then((data) => {
                    setStock(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load stock data.");
                    setLoading(false);
                });
        }

        // 즐겨찾기 상태 조회
        checkFavoriteStatus();
    }, [id]);

    if (loading) {
        return <Spin tip="Loading..."/>;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon/>;
    }


    return (

        <>
            <StockContext.Provider value={{stockId: id!, stock, loading, error}}>
                {contextHolder}
                {stock ? (
                    <div>
                        <div id={'header'}>
                            {/* head */}
                            <Row>
                                <Col offset={4} span={20}>
                                    <Row id={'title'}>
                                        <Col style={{display: "flex"}}>
                                            <Typography.Title level={2} style={{marginBlock: '15px',}}>
                                                {stock.symbol} - <span style={{color: 'gray'}}>{stock.name}</span>
                                            </Typography.Title>
                                        </Col>
                                        <Col id='star' span={1}
                                             style={{
                                                 display: 'flex',
                                                 alignContent: "center",
                                                 justifyContent: 'center'
                                             }}>
                                            {/* 즐겨찾기 여부에 따라 아이콘 변경 */}
                                            {isFavorite ? (
                                                <StarFilled
                                                    style={{
                                                        fontSize: '25px',
                                                        color: isFavorite ? '#f1c40f' : '#d3d3d3'
                                                    }}
                                                    onClick={requestFavorite}
                                                />
                                            ) : (
                                                <StarOutlined
                                                    style={{
                                                        fontSize: '25px',
                                                        color: isFavorite ? '#f1c40f' : '#d3d3d3'
                                                    }}
                                                    onClick={requestFavorite}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                    <Row id={'summary'}>
                                        <Col>
                                            <StockPrice/>
                                        </Col>
                                    </Row>
                                    <Row id="stockInfoTabsRow">
                                        <Col span={20}>
                                            <StockInfoTabs/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={20}>
                                            <StockAnalTabs/>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ) : (
                    <div>No stock details available.</div>
                )}
            </StockContext.Provider>
        </>

    );
};

export default StockDetail;

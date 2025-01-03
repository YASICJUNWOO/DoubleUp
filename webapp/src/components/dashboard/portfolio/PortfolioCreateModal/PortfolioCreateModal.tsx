import React, {useCallback, useEffect, useState} from 'react';
import {CardProps, Col, Input, Modal, Row, Select, Tabs, TabsProps, Typography} from 'antd';
import {StockSelectCard} from "../StockSelectCard/StockSelectCard";
import {IPortfolio, IStock} from "../../../../interface/interface";
import {StockSelectedCard} from "../StockSelectCard/StockSelectedCard";
import {getFavoriteStockList, getStockListByMarketCap, patchPortfolio, postPortfolio} from "../../../../constants/api";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useAuth} from "../../../../context/AuthContext";
import {StarOutlined, StockOutlined} from "@ant-design/icons";
import {Card} from "../../../Card/Card";
import {useMediaQuery} from "react-responsive";
import {MOBILE_WIDTH} from "../../../../constants";

const {Option} = Select;

export interface SelectedStock extends IStock {
    quantity: number;
    averagePrice: number;
}

interface FormValues {
    portfolioName: string;
    selectedStock: SelectedStock[];
}

type Props = {
    isEdit: boolean;
    portfolio: IPortfolio | null;
    visible: boolean;
    onClose: () => void;
    fetchPortfolioList: () => void;
} & CardProps;

export const PortfolioCreateModal = ({
                                         isEdit,
                                         portfolio,
                                         visible,
                                         onClose,
                                         fetchPortfolioList,
                                         ...others
                                     }: Props) => {

        const isMobile = useMediaQuery({maxWidth: MOBILE_WIDTH});

        const [stockList, setStockList] = useState<IStock[]>([]);
        const [favoriteStockList, setFavoriteStockList] = useState<IStock[]>([]);

        const [activeTab, setActiveTab] = useState('marketCap');
        const {member, isAuthenticated} = useAuth();

        useEffect(() => {
            getStockListByMarketCap({size: '10', page: '0', stockType: 'COMMON'})
                .then(response => setStockList(response.data))
                .catch(error => console.error('시가총액 상위 주식 리스트 조회 중 오류 발생:', error));

            if (isAuthenticated && member) {
                getFavoriteStockList({queryParams: {memberId: member.id.toString()}})
                    .then(response => setFavoriteStockList(response.data))
                    .catch(error => console.error('즐겨찾기 주식 리스트 조회 중 오류 발생:', error));
            }

        }, []);

        // 수정 모드에서는 포트폴리오 데이터를 로드, 생성 모드에서는 초기값 사용
        const initialFormValues: FormValues = isEdit && portfolio ? {
            portfolioName: portfolio?.name || '',
            selectedStock: portfolio.portfolioStocks.map(ps => ({
                ...ps.stock,
                quantity: ps.quantity,
                averagePrice: ps.averagePrice
            })),
        } : {
            portfolioName: '',
            selectedStock: []
        };


        const formik = useFormik<FormValues>({
            initialValues: initialFormValues,
            validationSchema: Yup.object({
                portfolioName: Yup.string().required('포트폴리오 이름을 입력해주세요.'),
                selectedStock: Yup.array()
                    .of(
                        Yup.object({
                            stockId: Yup.number().required(),
                            quantity: Yup.number().required(),
                            averagePrice: Yup.number().required(),
                        })
                    )
                    .min(1, '주식을 선택해주세요.') // 최소 1개 이상 선택 필요
            }),
            onSubmit: (values, {resetForm}) => {
                const body = {
                    memberId: 1,
                    name: values.portfolioName,
                    portfolioStocks: values.selectedStock.map(stock => ({
                        stockId: stock.stockId,
                        quantity: stock.quantity,
                        averagePrice: stock.averagePrice
                    }))
                };

                const action = isEdit && portfolio
                    ? patchPortfolio({portfolioId: portfolio.id.toString()}, body)
                    : postPortfolio(body);

                action
                    .then(() => {
                        fetchPortfolioList(); // 리스트 갱신
                        resetForm(); // 폼 리셋
                        onClose(); // 모달 닫기
                    })
                    .catch(error => {
                        console.error(isEdit ? '포트폴리오 수정 중 오류 발생:' : '포트폴리오 생성 중 오류 발생:', error);
                    });
            },
            enableReinitialize: true,  // 초기값을 갱신하기 위해 설정
        });

        // 주식 선택 처리 (최적화: useCallback 사용)
        const selectStock = useCallback((stock: IStock) => {
            const newStock: SelectedStock = {
                ...stock,
                quantity: 1, // 기본 값 상수로 정의 가능
                averagePrice: 1,
            };
            formik.setFieldValue('selectedStock', [...formik.values.selectedStock, newStock]);
        }, [formik.values.selectedStock]);

        // 주식 삭제 처리 (최적화: useCallback 사용)
        const removeStock = useCallback((stock: SelectedStock) => {
            formik.setFieldValue('selectedStock', formik.values.selectedStock.filter(s => s.stockId !== stock.stockId));
        }, [formik.values.selectedStock]);

        // 주식 정보 업데이트 처리 (최적화: useCallback 사용)
        const updateStock = useCallback((updatedStock: SelectedStock) => {
            const updatedStocks = formik.values.selectedStock.map(stock =>
                stock.stockId === updatedStock.stockId ? updatedStock : stock
            );
            formik.setFieldValue('selectedStock', updatedStocks);
        }, [formik.values.selectedStock]);

        // =================================== STOCK LIST TAB ============================

        const items: TabsProps['items'] = [
            {
                key: 'marketCap',
                label: (
                    <Typography.Title level={5} style={{margin: 0}}>
                        <StockOutlined/> 시가총액 상위
                    </Typography.Title>
                ),
            },
            {
                key: 'favorite',
                label: (
                    <Typography.Title level={5} style={{margin: 0}}>
                        <StarOutlined/> 즐겨찾기
                    </Typography.Title>
                ),
            },
        ]

        const onTabChange = (key: string) => {
            setActiveTab(key);
        }

        return (
            <Modal
                title="포트폴리오 생성"
                open={visible}
                onOk={formik.submitForm}
                onCancel={onClose}
                okText="생성"
                cancelText="취소"
                style={{
                    height: '80vh',       // 높이를 고정 (화면 높이의 80%로 설정)
                }}
                width="75%" // col의 18/24 크기로 설정
            >
                <form onSubmit={formik.handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Input
                                name="portfolioName"
                                value={formik.values.portfolioName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="포트폴리오 이름을 입력해주세요."
                                status={formik.errors.portfolioName && formik.touched.portfolioName ? 'error' : ''}
                            />
                            {formik.touched.portfolioName && formik.errors.portfolioName ? (
                                <div style={{color: 'red'}}>{formik.errors.portfolioName}</div>
                            ) : null}
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            <Card title={
                                <Tabs
                                    size={isMobile ? 'small' : 'large'}
                                    items={items}
                                    defaultActiveKey="marketCap"
                                    onChange={onTabChange}
                                />
                            } {...others}>
                                <StockSelectCard
                                    data={activeTab === 'marketCap' ? stockList : favoriteStockList}
                                    selectedStock={formik.values.selectedStock}
                                    selectStock={selectStock}
                                />
                            </Card>
                        </Col>
                        <Col span={isMobile ? 24 : 12}>
                            {/* 주식을 선택한 경우에만 평균 단가와 수량 입력 필드를 보여줌 */}
                            <StockSelectedCard
                                data={formik.values.selectedStock}
                                removeStock={removeStock}
                                updateStock={updateStock}
                            />
                        </Col>
                    </Row>
                </form>
            </Modal>
        );
    }
;

import React, {useEffect, useState} from "react";
import {Avatar, Button, Col, Input, Result, Row, Table, Typography} from "antd";
import {IStock} from "../../../interface/interface";
import axios from "axios";
import "./NewPortfolioCreat.css";
import SelectedStockDetails from "./SelectedStockDetails";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useImageErrorHandling} from "../../../util/image-loader";

interface PortfolioReq {
    stockId: number;
    quantity: number;
    averagePrice: number;
}


const PortfolioCreate: React.FC = () => {
    const navigate = useNavigate();

    const [stocks, setStocks] = React.useState<IStock[]>([]);
    const [selectedStocks, setSelectedStocks] = React.useState<IStock[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false); // 성공 여부 常態

    //================columns==================
    // 분리된 이미지 처리 함수 사용
    const { getImageSrc, handleImgError } = useImageErrorHandling();

    const columns = [
        {
            title: '종목코드',
            dataIndex: 'symbol',
            key: 'symbol',
            width: 150,
        },
        {
            title: '종목명',
            dataIndex: 'name',
            key: 'name',
            width: 300,
            render: (text: string, record: IStock) => {
                return (
                    <>
                        <Avatar
                            style={{ marginRight: "10px" }}
                            src={getImageSrc(record.symbol, text)}
                            onError={() => handleImgError(record.symbol)} // 이미지 로드 실패 시 호출
                        />
                        {text} ({record.symbol})
                    </>
                );
            },
        }
    ];
    //================================================================================================

    const validationSchema = Yup.object({
        portfolioName: Yup.string().required("포트폴리오 이름을 입력하세요"),
        portfolioData: Yup.array().of(
            Yup.object({
                stockId: Yup.number().required(),
                quantity: Yup.number()
                    .min(1, "수량은 1 이상이어야 합니다.")
                    .required("수량을 입력하세요."),
                averagePrice: Yup.number()
                    .min(1, "평균 금액은 1 이상이어야 합니다.")
                    .required("평균 금액을 입력하세요."),
            })
        ).min(1, "포트폴리오에 최소 하나의 종목을 추가해야 합니다."),
    });

    // Formik 초기값 및 유효성 검사
    const formik = useFormik({
        initialValues: {
            portfolioName: "",
            portfolioData: [] as PortfolioReq[],
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const body = {
                memberId: 1,
                name: values.portfolioName,
                portfolioStocks: values.portfolioData,
            };

            postPortfolio(body);
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            axios.post('/api/stocks/marketCap',
                {
                    params: {
                        page: 0,
                        size: 20
                    }
                }
            )
                .then(response => {
                    setStocks(response.data);
                    console.log("Stocks fetched successfully!", response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the stocks!", error);
                });
        }

        fetchData();
    }, []);

    //================STOCK==================

    // 종목 선택
    const handleRowClick = (record: IStock) => {
        // 이미 선택된 종목인지 확인
        const isAlreadySelected = selectedStocks.some(stock => stock.symbol === record.symbol);

        // 이미 선택된 종목이 아니면 추가
        if (!isAlreadySelected) {
            setSelectedStocks([...selectedStocks, record]);
            formik.setFieldValue("portfolioData", [
                ...formik.values.portfolioData,
                {stockId: record.stockId, quantity: 1, averagePrice: 1},
            ]);
        }
    }

    //종목 제거
    const handleRemoveStock = (stockId: number) => {
        // 종목을 제거하는 함수
        setSelectedStocks(selectedStocks.filter(stock => stock.stockId !== stockId));
        formik.setFieldValue(
            "portfolioData",
            formik.values.portfolioData.filter(data => data.stockId !== stockId)
        );
    };

    // 선택된 종목의 행에 스타일 적용
    const rowClassName = (record: IStock) => {
        // 선택된 종목이면 특정 클래스를 반환
        return selectedStocks.some(stock => stock.symbol === record.symbol) ? 'selected-row' : '';
    };

    //===================================PORTFOLIO=============================

    // 포트폴리오 데이터 업데이트
    const handleUpdatePortfolioData = (stockId: number, field: string, value: number) => {
        formik.setFieldValue(
            "portfolioData",
            formik.values.portfolioData.map(data =>
                data.stockId === stockId ? {...data, [field]: value} : data
            )
        );
    };


    // 포트폴리오 저장
    const postPortfolio = async (body: any) => {
        axios.post('/api/portfolio', body)
            .then(response => {
                console.log("Portfolio saved successfully!", response.data);

                setIsSuccess(true); // 성공 시 Result 화면으로 전환
            })
            .catch(error => {
                console.error("There was an error saving the portfolio!", error);
            });
    }

    // 성공 여부에 따른 조건부 렌더링
    if (isSuccess) {
        return (
            <Result
                status="success"
                title="포트폴리오가 성공적으로 생성되었습니다!"
                subTitle="포트폴리오 목록 페이지로 이동합니다."
                extra={[
                    <Button type="primary" onClick={() => navigate("/portfolio")}>
                        목록으로 이동
                    </Button>,
                ]}
            />
        );
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row style={{justifyContent: "center"}}>
                <Col>
                    <Typography.Title level={4} style={{textAlign: "center"}}>
                        포트폴리오 이름을 입력하세요
                    </Typography.Title>
                </Col>
            </Row>

            <Row id="portfolio-name" style={{justifyContent: "center"}}>
                <Col span={10}>
                    <Input
                        name="portfolioName"
                        placeholder="포트폴리오 이름을 입력하세요"
                        value={formik.values.portfolioName}
                        onChange={formik.handleChange}
                        size="large"
                        style={{marginBottom: '20px'}}
                        status={formik.touched.portfolioName && formik.errors.portfolioName ? 'error' : undefined}
                    />
                </Col>
            </Row>
            <Row>
                <Col offset={2} span={9}>
                    <Input.Search
                        placeholder="종목명 또는 종목코드를 입력하세요."
                        enterButton="검색"
                        size="large"
                        onSearch={value => console.log(value)}/>

                    <Table
                        size="small"
                        columns={columns}
                        dataSource={stocks}
                        pagination={{pageSize: 10}}
                        onRow={(record) => ({
                            onClick: () => handleRowClick(record),  // 행 클릭 시 종목 추가
                        })}
                        rowClassName={rowClassName}
                    />
                </Col>
                <Col offset={2} span={9}>
                    {/* 선택된 종목 리스트 */}
                    <div style={{border: '1px solid #ccc', borderRadius: "20px", padding: '10px'}}>
                        <h3>선택된 종목</h3>
                        {selectedStocks.map(stock => (
                            <SelectedStockDetails
                                key={stock.stockId}
                                stock={stock}
                                onRemove={handleRemoveStock}
                                updatePortfolioData={handleUpdatePortfolioData}
                            />
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col offset={2} span={20}>
                    {/* 저장 버튼 추가 */}
                        <Button
                            type="primary" style={{marginTop: "10px", width: "100%"}}
                            htmlType="submit"
                        >
                            저장
                        </Button>
                </Col>
            </Row>
        </form>
    );
};



export default PortfolioCreate;
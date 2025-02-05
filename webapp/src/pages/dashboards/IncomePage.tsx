import {Card} from "../../components";
import {Button, Col, Flex, Row, Typography} from "antd";
import {StylesContext} from "../../context";
import React, {useContext, useEffect, useState} from "react";
import {IncomeTable} from "../../components/dashboard/income/IncomeTable";
import {addIncome, deleteIncomeByYear, getIncomeByYear} from "../../constants/api";
import {Income, IncomeAddRequest} from "../../components/dashboard/income/interface";
import {IncomeBarChart} from "../../components/dashboard/income/IncomeBarChart";
import {IncomeGoal} from "../../components/dashboard/income/IncomeGoal";
import {FinancialLedgerPage} from "./FinancialLedgerPage";

const {Title} = Typography;

// 1월 부터 12월까지의 데이터
const initialData = (year: number) =>
    Array.from({length: 12}, (_, i) => {
        return {
            id: (i + 1).toString(),
            yearValue: year,
            monthValue: (i + 1),
            income: 0,
            expense: 0,
            totalIncome: 0,
            incomeDetails: []
        }
    })

export const IncomePage: React.FC = () => {

    const stylesContext = useContext(StylesContext);

    const [year, setYear] = useState<number>(2025);

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Income[]>([]);

    const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchIncome(year);
        setLoading(false);
    }, [year]);

    const fetchIncome = (year: number) => {

        const params = {"year": year.toString()}

        getIncomeByYear(params)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const saveIncome = (data: Income[]) => {

        const body: IncomeAddRequest[] = data.map((item) => ({...item, year: year}));

        addIncome(body)
            .then((response) => {
                fetchIncome(year);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const returnToIncomePage = () => {
        setSelectedIncome(null);
        fetchIncome(year);
    }

    const deleteIncome = (year: number) => {
        const params = {"year": year.toString()}

        deleteIncomeByYear(params)
            .then((response) => {
                fetchIncome(year);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <Row {...stylesContext?.rowProps}>
            <Col span={24}>
                {
                    selectedIncome ?
                        <FinancialLedgerPage
                            returnToIncomePage={returnToIncomePage}
                            incomeId={selectedIncome.id}
                        />
                        :
                        <Card
                            title={
                                <Flex gap={12} justify="center" style={{width: "100%"}}>
                                    <Button
                                        onClick={() => setYear(year - 1)}
                                    >
                                        {"<"}
                                    </Button>
                                    <Title level={5} style={{margin: 0}}>{year}년 수입</Title>
                                    <Button
                                        onClick={() => setYear(year + 1)}
                                    >
                                        {">"}
                                    </Button>
                                </Flex>
                            }
                            extra={<Button onClick={() => deleteIncome(year)}>삭제</Button>}
                        >
                            {data.length === 0 ?

                                <Flex vertical justify="center" align="center">
                                    <Title level={5} style={{margin: 0}}>데이터가 없습니다.</Title>
                                    <Button
                                        onClick={() => saveIncome(initialData(year))}
                                    >
                                        데이터 생성
                                    </Button>
                                </Flex>
                                :
                                <>
                                    <IncomeGoal
                                        year={year}
                                        incomeList={data}
                                    />
                                    <IncomeBarChart data={data}/>
                                    <IncomeTable
                                        loading={loading}
                                        data={data}
                                        setData={setData}
                                        setSelectedIncome={setSelectedIncome}
                                    />
                                </>
                            }
                        </Card>
                }
            </Col>
        </Row>


    )
}
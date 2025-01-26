import React, {useEffect, useState} from "react";
import './css/FinacialLedger.css';
import {Col, Row, Space, Typography} from "antd";
import {useStylesContext} from "../../context";
import {FinancialLedgerTable} from "./FinancialLedgerTable";
import {Card} from "../../components";
import {FinancialSankey} from "./FinancialSankey";
import {FinancialPie} from "./FinancialPie";
import {addIncomeDetail, getIncomeById} from "../../constants/api";
import {
    ExpenseCategoryType,
    IncomeCategoryType,
    LedgerAddModal
} from "../../components/dashboard/ledger/LedgerAddModal";
import {Income} from "../../components/dashboard/income/interface";
import {ArrowLeftOutlined} from "@ant-design/icons";

export interface IncomeDetailRequest {
    type: 'INCOME' | 'EXPENSE';
    category: IncomeCategoryType | ExpenseCategoryType;
    content: string;
    amount: number;
    date: string;
    incomeId: string | null;
}

type Props = {
    incomeId: string;
    returnToIncomePage: () => void;
}

export const FinancialLedgerPage: React.FC<Props> = ({
                                                         incomeId,
                                                         returnToIncomePage
                                                     }) => {

    const [incomeData, setIncomeData] = useState<Income>();

    const [incomeDetailAddModalOpen, setIncomeDetailAddModalOpen] = useState(false);

    useEffect(() => {
        fetchIncome(incomeId);
    }, [incomeId]);

    const fetchIncome = (id: string) => {
        getIncomeById({incomeId: incomeId})
            .then((res) => {
                setIncomeData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const saveIncomeDetail = (body: IncomeDetailRequest) => {

        const bodyWithIncomeId = {
            ...body,
            incomeId: incomeId
        }

        addIncomeDetail(bodyWithIncomeId)
            .then(() => {
                setIncomeDetailAddModalOpen(false);
                fetchIncome(incomeId);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const styleContext = useStylesContext();
    return incomeData ?
        <>
            <Row {...styleContext?.rowProps}>
                <Space>
                    <ArrowLeftOutlined
                        onClick={() => returnToIncomePage()}
                    />
                    <Typography.Title level={5} style={{margin: 0}}>
                        뒤로가기
                    </Typography.Title>
                </Space>
                <Col span={24}>
                    <FinancialLedgerTable
                        returnToIncomePage={returnToIncomePage}
                        data={incomeData.incomeDetails || []}
                        year={incomeData.yearValue}
                        handleYearChange={() => {
                        }}
                        setIncomeDetailAddModalOpen={setIncomeDetailAddModalOpen}
                    />
                </Col>
                <Col span={16}>
                    <Card
                        title="흐름"
                        bordered={false}
                    >
                        <div style={{width: "100%", height: "300px"}}>
                            <FinancialSankey/>
                        </div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        title="비율"
                        bordered={false}
                    >
                        <div style={{width: "100%", height: "300px"}}>
                            <FinancialPie/>
                        </div>
                    </Card>
                </Col>
            </Row>

            {incomeDetailAddModalOpen &&
                <LedgerAddModal
                    visible={incomeDetailAddModalOpen}
                    setVisible={setIncomeDetailAddModalOpen}
                    year={incomeData.yearValue}
                    month={incomeData.monthValue}
                    onSaveIncomeDetail={saveIncomeDetail}
                />
            }

        </>
        :
        <></>
}

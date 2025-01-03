import React, {useEffect, useState} from "react";
import './css/FinacialLedger.css';
import {Col, Row} from "antd";
import {useStylesContext} from "../../context";
import {FinancialLedgerTable} from "./FinancialLedgerTable";
import {Card} from "../../components";
import {FinancialSankey} from "./FinancialSankey";
import {FinancialPie} from "./FinancialPie";
import {getLedgers, postLedgers} from "../../constants/api";
import dayjs from "dayjs";


export const FinancialLedger: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [ledgerData, setLedgerData] = useState([]);
    const [year, setYear] = useState(dayjs().year());
    const [month, setMonth] = useState(dayjs().month() + 1);

    useEffect(() => {
        fetchLedgers(year.toString(), month.toString());
    }, [year, month]);

    const fetchLedgers = (year: string, month: string) => {
        setLoading(true);
        getLedgers(
            {
                "year": year,
                "month": month
            }
        )
            .then((res) => {
                setLedgerData(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const saveLedger = (body:any) => {
        postLedgers(body)
            .then((res) => {
                fetchLedgers(year.toString(), month.toString());
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const styleContext = useStylesContext();
    return (
        <Row {...styleContext?.rowProps}>
            <Col span={24}>
                <FinancialLedgerTable
                    year={year}
                    saveLedger={saveLedger}
                    handleYearChange={setYear}
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
    );
}
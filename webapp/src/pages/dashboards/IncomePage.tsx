import {Card} from "../../components";
import {Button, Col, Flex, Row, Space, Typography} from "antd";
import {StylesContext} from "../../context";
import React, {useContext, useEffect, useState} from "react";
import {IncomeTable} from "../../components/income/IncomeTable";
import {EditFilled, PlusOutlined} from "@ant-design/icons";
import {addIncome, getIncomeByYear} from "../../constants/api";
import {Income, IncomeAddRequest} from "../../components/income/interface";
import {IncomeBarChart} from "../../components/income/IncomeBarChart";
import {IncomeGoal} from "../../components/income/IncomeGoal";

const {Title} = Typography;

// 1월 부터 12월까지의 데이터
const initialData = (year: number) =>
    Array.from({length: 12}, (_, i) => {
        return {
            id: (i + 1).toString(),
            year: year,
            month: (i + 1),
            income: 0,
            expense: 0,
            totalIncome: 0
        }
    })

export const IncomePage: React.FC = () => {

    const stylesContext = useContext(StylesContext);

    const [year, setYear] = useState<number>(2025);

    const [loading, setLoading] = useState<boolean>(false);
    const [originData, setOriginData] = useState<Income[]>([]);
    const [data, setData] = useState<Income[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
                setOriginData(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }


    const handleComplete = () => {

        const body: IncomeAddRequest[] = data.map((item) => ({...item, year: year}));

        addIncome(body)
            .then((response) => {
                fetchIncome(year);
                setIsEdit(false);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleCancel = () => {
        setIsEdit(false);
        setData(originData);
    }

    return (
        <Row {...stylesContext?.rowProps}>
            <Col span={24}>
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
                    extra={
                        <>
                            {!isEdit &&
                                <Button
                                    icon={<EditFilled/>}
                                    type="primary"
                                    onClick={() => setIsEdit(true)}
                                >
                                    수정
                                </Button>
                            }

                            {isEdit &&
                                <Space>
                                    <Button
                                        icon={<PlusOutlined/>}
                                        type="primary"
                                        onClick={handleComplete}
                                    >
                                        완료
                                    </Button>
                                    <Button
                                        icon={<PlusOutlined/>}
                                        type="primary"
                                        onClick={handleCancel}
                                    >
                                        취소
                                    </Button>
                                </Space>
                            }
                        </>
                    }
                >
                    {data.length === 0 ?
                        <Flex vertical justify="center" align="center">
                            <Title level={5} style={{margin: 0}}>데이터가 없습니다.</Title>
                            <Button
                                onClick={() => {
                                    setData(initialData(year))
                                    setOriginData(initialData(year))
                                }}
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
                            <IncomeBarChart data={data} />
                            <IncomeTable
                                loading={loading}
                                data={data}
                                setData={setData}
                                isEdit={isEdit}
                            />
                        </>
                    }
                </Card>
            </Col>
        </Row>


    )
}
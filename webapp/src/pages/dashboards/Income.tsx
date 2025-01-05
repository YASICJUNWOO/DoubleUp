import {Card} from "../../components";
import {Button, Col, Flex, Row, Space, Typography} from "antd";
import {StylesContext} from "../../context";
import React, {useContext, useState} from "react";
import {IncomeTable} from "../../components/income/IncomeTable";
import {EditFilled, PlusOutlined} from "@ant-design/icons";

const {Title} = Typography;

const sample = [
    {
        key: "1",
        month: "1",
        income: 7000,
        expense: 1500,
        totalIncome: 5500
    },
    {
        key: "2",
        month: "2",
        income: 7000,
        expense: 2000,
        totalIncome: 5000
    },
    {
        key: "3",
        month: "3",
        income: 7000,
        expense: 3500,
        totalIncome: 3500
    },
    {
        key: "4",
        month: "4",
        income: 7000,
        expense: 2000,
        totalIncome: 5000
    },
    {
        key: "5",
        month: "5",
        income: 7000,
        expense: 2500,
        totalIncome: 4500
    },
    {
        key: "6",
        month: "6",
        income: 6000,
        expense: 3000,
        totalIncome: 3000
    },
    {
        key: "7",
        month: "7",
        income: 7000,
        expense: 3500,
        totalIncome: 3500
    },
    {
        key: "8",
        month: "8",
        income: 8000,
        expense: 4000,
        totalIncome: 4000
    },
    {
        key: "9",
        month: "9",
        income: 9000,
        expense: 4500,
        totalIncome: 4500
    },
    {
        key: "10",
        month: "10",
        income: 10000,
        expense: 5000,
        totalIncome: 5000
    },
    {
        key: "11",
        month: "11",
        income: 11000,
        expense: 5500,
        totalIncome: 5500
    },
    {
        key: "12",
        month: "12",
        income: 12000,
        expense: 6000,
        totalIncome: 6000
    }
]

export const Income: React.FC = () => {

    const stylesContext = useContext(StylesContext);

    const [year, setYear] = useState<number>(2025);

    const [originData, setOriginData] = useState<any[]>(sample);
    const [data, setData] = useState<any[]>(sample);
    const [isEdit, setIsEdit] = useState<boolean>(false);


    const handleComplete = () => {
        setIsEdit(false);
        // todo : 추후 백에 요청
        setOriginData(data);
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
                    <IncomeTable
                        data={sample}
                        isEdit={isEdit}
                        setData={setData}
                    />
                </Card>
            </Col>
        </Row>


    )
}
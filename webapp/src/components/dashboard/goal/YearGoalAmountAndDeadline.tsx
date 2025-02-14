import {useFormik} from "formik";
import React, {useEffect} from "react";
import {CardProps, Flex, InputNumber, Table, TableColumnsType, Typography} from "antd";
import {useMediaQuery} from "react-responsive";
import {formatCurrency, formatNumber} from "../../../util/money";
import {green, red} from "@ant-design/colors";
import {FormValues} from "../../../pages/dashboards/goal-road-map/GoalRoadMapPage";
import {IGoalRoadMapDetail} from "../../../interface/interface";

const {Text} = Typography;

type Props = {
    formik: ReturnType<typeof useFormik<FormValues>>;
    isEdit: boolean;
    onNext?: () => void;
} & CardProps;

// YearGoalAmountAndDeadline 컴포넌트
export const YearGoalAmountAndDeadline = ({
                                              formik,
                                              isEdit,
                                              ...others
                                          }: Props) => {

    const isMobile = useMediaQuery({maxWidth: 767});

    useEffect(() => {
        const details = formik.values.details;

        // if (isEdit || details.length > 0) {
        //     const newTableData = details.map((item, index) => ({
        //         key: index,
        //         year: item.yearValue,
        //         age: formik.values.age ? formik.values.age + index : null,
        //         goalAmount: item.goalAmount,
        //     }));
        //
        //     setTableData(newTableData);
        // }
        // else
        if (formik.values.details.length === 0) {
            const startYear = formik.values.dateRange[0].year();
            const endYear = formik.values.dateRange[1].year();

            const increaseAmount = (formik.values.goalAmount - formik.values.startAmount) / (endYear - startYear);

            const newTableData = Array.from({length: endYear - startYear + 1}, (_, index) => {
                const year = startYear + index;
                return {
                    yearValue: year,
                    goalAmount: formik.values.startAmount + increaseAmount * index,
                };
            });

            formik.setFieldValue('details', newTableData);
        }

    }, [formik.values.details]);

    const columns: TableColumnsType<IGoalRoadMapDetail> = [
        {
            title: '년도',
            dataIndex: 'yearValue',
            align: 'center',
            key: 'yearValue',
            width: isMobile ? '15%' : '10%',
        },
        ...(formik.values.age !== null ? [{
            title: '나이',
            align: 'center',
            key: 'age',
            width: isMobile ? '15%' : '10%',
            render:
                (_: any, record: any, index: number) =>
                    formik.values.age ? formik.values.age + index : '-'
        } as any] : []),
        {
            title: '목표 금액',
            dataIndex: 'goalAmount',
            key: 'goalAmount',
            align: 'center',
            width: isMobile ? '30%' : 'auto',
            render: (goalAmount: number, record: any, index: number) => (
                <Flex vertical align='center'>
                    <Text>{formatCurrency(record.goalAmount)}</Text>
                    <InputNumber
                        min={0}
                        value={record.goalAmount}
                        formatter={value => formatNumber(Number(Number(value).toFixed(0)))}
                        onChange={(value) => {
                            formik.setFieldValue('details', formik.values.details.map((item, idx) =>
                                item.yearValue === record.yearValue ? {...item, goalAmount: value || 0} : item
                            ));
                        }}
                        disabled={index === formik.values.details.length - 1}
                        style={{width: isMobile ? '80%' : '60%'}}
                    />
                </Flex>
            ),
        },
        {
            title: '전년 대비 증가액',
            key: 'increaseAmount',
            width: isMobile ? '25%' : 'auto',
            render: (_: any, record: any, index: number) => {
                if (index === 0) {
                    return '-';
                }

                const prevGoalAmount = formik.values.details[index - 1].goalAmount;
                const increaseAmount = record.goalAmount - prevGoalAmount;
                return (
                    <Typography.Text
                        style={{
                            color: increaseAmount > 0 ? green[6] : red[5],
                            fontWeight: 500,
                            fontSize: isMobile ? '12px' : '16px'
                        }}
                    >
                        {increaseAmount > 0 ? '+' : ''}{formatCurrency(increaseAmount)}
                    </Typography.Text>
                )
            },
        },
        {
            title: '전년 대비 증가율',
            key: 'increaseRate',
            width: isMobile ? '25%' : 'auto',
            render: (_: any, record: any, index: number) => {

                if (index === 0) {
                    return '-';
                }

                const prevGoalAmount = formik.values.details[index - 1].goalAmount;
                const increaseRate = ((record.goalAmount - prevGoalAmount) / prevGoalAmount) * 100;
                return (
                    <Typography.Text
                        style={{
                            color: increaseRate > 0 ? green[6] : red[5],
                            fontWeight: 500,
                            fontSize: isMobile ? '12px' : '16px'
                        }}
                    >
                        {increaseRate > 0 ? '+' : ''}{increaseRate.toFixed(2)}%
                    </Typography.Text>
                )
            },
        }
    ];

    return (
        <>
            <Table
                size='small'
                columns={columns}
                dataSource={formik.values.details}
                pagination={false}
                scroll={{y: 'calc(60vh)'}}
                style={{marginBottom: '15px'}}
            />
        </>
    );
};
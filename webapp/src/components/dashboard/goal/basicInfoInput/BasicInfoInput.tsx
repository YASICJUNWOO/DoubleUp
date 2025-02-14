import {useFormik} from "formik";
import {CardProps, Col, DatePicker, Flex, InputNumber, Row, Select, Space, Typography} from "antd";
import {useStylesContext} from "../../../../context";
import React, {useState} from "react";
import {formatCurrency, formatNumber} from "../../../../util/money";
import dayjs from "dayjs";
import {FormValues} from "../../../../pages/dashboards/goal-road-map/GoalRoadMapPage";
import {CURRENCY, CurrencyKey} from "./Instant";

const { RangePicker } = DatePicker;
const {Text} = Typography;

type Props = {
    formik: ReturnType<typeof useFormik<FormValues>>;
} & CardProps;

export const BasicInfoInput = ({formik, ...others}: Props) => {
    const stylesContext = useStylesContext();

    const [currency, setCurrency] = useState<CurrencyKey>("WON");

    const options = (Object.keys(CURRENCY) as CurrencyKey[]).map((key) => ({
        label: CURRENCY[key],
        value: key,
    }));

    // Select 옵션을 함수로 정의하여 여러 곳에서 재사용 가능하게 설정
    const CurrencySelect = (
        <Select
            value={currency}
            options={options}
            onChange={(value) => setCurrency(value as CurrencyKey)}
        />
    );

    return (
        <>
            <Row {...stylesContext?.rowProps}>
                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>시작 원금</Text>
                        <Text type="danger">{formatCurrency(formik.values.startAmount)}
                        </Text>
                    </Flex>
                    <InputNumber
                        placeholder="시작 원금 입력"
                        value={formik.values.startAmount}
                        status={formik.errors.startAmount ? 'error' : undefined}
                        onChange={(value) => formik.setFieldValue('startAmount', value)}
                        min={0}
                        addonAfter={CurrencySelect}
                        formatter={value => formatNumber(Number(value))}
                        style={{width: '100%', marginBlock: '4px'}}
                    />
                    {
                        formik.touched.startAmount && formik.errors.startAmount && (
                            <Text type="danger">{formik.errors.startAmount}</Text>
                        )
                    }
                </Col>

                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>목표 금액</Text>
                        <Text type="danger">{formatCurrency(formik.values.goalAmount)}</Text>
                    </Flex>
                    <InputNumber
                        placeholder="목표 금액 입력"
                        value={formik.values.goalAmount}
                        min={0}
                        status={formik.errors.goalAmount ? 'error' : undefined}
                        onChange={(value) => formik.setFieldValue('goalAmount', value)}
                        addonAfter={CurrencySelect}
                        formatter={value => formatNumber(Number(value))}
                        style={{width: '100%', marginBlock: '4px'}}
                    />
                    {formik.touched.goalAmount && formik.errors.goalAmount && (
                        <Text type="danger">{formik.errors.goalAmount}</Text>
                    )}
                </Col>

                <Col xs={24} sm={12}>
                    <Flex justify="space-between">
                        <Text>목표 달성 기간</Text>
                        {formik.values.age && (
                            <Text>{`목표 달성 나이: 
                                ${formik.values.age + (dayjs(formik.values.dateRange[0]).year() - dayjs().year())}
                                ~
                                ${formik.values.age + (dayjs(formik.values.dateRange[1]).year() - dayjs().year())}
                                `}
                            </Text>
                        )}
                    </Flex>
                    <RangePicker
                        picker="year"
                        value={formik.values.dateRange}
                        onChange={(date) => formik.setFieldValue('dateRange', date)}
                        style={{width: '100%', marginBlock: '4px'}}
                    />
                    {formik.touched.dateRange && formik.errors.dateRange && (
                        <Text type="danger">{String(formik.errors.dateRange)}</Text>
                    )}
                </Col>

                <Col xs={24} sm={12}>
                    <Space>
                        <Text>현재 나이</Text>
                        <Text type='secondary' style={{fontSize:12}}> (선택) </Text>
                    </Space>
                    <InputNumber
                        value={formik.values.age}
                        onChange={(value) => formik.setFieldValue('age', value)}
                        min={0}
                        placeholder="나이 입력"
                        style={
                            {width: '100%', marginBlock: '4px'}
                        }
                    />
                    {formik.touched.age && formik.errors.age && (
                        <Text type="danger">{formik.errors.age}</Text>
                    )}
                </Col>

            </Row>
        </>
    )
        ;
};
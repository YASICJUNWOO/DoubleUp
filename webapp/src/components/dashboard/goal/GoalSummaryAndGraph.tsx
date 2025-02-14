import {CardProps, Typography} from "antd";
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {useFormik} from "formik";
import {FormValues} from "../../../pages/dashboards/goal-road-map/GoalRoadMapPage";

const {Title} = Typography;

type Props = {
    formik: ReturnType<typeof useFormik<FormValues>>;
} & CardProps;

// 4단계 컴포넌트: 목표 요약 및 시각화 화면
export const GoalSummaryAndGraph = ({formik, ...others}: Props) => {

    const data = formik.values.details.map((item) => {
        return {
            year: item.yearValue,
            age: formik.values.age ? formik.values.age + item.yearValue : null,
            goalAmount: item.goalAmount
        };
    });

    return (
        <>
            <Title level={4}>목표 달성 예상 그래프</Title>
            <div style={{height: "400px", width: "100%"}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="year"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="goalAmount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                        {/*<Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />*/}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};
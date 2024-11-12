import React, {PureComponent} from 'react';
import {Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {StockPrice} from "../../../../../interface/interface";

// Props 인터페이스에 data를 추가하여 상위에서 전달받을 수 있도록 설정
interface Props {
    data: StockPrice[];
}

export default class StockLineChart extends PureComponent<Props> {
    render() {
        // 상위에서 받은 data를 그대로 사용
        const {data} = this.props;

        return (
            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={data}
                >
                    {/*<ReferenceLine y={75000} label="Target Price" stroke="grey" strokeDasharray="3 3" />*/}
                    {/*y={75000}: Y축 기준으로 75,000 위치에 선을 표시합니다.
label="Target Price": 기준선 옆에 Target Price라는 라벨을 표시합니다.
stroke="red" 및 strokeDasharray="3 3": 선의 색상을 빨간색으로 지정하고, 점선 스타일을 적용합니다.*/}
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Brush dataKey="date" height={30} stroke="#8884d8"/>
                    {/*dataKey="date": X축에 연결하여 날짜 범위를 선택할 수 있습니다.
height={30}: 브러시의 높이를 설정합니다.
stroke="#8884d8": 브러시 영역의 색상을 지정합니다.*/}
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                    <YAxis
                        domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]} // 매개변수에 타입 지정
                        tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} // 천 단위로 표기
                        allowDataOverflow={false}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === "Close Price") {
                                return [`${value} KRW`, "종가"];
                            }
                            return value;
                        }}
                        labelFormatter={(label) => `날짜: ${label}`}
                    />
                    <Legend/>
                    <Line
                        type="monotone"
                        dataKey="closePrice"
                        stroke="#82ca9d"
                        name="Close Price"
                        // activeDot={{ r: 8 }}
                        // dot={(props) => {
                        //     const { cx, cy, value } = props;
                        //     if (value > 78000) { // 특정 값 조건으로 점을 강조
                        //         return <circle cx={cx} cy={cy} r={6} fill="red" />;
                        //     }
                        //     return <circle cx={cx} cy={cy} r={3} fill="#82ca9d" />;
                        // }}
                    />
                    {/*activeDot={{ r: 8 }}: 활성화된 포인트 크기를 설정합니다.
커스텀 dot 함수: dot 속성에 함수로 조건부 포맷팅을 설정하여 특정 값 이상에서만 빨간 점을 표시합니다.*/}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
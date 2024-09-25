import React, {useEffect, useState} from 'react';
import {ResponsiveLine} from '@nivo/line';
import axios from "axios";

// interface Props {
//     stockPriceDataList: StockPriceData[];
// }

interface Props {
    stockId: string;
}

interface StockPriceData {
    id: number;
    date: string;
    openPrice: number;
    closePrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
}

interface ChartRenderData {
    id: string;
    data: { x: string; y: number }[];
}

const StockLineChart: React.FC<Props> = ({stockId}) => {
    const [stockPriceList, setStockPriceList] = useState<StockPriceData[]>([]);
    const [data, setData] = useState<ChartRenderData[]>([]);
    const [minValue, setMinValue] = useState<number>(Number.MAX_VALUE);
    const [maxValue, setMaxValue] = useState<number>(Number.MIN_VALUE);

    // 주식 가격 정보 가져오기 ( 일봉 )
    useEffect(() => {
        const fetchStockPriceList = async () => {
            axios.get('/api/stock-prices', {
                params: {
                    'stockId': stockId,
                    'periodType': 'DAILY'
                }
            }).then((response) => {
                console.log("<<<<<<<Stock prices list>>>>>>", response.data);
                setStockPriceList(response.data);
                console.log("<<<<<<<Stock prices list>>>>>>", stockPriceList);
            }).catch((error) => {
                console.error("Error fetching stock prices list:", error);
            });
        }

        fetchStockPriceList();
    }, []);

    // 차트 그리기
    useEffect(() => {

        // 차트 데이터로 변환
        const chartData = [
            {
                id: 'closePrice',
                data: stockPriceList.map(item => ({
                    x: item.date,
                    y: item.closePrice
                }))
            }
        ];

        setData(chartData);

        // 최소값과 최대값 계산
        let minY = Math.min(...stockPriceList.map(item => item.closePrice));
        let maxY = Math.max(...stockPriceList.map(item => item.closePrice));

        // 여유 공간을 주기 위해 +- 10 추가
        setMinValue(minY - 10);
        setMaxValue(maxY + 10);
    }, [stockPriceList]);

    return (
        <div style={{height: '400px'}}>
            <ResponsiveLine
                // chart에 표시될 데이터 배열, 각 데이터 시리즈는 id와 data 배열로 구성됩니다.
                data={data}

                // 차트의 margin 설정
                margin={{top: 50, right: 50, bottom: 50, left: 50}}

                // 라인 안 색 채움
                enableArea={true}
                areaBaselineValue={minValue}

                // X축 스케일 설정, 'point'는 범주형 데이터에 사용됩니다.
                xScale={{type: 'point'}}

                // Y축 스케일 설정, 'linear'는 연속형 데이터에 사용되며, min/max를 자동으로 설정합니다.
                yScale={{type: 'linear', min: minValue, max: maxValue, stacked: false, reverse: false}}

                // 차트 상단에 X축을 비활성화
                axisTop={null}

                // 차트 오른쪽에 Y축을 비활성화
                axisRight={null}

                // X축(하단)의 속성 설정
                axisBottom={{
                    tickSize: 5, // 눈금의 크기
                    tickPadding: 5, // 눈금과 눈금 레이블 사이의 간격
                    tickRotation: 0, // 눈금 레이블의 회전 각도
                    legend: 'Date', // X축에 표시될 설명 레이블
                    legendOffset: 36, // 설명 레이블과 축 사이의 거리
                    legendPosition: 'middle' // 설명 레이블의 위치 설정
                }}

                // Y축(왼쪽)의 속성 설정
                axisLeft={{
                    tickSize: 5, // 눈금의 크기
                    tickPadding: 5, // 눈금과 눈금 레이블 사이의 간격
                    tickRotation: 0, // 눈금 레이블의 회전 각도
                    legend: 'Close Price', // Y축에 표시될 설명 레이블
                    legendOffset: -40, // 설명 레이블과 축 사이의 거리
                    legendPosition: 'middle' // 설명 레이블의 위치 설정
                }}

                // 차트에 사용할 색상 스키마 설정
                colors={{scheme: 'nivo'}}

                // 데이터 포인트(점)의 크기 설정
                pointSize={1}

                // 데이터 포인트의 색상 설정
                pointColor={{theme: 'background'}}

                // 데이터 포인트 테두리의 두께 설정
                pointBorderWidth={2}

                // 데이터 포인트 테두리의 색상 설정
                pointBorderColor={{from: 'serieColor'}}

                // 데이터 포인트 레이블의 Y축 오프셋 설정
                pointLabelYOffset={-12}

                // 마우스 인터랙션을 위한 메시(mesh) 활성화, 이로 인해 데이터 포인트 위에 마우스를 올렸을 때 툴팁이 나타남
                useMesh={true}

                // 범례(legend) 설정
                legends={[
                    {
                        anchor: 'bottom-right', // 범례의 위치 설정
                        direction: 'column', // 범례 항목들이 나열되는 방향
                        justify: false, // 범례 항목의 정렬 설정
                        translateX: 100, // 범례의 X축 이동 거리
                        translateY: 0, // 범례의 Y축 이동 거리
                        itemsSpacing: 0, // 각 범례 항목 간의 간격
                        itemDirection: 'left-to-right', // 범례 항목의 방향 설정
                        itemWidth: 80, // 각 범례 항목의 너비
                        itemHeight: 20, // 각 범례 항목의 높이
                        itemOpacity: 0.75, // 범례 항목의 투명도 설정
                        symbolSize: 12, // 범례 심볼의 크기 설정
                        symbolShape: 'circle', // 범례 심볼의 모양 설정
                        symbolBorderColor: 'rgba(0, 0, 0, .5)', // 범례 심볼의 테두리 색상
                        effects: [
                            {
                                on: 'hover', // 마우스가 범례 항목 위에 있을 때 효과
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)', // 항목 배경 색상
                                    itemOpacity: 1 // 항목의 투명도 설정
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default StockLineChart;

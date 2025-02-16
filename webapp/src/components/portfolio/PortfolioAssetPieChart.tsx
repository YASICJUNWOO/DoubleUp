import React, {useMemo} from 'react';
import {ResponsivePie} from '@nivo/pie';
import {PortfolioStockDetail} from "../../interface/interface";

// PortfolioAssetPieChart 컴포넌트에 전달될 props 타입 정의
interface PortfolioAssetPieChartProps {
    portfolioStocks: PortfolioStockDetail[];
    option: string;
}

const PortfolioAssetPieChart: React.FC<PortfolioAssetPieChartProps> = ({portfolioStocks, option}) => {
    const totalSum = portfolioStocks.reduce((acc, stock) => acc + Number(stock.investmentAmount), 0);
    console.log('totalSum:', totalSum);

// 차트 데이터를 option에 맞게 준비
    const chartData = useMemo(() => {

        let data = [{}];
        if (option === '주식별') {
            data =  portfolioStocks.map(stock => ({
                id: stock.stock.symbol, // 주식 심볼을 고유한 ID로 사용
                label: stock.stock.name,
                value: stock.investmentAmount > 0 ? stock.investmentAmount : 0.1, // 값이 0인 항목을 방지하기 위해 최소값 설정
            }));
        } else if (option === '유형별') {
            const typeMap: { [key: string]: number } = {};

            portfolioStocks.forEach(stock => {
                const type = stock.stock.stockType;
                if (!typeMap[type]) {
                    typeMap[type] = 0;
                }
                typeMap[type] += Number(stock.investmentAmount);
            });

            console.log('typeMap:', typeMap);
            data =  Object.keys(typeMap).map(type => ({
                id: type,
                label: type,
                value: typeMap[type] > 0 ? typeMap[type] : 0.1, // 값이 0인 항목을 방지하기 위해 최소값 설정
            }));
        } else if (option === '시장별') {
            const marketMap: { [key: string]: number } = {};

            portfolioStocks.forEach(stock => {
                const market = stock.stock.market;
                if (!marketMap[market]) {
                    marketMap[market] = 0;
                }
                marketMap[market] += Number(stock.investmentAmount);
            });

            console.log('marketMap:', marketMap);
            data =  Object.keys(marketMap).map(market => ({
                id: market,
                label: market,
                value: marketMap[market] > 0 ? marketMap[market] : 0.1, // 값이 0인 항목을 방지하기 위해 최소값 설정
            }));
        }

        console.log('chartData:', data);
        return data;
    }, [portfolioStocks, option]);

    //=> {
//
//         if (option === '주식별') {
//             return portfolioStocks.map(stock => ({
//                 id: stock.stock.name, // 각 파이 조각의 ID로 사용할 주식 이름
//                 label: stock.stock.name, // 각 파이 조각의 레이블로 사용할 주식 이름
//                 value: stock.totalAmount, // 각 파이 조각의 값으로 사용할 주식의 총 금액
//             }));
//         } else if (option === '유형별') {
//             return portfolioStocks.map(stock => ({
//                 id: stock.stock.market, // 각 파이 조각의 ID로 사용할 주식 시장
//                 label: stock.stock.market, // 각 파이 조각의 레이블로 사용할 주식 시장
//                 value: stock.totalAmount, // 각 파이 조각의 값으로 사용할 주식의 총 금액
//             }));
//         }
//         else if ( option === '시장별') {
//             return portfolioStocks.map(stock => ({
//                 id: stock.stock.market, // 각 파이 조각의 ID로 사용할 주식 시장
//                 label: stock.stock.market, // 각 파이 조각의 레이블로 사용할 주식 시장
//                 value: stock.totalAmount, // 각 파이 조각의 값으로 사용할 주식의 총 금액
//             }));
//         }
//
//     }

    return (
        <div style={{height: '400px'}}>
            <ResponsivePie
                data={chartData} // 파이 차트에 사용할 데이터
                margin={{top: 40, right: 80, bottom: 80, left: 80}} // 차트의 여백 설정
                innerRadius={0.5} // 파이 차트의 내부 반지름 비율 (0.5이면 도넛형 차트)
                padAngle={0.7} // 파이 조각들 사이의 간격(각도) 설정
                cornerRadius={3} // 파이 조각의 코너를 둥글게 만드는 반경
                activeOuterRadiusOffset={8} // 파이 조각이 활성화(클릭/터치)될 때 바깥쪽으로 이동하는 정도
                borderWidth={1} // 파이 조각의 테두리 두께
                borderColor={{from: 'color', modifiers: [['darker', 0.2]]}} // 테두리 색상 설정

                // 커스텀 툴팁: 비율 계산 및 출력
                tooltip={({datum: {id, value, color}}) => {
                    const percentage = ((value / totalSum) * 100).toFixed(2);

                    return (
                        <div
                            style={{
                                padding: 12,
                                color,
                                background: '#222',
                            }}
                        >
                            <strong>{percentage}%</strong>
                        </div>
                    );
                }}

                arcLinkLabelsSkipAngle={0} // 라벨 연결선이 그려지지 않을 최소 각도
                arcLinkLabelsTextColor="#333333" // 라벨 연결선의 텍스트 색상
                arcLinkLabelsThickness={2} // 라벨 연결선의 두께
                arcLinkLabelsColor={{from: 'color'}} // 라벨 연결선의 색상
                arcLabelsSkipAngle={10} // 파이 조각 라벨이 그려지지 않을 최소 각도
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}} // 파이 조각 라벨의 텍스트 색상
                colors={{scheme: 'nivo'}} // 차트 색상 스킴 설정
                legends={[
                    {
                        anchor: 'bottom', // 범례의 위치 (차트 하단)
                        direction: 'row', // 범례 항목이 나열될 방향
                        justify: false, // 범례 항목 정렬 여부
                        translateX: 0, // X축으로의 이동 (여기서는 이동 없음)
                        translateY: 56, // Y축으로의 이동 (범례를 차트 아래로 56px 이동)
                        itemsSpacing: 0, // 각 범례 항목 간의 간격
                        itemWidth: 100, // 범례 항목의 너비
                        itemHeight: 18, // 범례 항목의 높이
                        itemTextColor: '#999', // 범례 항목의 텍스트 색상
                        itemDirection: 'left-to-right', // 범례 항목이 나열될 방향
                        itemOpacity: 1, // 범례 항목의 불투명도
                        symbolSize: 18, // 범례 심볼의 크기 (원형 크기)
                        symbolShape: 'circle', // 범례 심볼의 모양
                        effects: [
                            {
                                on: 'hover', // 마우스 호버 시 적용될 스타일
                                style: {
                                    itemTextColor: '#000', // 호버 시 텍스트 색상
                                },
                            },
                        ],
                    },
                ]}
            />
        </div>
    );
};

export default PortfolioAssetPieChart;

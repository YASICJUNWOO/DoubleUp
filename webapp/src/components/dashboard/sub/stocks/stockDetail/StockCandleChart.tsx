import {CardProps} from 'antd';
// import { TinyColumn } from '@ant-design/charts';
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import React, {useEffect, useRef, useState} from "react";
import {StockPrice} from "../../../../../interface/interface";
import {Card} from "../../../../Card/Card"; // 커스텀 Card 컴포넌트 임포트


interface chartData {
    x: Date;
    y: Array<number | null>; // y는 number | null을 포함할 수 있음
}

interface chartProps {
    series: { data: chartData[] }[];
    options: ApexOptions;
}

const convertStockPricesToChartData = (stockPrices: StockPrice[]): { categories: string[], chartData: chartData[] } => {
    const categories: string[] = [];
    const chartData: chartData[] = stockPrices.map((stockPrice: StockPrice) => {
        // 날짜를 카테고리로 추가
        categories.push(stockPrice.date ? new Date(stockPrice.date).toLocaleDateString() : '');
        return {
            x: stockPrice.date ? new Date(stockPrice.date) : new Date(), // null이 아닐 때만 Date로 변환
            y: [
                stockPrice.openPrice !== null ? stockPrice.openPrice : null,
                stockPrice.highPrice !== null ? stockPrice.highPrice : null,
                stockPrice.lowPrice !== null ? stockPrice.lowPrice : null,
                stockPrice.closePrice !== null ? stockPrice.closePrice : null
            ]
        };
    });
    return {categories, chartData};
};

type Props = {
    data: StockPrice[];
} & CardProps;

// PortfolioStatCard 컴포넌트 정의
export const StockCandleChart: React.FC<Props> = ({data, ...others}) => {

    const chartRef = useRef<ReactApexChart>(null);

    const [chartDataList, setChartDataList] = useState<chartData[]>([]); // 차트 데이터 상태
    const [categories, setCategories] = useState<string[]>([]); // 카테고리 (날짜 목록)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);  // error의 타입을 Error | null로 지정


    useEffect(() => {
        if (!data) return;

        setLoading(true);

        const {categories, chartData} = convertStockPricesToChartData(data);  // 차트 데이터 변환
        setCategories(categories);  // 카테고리 설정
        setChartDataList(chartData);  // 차트 데이터 설정

        setLoading(false);
    }, [data]);

    const chartData: { series: { data: chartData[] }[], options: ApexOptions } = {
        series: [{data: chartDataList}],
        options: {
            chart: {
                type: 'candlestick',
                height: 350,
                width: '100%',
                toolbar: {
                    autoSelected: 'pan',
                    show: true,
                },
                events: {
                    mounted: (chartContext: any, config: any) => {
                        window.dispatchEvent(new Event('resize'));
                    },
                },
            },
            xaxis: {
                type: 'category',  // 카테고리형으로 설정
                tickAmount: 6,  // 라벨이 몇 개 간격으로 표시될지 설정 (6개 라벨을 표시)
                labels: {
                    formatter: function (value: string, timestamp: number) {
                        // 'MM dd' 형식으로 날짜를 표시
                        const date = new Date(value);
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 월은 0부터 시작하므로 +1
                        const day = date.getDate().toString().padStart(2, '0');
                        return `${month} ${day}`;
                    }
                }
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        }
    };

    if (loading) return <Card {...others}>Loading...</Card>;
    if (error) return <Card {...others}>Error: {error.message}</Card>;

    return (
        <ReactApexChart options={chartData.options} series={chartData.series} type="candlestick" height={350}/>
    );
};

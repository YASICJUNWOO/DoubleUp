import {CardProps, Segmented} from 'antd';
// import { TinyColumn } from '@ant-design/charts';
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {useEffect, useRef, useState} from "react";
import {getStockPricesByPeriod} from "../../../../../constants/api";
import {StockPrice} from "../../../../../interface/interface";
import {useStock} from "../../../../../pages/dashboards/sub/stocks/stockDetail";
import {Card} from "../../../../Card/Card"; // 커스텀 Card 컴포넌트 임포트

const chartTypes = [
    {label: '캔들 차트', value: 'candlestick'},
    {label: '라인 차트', value: 'line'},
]

interface chartData {
    x: Date;
    y: Array<number | null>; // y는 number | null을 포함할 수 있음
}

interface chartProps {
    series: { data: chartData[] }[];
    options: ApexOptions;
}

const convertStockPricesToChartData = (stockPrices: StockPrice[]): { categories: string[], data: chartData[] } => {
    const categories: string[] = [];
    const data: chartData[] = stockPrices.map((stockPrice: StockPrice) => {
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
    return { categories, data };
};


// PortfolioStatCard 컴포넌트 정의
export const StockCandleChart = ({...others}: CardProps) => {

    const chartRef = useRef<ReactApexChart>(null);
    const stockWithPrice = useStock();  // useStock 커스텀 훅 사용
    // 차트 유형을 ApexChart에서 허용하는 타입으로 제한
    const [selectedChartType, setSelectedChartType] = useState<"candlestick" | "line">('candlestick');
    const [chartDataList, setChartDataList] = useState<chartData[]>([]); // 차트 데이터 상태
    const [categories, setCategories] = useState<string[]>([]); // 카테고리 (날짜 목록)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);  // error의 타입을 Error | null로 지정

    // 차트 유형 변경 핸들러
    const handleRangeChange = (value: string) => {
        setSelectedChartType(value as "candlestick" | "line");
    };

    useEffect(() => {
        setLoading(true);
        getStockPricesByPeriod({stockId: stockWithPrice.stock.stockId.toString(), periodType: 'DAILY'})
            .then((res) => {
                const { categories, data } = convertStockPricesToChartData(res.data);
                setCategories(categories);  // 카테고리 설정
                setChartDataList(data);  // 차트 데이터 설정
            })
            .catch((err) => {
                setError(err);
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const chartData: { series: { data: chartData[] }[], options: ApexOptions } = {
        series: [{data: chartDataList}],
        options: {
            chart: {
                type: selectedChartType,
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
                    formatter: function(value: string, timestamp: number) {
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
        <Card title="차트"
              extra={
                  <Segmented
                      options={chartTypes} // 차트 유형 옵션
                      value={selectedChartType} // 현재 선택된 차트 유형
                      onChange={handleRangeChange} // 차트 유형 변경 핸들러
                  />
              }
              {...others}>
            <ReactApexChart options={chartData.options} series={chartData.series} type="candlestick" height={350}/>
        </Card>
    );
};

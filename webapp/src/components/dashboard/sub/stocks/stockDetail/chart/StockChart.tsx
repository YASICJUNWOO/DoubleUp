import React, {useEffect, useState} from "react";
import {CardProps, Segmented} from "antd";
import StockLineChart from "../StockLineChart";
import {Card} from "../../../../../Card/Card";
import {getStockPricesByPeriod} from "../../../../../../constants/api";
import {useParams} from "react-router-dom";
import {StockPrice} from "../../../../../../interface/interface";
import {Loader} from "../../../../../Loader/Loader";
import StockCandleChart2 from "./StockCandleChart2";

type Props = {} & CardProps;

const chartTypes = [
    {label: '캔들 차트', value: 'candlestick'},
    {label: '라인 차트', value: 'line'},
]

export const StockChart: React.FC<Props> = ({...others}) => {

    const {stockId} = useParams<{ stockId: string }>();

    // 차트 유형을 ApexChart에서 허용하는 타입으로 제한
    const [selectedChartType, setSelectedChartType] = useState<"candlestick" | "line">('candlestick');

    const [stockPriceList, setStockPriceList] = useState<StockPrice[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);  // error의 타입을 Error | null로 지정

    // =================================== CHART ============================
    // 차트 유형 변경 핸들러
    const handleRangeChange = (value: string) => {
        setSelectedChartType(value as "candlestick" | "line");
    };

    useEffect(() => {
        if (!stockId) return;

        setLoading(true);
        getStockPricesByPeriod({stockId: stockId, periodType: 'DAILY'})
            .then((res) => {
                setStockPriceList(res.data);
            })
            .catch((err) => {
                setError(err);
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [stockId]);

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
            {isLoading || error ? <Loader/> :
                selectedChartType === 'candlestick' ? (
                    <div style={{width:"100%"}}>
                        <StockCandleChart2 data={stockPriceList} />
                    </div>
                ) : (
                    <StockLineChart data={stockPriceList}/>
                )
            }
        </Card>
    )
}
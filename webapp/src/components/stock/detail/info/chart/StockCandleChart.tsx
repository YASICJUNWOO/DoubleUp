import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CandlestickSeries,
    XAxis,
    YAxis,
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY,
    OHLCTooltip,
    lastVisibleItemBasedZoomAnchor,
} from "react-financial-charts";
import {StockPriceData} from "./StockChartTabs";

const StockCandleChart: React.FC<{ stockPriceList: StockPriceData[] }> = ({ stockPriceList }) => {
    const ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date)
    );

    const height = 400;
    const width = 800;
    const margin = { left: 50, right: 50, top: 10, bottom: 30 };

    // 데이터 변환: 필드명을 CandlestickSeries에 맞게 변경
    const transformedData = stockPriceList.map((d) => ({
        ...d,
        open: d.openPrice,
        close: d.closePrice,
        high: d.highPrice,
        low: d.lowPrice,
    }));

    const { data, xScale, xAccessor, displayXAccessor } = ScaleProvider(transformedData);

    const pricesDisplayFormat = format(".2f");
    const dateDisplayFormat = timeFormat("%Y-%m-%d");

    const xExtents = [xAccessor(data[0]), xAccessor(data[data.length - 1])];

    return (
        <ChartCanvas
            height={height}
            width={width}
            margin={margin}
            data={data}
            displayXAccessor={displayXAccessor}
            seriesName="Stock Data"
            xScale={xScale}
            xAccessor={xAccessor}
            xExtents={xExtents}
            zoomAnchor={lastVisibleItemBasedZoomAnchor}
            ratio={window.devicePixelRatio}
        >
            <Chart id={1} yExtents={(d) => [d.high, d.low]}>
                <XAxis />
                <YAxis />
                <CandlestickSeries />
                <MouseCoordinateX displayFormat={dateDisplayFormat} />
                <MouseCoordinateY rectWidth={margin.right} displayFormat={pricesDisplayFormat} />
                <OHLCTooltip origin={[10, 10]} />
            </Chart>
            <CrossHairCursor />
        </ChartCanvas>
    );
};

export default StockCandleChart;

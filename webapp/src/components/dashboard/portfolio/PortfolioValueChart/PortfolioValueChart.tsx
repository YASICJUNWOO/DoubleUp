import React, {CSSProperties, memo, useEffect, useMemo, useState} from "react";
import {Area} from "@ant-design/charts";
import {Card} from "../../../Card/Card";
import {ButtonProps, Flex, Segmented, Space, Tag, Typography} from "antd";
import CountUp from "react-countup";
import {IPortfolioPrice} from "../../../../interface/interface";
import {postPortfolioPriceByDate} from "../../../../constants/api";
import dayjs from "dayjs";
import {formatNumber} from "../../../../util/money";
import {Loading} from "../../shared";
import {useAuth} from "../../../../context/AuthContext";

const POPOVER_BUTTON_PROPS: ButtonProps = {
    type: 'text',
};

const cardStyles: CSSProperties = {
    height: '100%',
};


interface ChartData {
    category: string;
    date: string;
    value: number;
}

const Chart: React.FC<{ data: ChartData[] }> = memo(({data}) => {
    const config = useMemo(() => {
        const targetData = data
            .filter(item => item.date === '2024-10-25')
            .reduce((prev, current) => (prev.value > current.value ? prev : current), {date: '', value: 0});

        const annotations = targetData.date ? [
            {
                type: 'dataMarker',
                position: {date: targetData.date, value: targetData.value},
                style: {fill: '#FF0000'},
                text: {content: '포트폴리오 생성일', offsetY: -15}
            }
        ] : [];

        return {
            data,
            xField: 'date',
            yField: 'value',
            seriesField: 'category',
            color: ['#4CAF50', '#2196F3'],
            isStack: false,
            slider: {start: 0.3, end: 1.0},
            annotations
        };
    }, [data]);

    return <Area {...config} />;
});

interface Props {
    portfolioId: number | null;
}

const convertPortfolioPriceToChartData = (portfolioPrices: IPortfolioPrice[]): ChartData[] => {
    const totalValueList = portfolioPrices.map((portfolioPrice) => ({
        category: '평가 금액',
        date: portfolioPrice.date,
        value: portfolioPrice.valueAmount,
    }));

    const investmentAmountList = portfolioPrices.map((portfolioPrice) => ({
        category: '투자 금액',
        date: portfolioPrice.date,
        value: portfolioPrice.investmentAmount,
    }));

    return [...totalValueList, ...investmentAmountList].sort((a, b) => {
        return dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1;
    });
}

export const PortfolioValueChart: React.FC<Props> = memo(({portfolioId}) => {

    const {member} = useAuth();

    const [portfolioValueData, setPortfolioValueData] = useState<IPortfolioPrice[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPieChartType, setSelectedPieChartType] = useState('day');

    const fetchData = async () => {
        if (portfolioId !== null) {
            setIsLoading(true);
            const response = await postPortfolioPriceByDate({
                portfolioId,
                startDate: '2024-08-01',
                endDate: dayjs().format('YYYY-MM-DD')
            });
            setPortfolioValueData(response.data);
            setChartData(convertPortfolioPriceToChartData(response.data));
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [portfolioId]);

    const calculateCurrentProfit = useMemo((): number => {

        if (portfolioValueData.length === 0) {
            return 0;
        }

        const lastPriceInfo = portfolioValueData[portfolioValueData.length - 1];
        return lastPriceInfo.valueAmount - lastPriceInfo.investmentAmount;
    }, [portfolioValueData]);

    const chartTypes = [
        {label: '일별', value: 'day'},
        {label: '주별', value: 'week'},
        {label: '월별', value: 'month'},
    ]

    return (
        <Card
            title="자산 추이"
            extra={
                <Segmented
                    options={chartTypes} // 차트 유형 옵션
                    value={selectedPieChartType} // 선택된 차트 유형
                    onChange={setSelectedPieChartType} // 차트 유형 변경 시
                />
            }
            style={cardStyles}
        >
            {isLoading ? (
                <Loading/>
            ) : member ? (
                    <Space direction="vertical" style={{display:"flex", alignItems:"center"}}>
                        <Typography.Title level={4} style={{ textAlign: 'center', color: '#1890ff' }}>
                            😊 {member?.name}님! 아직 포트폴리오를 설정하지 않으셨네요!
                        </Typography.Title>
                        <Typography.Paragraph style={{ textAlign: 'center', fontSize: '16px', color: '#595959' }}>
                            지금 포트폴리오를 설정하고 성공을 향해 첫 발을 내딛어보세요!
                        </Typography.Paragraph>
                    </Space>
                ) :
                (
                    <Flex vertical gap="middle">
                        <Space>
                            <Typography.Title level={3} style={{margin: 0}}>
                                ₩ <CountUp end={portfolioValueData[portfolioValueData.length - 1].valueAmount}
                                           duration={1}
                                           separator=","/>
                            </Typography.Title>
                            <div>
                                {calculateCurrentProfit! > 0 ? (
                                    <Tag color="green-inverse">
                                        +{formatNumber(calculateCurrentProfit!)}￦
                                    </Tag>
                                ) : (
                                    <Tag color="red-inverse">
                                        -{formatNumber(calculateCurrentProfit!)}￦
                                    </Tag>
                                )}
                            </div>
                            {/*<Tag color="green-inverse" icon={<ArrowUpOutlined/>}>*/}
                            {/*    8.7%*/}
                            {/*</Tag>*/}
                        </Space>
                        <Chart data={chartData}/>
                    </Flex>
                )}
        </Card>
    );
});

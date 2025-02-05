import React, {useEffect, useState} from "react";
import {ResponsivePie} from "@nivo/pie";
import {green, red} from "@ant-design/colors";
import {Income} from "../../components/dashboard/income/interface";
import {IncomeDetail} from "../../interface/interface";

type Props = {
    incomeData: Income;
}

interface ChartData {
    id: string;
    label: string;
    value: number;
    color: string;
}

export const FinancialPie: React.FC<Props> = ({incomeData}) => {

    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (!incomeData || !incomeData.incomeDetails) return

        const incomeDetails:IncomeDetail[] = incomeData.incomeDetails;

        const transformedChartData = transformData(incomeDetails);
        setChartData(transformedChartData);

    }, [incomeData]);

    const transformData = (incomeDetails: IncomeDetail[]): ChartData[] => {
        const income = incomeDetails.filter((incomeDetail) => incomeDetail.type === 'INCOME');
        const expense = incomeDetails.filter((incomeDetail) => incomeDetail.type === 'EXPENSE');

        const incomeSum = income.reduce((acc, cur) => acc + cur.amount, 0);
        const expenseSum = expense.reduce((acc, cur) => acc + cur.amount, 0);

        return [
            {
                "id": "income",
                "label": "수입",
                "value": incomeSum,
                "color": green[4]
            },
            {
                "id": "expense",
                "label": "지출",
                "value": expenseSum,
                "color": red[4]
            }
        ]
    }

    return incomeData.incomeDetails && incomeData.incomeDetails.length > 0 ?
        <ResponsivePie
            data={chartData}
            margin={{top: 10, right: 20, bottom: 40, left: 20}}
            innerRadius={0.5}
            padAngle={1}
            activeInnerRadiusOffset={5}
            activeOuterRadiusOffset={10}
            colors={({data}) => data.color}
            enableArcLinkLabels={false}
            // arcLinkLabel={e => e.id + " (" + e.value + ")"}
            // arcLinkLabelsSkipAngle={10}
            // arcLinkLabelsTextColor="#333333"
            // arcLinkLabelsThickness={2}
            // arcLinkLabelsColor={{from: 'color'}}
            arcLabel={e => e.label + " (" + e.value + ")"}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 24,
                    translateY: 36,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
        :
        <></>
}
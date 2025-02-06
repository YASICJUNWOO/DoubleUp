import React, {useEffect, useState} from "react";
import {ResponsivePie} from "@nivo/pie";
import {green, red} from "@ant-design/colors";
import {Income} from "../../components/dashboard/income/interface";
import {IncomeDetail} from "../../interface/interface";
import {ALL_CATEGORY} from "../../components/dashboard/ledger/LedgerAddModal";

type Props = {
    type: string;
    incomeData: Income;
}

interface ChartData {
    id: string;
    label: string;
    value: number;
    color: string;
}

export const INCOME_PIE_CHART_TYPE = [
    {
        value: 'INCOME',
        label: '수입 - 지출'
    },
    {
        value: 'INCOME-CATEGORY',
        label: '수입 카테고리'
    },
    {
        value: 'EXPENSE-CATEGORY',
        label: '지출 카테고리'
    }
]

export const FinancialPie: React.FC<Props> = ({type, incomeData}) => {

    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        if (!incomeData || !incomeData.incomeDetails) return

        const incomeDetails:IncomeDetail[] = incomeData.incomeDetails;

        const transformedChartData = transformData(type, incomeDetails);
        setChartData(transformedChartData);

    }, [type, incomeData]);

    const transformData = (type: string, incomeDetails: IncomeDetail[]): ChartData[] => {

        if (type === 'INCOME'){
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
        else if (type.includes('CATEGORY')){
            const incomes = incomeDetails.filter((incomeDetail) => {
                if (type === 'INCOME-CATEGORY'){
                    return incomeDetail.type === 'INCOME';
                }
                return incomeDetail.type === 'EXPENSE';
            });

            const incomeCategoryMap = new Map<string, number>();
            incomes.forEach((incomeDetail) => {
                const amount = incomeCategoryMap.get(incomeDetail.category) || 0;
                incomeCategoryMap.set(incomeDetail.category, amount + incomeDetail.amount);
            })

            return Array.from(incomeCategoryMap.keys()).map((category) => {
                return {
                    id: ALL_CATEGORY[category as keyof typeof ALL_CATEGORY].label,
                    label: ALL_CATEGORY[category as keyof typeof ALL_CATEGORY].label,
                    value: incomeCategoryMap.get(category) || 0,
                    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
                };
            })
        }
        return [];

    }

    return incomeData.incomeDetails && incomeData.incomeDetails.length > 0 ?
        <ResponsivePie
            data={chartData}
            margin={{top: 30, right: 30, bottom: 40, left: 30}}
            innerRadius={0.5}
            padAngle={1}
            activeInnerRadiusOffset={5}
            activeOuterRadiusOffset={10}
            colors={({data}) => data.color}
            // arcLinkLabelsSkipAngle={10}
            // arcLinkLabelsTextColor="#333333"
            // arcLinkLabelsThickness={2}
            // arcLinkLabelsColor={{from: 'color'}}
            arcLabel='value'
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
import React, {useEffect, useState} from "react";
import {ResponsiveSankey} from "@nivo/sankey";
import {Income} from "../../components/dashboard/income/interface";
import {IncomeDetail} from "../../interface/interface";

type Props = {
    incomeData: Income;
}

interface ChartData {
    nodes: {
        id: string;
        nodeColor: string;
    }[];
    links: {
        source: string;
        target: string;
        value: number;
    }[];
}

export const FinancialSankey: React.FC<Props> = ({incomeData}) => {

    const [chartData, setChartData] = useState<ChartData | null>(null);

    useEffect(() => {

        if (!incomeData || !incomeData.incomeDetails) return

        const incomeDetails = incomeData.incomeDetails;

        setChartData(transformData(incomeDetails));

    }, [incomeData]);

    const transformData = (incomeDetails: IncomeDetail[]): ChartData => {
        const income = incomeDetails.filter((incomeDetail) => incomeDetail.type === 'INCOME');
        const expense = incomeDetails.filter((incomeDetail) => incomeDetail.type === 'EXPENSE');

        // 카테고리 별
        const incomeCategoryMap = new Map<string, number>();
        income.forEach((incomeDetail) => {
            const amount = incomeCategoryMap.get(incomeDetail.category) || 0;
            incomeCategoryMap.set(incomeDetail.category, amount + incomeDetail.amount);
        })

        console.log('incomeCategoryMap', incomeCategoryMap);

        const expenseCategoryMap = new Map<string, number>();
        expense.forEach((expenseDetail) => {
            const amount = expenseCategoryMap.get(expenseDetail.category) || 0;
            expenseCategoryMap.set(expenseDetail.category, amount + expenseDetail.amount);
        })

        return {
            "nodes": [
                {
                    "id": "수입",
                    "nodeColor": "hsl(29, 70%, 50%)"
                },
                ...Array.from(incomeCategoryMap.keys()).map((category) => {
                    return {
                        id: category,
                        nodeColor: "hsl(29, 70%, 50%)"
                    };
                }),

                // ======= 지출 ========
                ...Array.from(expenseCategoryMap.keys()).map((category) => {
                    return {
                        id: category,
                        nodeColor: "hsl(29, 70%, 50%)"
                    };
                }),
            ],
            "links": [
                ...Array.from(incomeCategoryMap.keys()).map((category) => {
                    return {
                        source: category,
                        target: "수입",
                        value: incomeCategoryMap.get(category) || 0
                    };
                }),
                ...Array.from(expenseCategoryMap.keys()).map((category) => {
                    return {
                        source: "수입",
                        target: category,
                        value: expenseCategoryMap.get(category) || 0
                    };
                })
            ]
        }
    }

    return chartData && chartData.nodes.length > 0 && chartData.links.length > 0 ?
        <ResponsiveSankey
            data={chartData}
            margin={{top: 20, right: 160, bottom: 40, left: 50}} // 여백 설정
            colors={{scheme: 'category10'}} // 색상 스킴 설정
            nodeOpacity={1} // 노드 불투명도
            nodeHoverOthersOpacity={0.35} // 다른 노드에 마우스 오버 시 불투명도
            nodeThickness={18} // 노드 두께
            nodeSpacing={24} // 노드 간 간격
            nodeInnerPadding={1} // 노드 내부 패딩
            nodeBorderWidth={0} // 노드 테두리 두께
            nodeBorderColor={{
                from: 'color',
                modifiers: [
                    ['darker', 0.8] // 색상 수정기
                ]
            }}
            nodeBorderRadius={5} // 노드 테두리 반경
            linkOpacity={0.5} // 링크 불투명도
            linkHoverOthersOpacity={0.1} // 다른 링크에 마우스 오버 시 불투명도
            linkContract={3} // 링크 수축 정도
            enableLinkGradient={true} // 링크 그라디언트 활성화
            labelPosition="outside" // 레이블 위치
            labelOrientation="horizontal" // 레이블 방향
            labelPadding={8} // 레이블 패딩
            labelTextColor={{
                from: 'color',
                modifiers: [
                    ['darker', 1] // 레이블 텍스트 색상 수정기
                ]
            }}
            legends={[
                {
                    anchor: 'bottom-right', // 레전드 위치
                    direction: 'column', // 레전드 방향
                    translateX: 130, // 레전드 X축 이동
                    itemWidth: 100, // 레전드 항목 너비
                    itemHeight: 14, // 레전드 항목 높이
                    itemDirection: 'right-to-left', // 레전드 항목 방향
                    itemsSpacing: 2, // 레전드 항목 간 간격
                    itemTextColor: '#999', // 레전드 항목 텍스트 색상
                    symbolSize: 14, // 레전드 항목 심볼 크기
                    effects: [
                        {
                            on: 'hover', // 호버 시 효과
                            style: {
                                itemTextColor: '#000' // 호버 시 텍스트 색상
                            }
                        }
                    ]
                }
            ]}
        />
        :
        <></>
}
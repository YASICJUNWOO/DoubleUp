import React, {useState} from "react";
import {ResponsivePie} from "@nivo/pie";
import {green, red} from "@ant-design/colors";

export const FinancialPie: React.FC = () => {

    const initData = [
        {
            "id": "income",
            "label": "수입",
            "value": 144,
            "color": green[4]
        },
        {
            "id": "expense",
            "label": "지출",
            "value": 467,
            "color": red[4]
        }
    ]

    const [data, setData] = useState(initData);

    return (
        <ResponsivePie
            data={data}
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
    );
}
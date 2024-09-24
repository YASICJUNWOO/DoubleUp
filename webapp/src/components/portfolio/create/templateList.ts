import {Template} from "../../../interface/interface";

export const templateList: Template[] = [
    {
        name: "올 웨더",
        rates: [
            { type: "주식", rate: 30 },
            { type: "장기채권", rate: 40 },
            { type: "중기채권", rate: 15 },
            { type: "GLD", rate: 7.5 },
            { type: "DBC", rate: 7.5 },
        ]
    },
    {
        name: "황금 나비",
        rates: [
            { type: "SPY", rate: 25 },
            { type: "TLT", rate: 25 },
            { type: "IEF", rate: 25 },
            { type: "GLD", rate: 12.5 },
            { type: "DBC", rate: 12.5 },
        ]
    },
    {
        name: "6040",
        rates: [
            { type: "SPY", rate: 60 },
            { type: "TLT", rate: 40 },
        ]
    }
];
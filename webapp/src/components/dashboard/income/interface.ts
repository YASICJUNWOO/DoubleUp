import {IncomeDetail} from "../../../interface/interface";

export interface Income {
    id: string;
    yearValue: number;
    monthValue: number;
    income: number;
    expense: number;
    totalIncome: number;

    incomeDetails: IncomeDetail[] | undefined;
}

export interface IncomeAddRequest {
    yearValue: number;
    monthValue: number;
    income: number;
    expense: number;
    totalIncome: number;
}

export type INCOME_RANGE_TYPE = 'YEARLY' | 'MONTHLY';

export interface IIncomeGoal {
    id: string;
    rangeType: INCOME_RANGE_TYPE;
    yearValue: number;
    monthValue: number;
    goalAmount: number;
}

export interface IncomeGoalRequest {
    type: 'INCOME' | 'EXPENSE';
    rangeType: INCOME_RANGE_TYPE;
    yearValue: number;
    monthValue: number | null;
    goalAmount: number;
}
export interface Income {
    id: string;
    year: number;
    month: number;
    income: number;
    expense: number;
    totalIncome: number;
}

export interface IncomeAddRequest {
    year: number;
    month: number;
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
    rangeType: INCOME_RANGE_TYPE;
    yearValue: number;
    monthValue: number | null;
    goalAmount: number;
}
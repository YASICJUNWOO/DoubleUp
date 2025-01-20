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
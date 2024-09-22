export interface IStock {
    id: number;
    symbol: string;
    name: string;
    market: string;
    stockType: string;
}

export interface StockPrice {
    id: number | null;
    stock: IStock;
    date: string | null;
    openPrice: number | null;
    closePrice: number | null;
    highPrice: number | null;
    lowPrice: number | null;
    volume: number | null;
}

export interface IPortfolioStock {
    id: number;
    stock: IStock;
    quantity: number;
    totalAmount: number;
    averagePrice: number;
}

export interface Template {
    name:string,
    rates:{type:string, rate:number}[]
}
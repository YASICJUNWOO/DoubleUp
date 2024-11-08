import {GoalType, InstallFrequencyType} from "./GoalTypes";
import {SectorTypeKey} from "./SectorType";

export interface IStock {
    stockId: number;
    symbol: string;
    name: string;
    market: string;
    stockType: string;
    marketCap: number;
}

export interface IStockWithPresentPrice extends StockPrice {
    currentPrice: number;  // 현재가
    priceChange: number;   // 변동가
    priceChangeRate: number;    // 변동률
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

export interface IPortfolio {
    id: number;
    memberName: string;
    name: string;
    totalInvestmentAmount: number;
    totalCurrentValue: number;
    portfolioStocks: PortfolioStockDetail[];
}

export interface IPortfolioStock {
    id: number;
    stock: IStock;
    quantity: number;
    averagePrice: number;
}

export interface PortfolioStockDetail extends IPortfolioStock {
    investmentAmount: number;
    ratio: number;
    currentPrice: number;
    currentAmount: number;
    profitAndLoss: number;
    profitAndLossRate: number;
}

export interface Template {
    name:string,
    rates:{type:string, rate:number}[]
}

// ================================= NEWS ================================================

export interface INews {
    id: string;
    title: string;
    summary: string;
    imageUrl: string;
    totalContent: string | null;

    source: ISource;
}

export interface ISource {
    code: string;
    name: string;
    faviconUrl: string;
    logoImageUrl: string;
    logoImageUrlDark: string;
}

export interface IPortfolioPrice {
    date: string;
    investmentAmount: number;
    valueAmount: number;
}

// ================================== GOAL ==============================================

export interface IGoal {
    id: number;

    goalName: string;
    goalType: GoalType;

    initialAmount: number;
    goalAmount: number;
    currentAmount: number;

    installmentFrequency: InstallFrequencyType;
    installmentAmount: number;

    startDate: string;
    endDate: string;

    goalDetails: IGoalDetail[];
}

export interface IGoalDetail{
    goalYear: string;
    goalAmount: number;
}

// ================================== STOCK INFO ==============================================
export interface IStockInfo {
    // "stock_id": 905,
    //   "sectorCategory": "MANUFACTURING",
    //   "sectorCode": "032604",
    //   "sectorName": "통신 및 방송 장비 제조업",
    //   "ceo": "한종희",
    //   "address": "경기도 수원시 영통구  삼성로 129 (매탄동) "
    stockId: number;
    sectorCategory: SectorTypeKey;
    sectorCode: string;
    sectorName: string;
    ceo: string;
    address: string;
}

// ================================== AUTH ==============================================

export interface IMember {
    id: number;
    name: string;
    email: string;
}
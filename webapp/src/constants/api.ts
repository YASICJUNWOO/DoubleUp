import axios from "axios";
import {
    DELETE_GOAL,
    DELETE_STOCK_FAVORITE,
    GET_CURRENT_STOCK_PRICE,
    GET_FAVORITE_STOCK_LIST,
    GET_GOAL,
    GET_INCOME_BY_YEAR,
    GET_LEDGERS,
    GET_NEWS_LIST_BY_STOCK,
    GET_PORTFOLIO_DETAIL,
    GET_PORTFOLIO_LIST,
    GET_SIMILAR_STOCK,
    GET_STOCK_DETAIL,
    GET_STOCK_FAVORITE,
    GET_STOCK_INFO,
    GET_STOCK_LIST,
    GET_STOCK_PRICE_BY_PERIOD,
    PATCH_LEDGERS,
    POST_GOAL,
    POST_GOAL_SUB,
    POST_INCOME,
    POST_LEDGERS,
    POST_LOGIN,
    POST_PORTFOLIO,
    POST_PORTFOLIO_PRICE_BY_DATE,
    POST_SIGNUP,
    POST_STOCK_FAVORITE
} from './ApiUrls';

// [[ ===================== GET ===================== ]]
export const getStockDetail = async (pathParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_STOCK_DETAIL, pathParams, {}));
}

export const getPortfolioList = async () => {
    return axios.get(GET_PORTFOLIO_LIST);
}

export const getPortfolioDetail = async (pathParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_PORTFOLIO_DETAIL, pathParams, {}));
}

export const getStockPricesByPeriod = async ( queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_STOCK_PRICE_BY_PERIOD, {}, queryParams));
}

export const getCurrentStockPrice = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_CURRENT_STOCK_PRICE, {}, queryParams));
}

export const getStockFavorite = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_STOCK_FAVORITE, {}, queryParams));
}

export const getNewsListByStock = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_NEWS_LIST_BY_STOCK, {}, queryParams));
}

export const getGoal = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_GOAL, {}, queryParams));
}

// [[ ===================== POST ===================== ]]
export const postPortfolio = async (body: any) => {
    return axios.post(POST_PORTFOLIO, body);
}

export const postStockFavorite = async (body: any) => {
    return axios.post(createUrlWithParams(POST_STOCK_FAVORITE, {}, {}), body);
}

export const postPortfolioPriceByDate = async (body: any) => {
    return axios.post(createUrlWithParams(POST_PORTFOLIO_PRICE_BY_DATE, {}, {}), body);
}

export const postGoal = async (body: any) => {
    return axios.post(createUrlWithParams(POST_GOAL, {}, {}), body);
}

export const postSubGoal = async (body: any) => {
    return axios.post(createUrlWithParams(POST_GOAL_SUB, {}, {}), body);
}

export const postLogin = async (body: any) => {
    const data = new URLSearchParams();
    data.append("email", body.email);
    data.append("password", body.password);
    return axios.post(createUrlWithParams(POST_LOGIN, {}, {}), body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } , withCredentials: true });
}

// [[ ===================== PATCH ===================== ]]
export const patchPortfolio = async (pathParams: { [key: string]: string }, body: any) => {
    return axios.patch(createUrlWithParams(GET_PORTFOLIO_DETAIL, pathParams, {}), body);
}

// [[ ===================== DELETE ===================== ]]
export const deletePortfolio = async (pathParams: { [key: string]: string }) => {
    return axios.delete(createUrlWithParams(GET_PORTFOLIO_DETAIL, pathParams, {}));
}

export const deleteStockFavorite = async (body: any) => {
    return axios.delete(createUrlWithParams(DELETE_STOCK_FAVORITE, {}, {}), {data: body});
}

// 목표 삭제
export const deleteGoal = async (pathParams: { [key: string]: string }) => {
    return axios.delete(createUrlWithParams(DELETE_GOAL, pathParams, {}));
}

//========================= FAVORITE ========================

// GET
// 즐겨찾기 주식 리스트 조회
export const getFavoriteStockList = async ({queryParams}: { queryParams: { [key: string]: string } }) => {
    return axios.get(createUrlWithParams(GET_FAVORITE_STOCK_LIST, {}, queryParams));
}

// ======================== STOCK ========================

// POST
// 시가총액 순으로 주식 리스트 조회
export const getStockListByMarketCap = async (queryParams: { [key: string]: string }) => {
    return axios.post(createUrlWithParams(GET_STOCK_LIST, {}, queryParams));
}

// ======================== STOCK INFO ========================

// GET
// 개별 주식 정보 조회
export const getStockInfo = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_STOCK_INFO, {}, queryParams));
}

// 유사 주식 리스트 조회
export const getSimilarStockList = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_SIMILAR_STOCK, {}, queryParams));
}

// ======================== LEDGERS ========================

// GET
export const getLedgers = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_LEDGERS, {}, queryParams));
}

// POST
export const postLedgers = async (body: any) => {
    return axios.post(createUrlWithParams(POST_LEDGERS, {}, {}), body);
}

// PATCH
export const updateLedgers = async (pathParams: { [key: string]: string }, body: any) => {
    return axios.patch(createUrlWithParams(PATCH_LEDGERS, pathParams, {}), body);
}

// ======================== MEMBER ========================

// POST
export const signUp = async (body: any) => {
    return axios.post(createUrlWithParams(POST_SIGNUP, {}, {}), body);
}

// ======================== Income ========================
// GET
export const getIncomeByYear = async (queryParams: { [key: string]: string }) => {
    return axios.get(createUrlWithParams(GET_INCOME_BY_YEAR, {}, queryParams));
}

// POST
export const addIncome = async (body: any) => {
    return axios.post(createUrlWithParams(POST_INCOME, {}, {}), body);
}


// URL 템플릿을 이용해 동적으로 생성하는 함수
const createUrlWithParams = (url: string, pathParams: { [key: string]: string }, queryParams: { [key: string]: string }) => {
    // Path parameter 대체
    let finalUrl = url.replace(/{{(.*?)}}/g, (match, p1) => {
        return pathParams[p1] || match;  // 매칭되는 변수가 없으면 그대로 반환
    });

    // Query parameter 처리
    const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

    // Query string을 URL에 추가
    if (queryString) {
        finalUrl += `?${queryString}`;
    }

    return finalUrl;
}
import axios from "axios";
import {
    DELETE_STOCK_FAVORITE,
    GET_CURRENT_STOCK_PRICE,
    GET_NEWS_LIST_BY_STOCK,
    GET_PORTFOLIO_DETAIL,
    GET_PORTFOLIO_LIST,
    GET_STOCK_DETAIL,
    GET_STOCK_FAVORITE,
    GET_STOCK_LIST,
    GET_STOCK_PRICE_BY_PERIOD,
    POST_PORTFOLIO,
    POST_PORTFOLIO_PRICE_BY_DATE,
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

// [[ ===================== POST ===================== ]]
export const postPortfolio = async (body: any) => {
    return axios.post(POST_PORTFOLIO, body);
}

export const getStockListByMarketCap = async (queryParams: { [key: string]: string }) => {
    return axios.post(createUrlWithParams(GET_STOCK_LIST, {}, queryParams));
}

export const postStockFavorite = async (body: any) => {
    return axios.post(createUrlWithParams(POST_STOCK_FAVORITE, {}, {}), body);
}

export const postPortfolioPriceByDate = async (body: any) => {
    return axios.post(createUrlWithParams(POST_PORTFOLIO_PRICE_BY_DATE, {}, {}), body);
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
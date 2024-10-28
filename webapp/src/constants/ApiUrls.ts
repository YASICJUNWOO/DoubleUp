export const GET_LOAD_SCHEDULE_LIST: string = '/group/list';

//================= PORTFOLIO =================

// 포트폴리오 리스트
export const GET_PORTFOLIO_LIST: string = '/api/portfolio';

// 포트폴리오 상세
export const GET_PORTFOLIO_DETAIL: string = '/api/portfolio/{{portfolioId}}';

// 포트폴리오 등록
export const POST_PORTFOLIO: string = '/api/portfolio';

// 포트폴리오 수정
export const PATCH_PORTFOLIO: string = '/api/portfolio/{{portfolioId}}';

// 포트폴리오 삭제
export const DELETE_PORTFOLIO: string = '/api/portfolio/{{portfolioId}}';


//================= STOCK =================

// 주식 상세 정보
export const GET_STOCK_DETAIL: string = '/api/stocks/{{stockId}}';

// 시가총액 상위 주식 리스트
export const GET_STOCK_LIST: string = '/api/stocks/marketCap';

// ================= STOCK PRICE =================
// 기간별 주식 가격 조회
export const GET_STOCK_PRICE_BY_PERIOD: string = '/api/stock-prices';

// 현재 주식 가격 조회
export const GET_CURRENT_STOCK_PRICE: string = '/api/stock-prices/now';

// ================= STOCK FAVORITE =================
// 단일 주식 즐겨찾기 조회
export const GET_STOCK_FAVORITE: string = '/api/favorites';

// 즐겨찾기 추가
export const POST_STOCK_FAVORITE: string = '/api/favorites';

// 즐겨찾기 삭제
export const DELETE_STOCK_FAVORITE: string = '/api/favorites';

// ================= NEWS =================

// 종목 뉴스 리스트 조회
export const GET_NEWS_LIST_BY_STOCK: string = '/api/news/stocks';


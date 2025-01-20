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


//================= PORTFOLIO PRICE =================
export const POST_PORTFOLIO_PRICE_BY_DATE: string = '/api/portfolio-price';

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

// ================= STOCK INFO =================
// 주식 정보 조회
export const GET_STOCK_INFO: string = '/api/stock/info';

// 유사 주식 조회
export const GET_SIMILAR_STOCK: string = '/api/stock/info/similar';

// ================= STOCK FAVORITE =================
// 단일 주식 즐겨찾기 조회
export const GET_STOCK_FAVORITE: string = '/api/favorites';

// 즐겨찾기 추가
export const POST_STOCK_FAVORITE: string = '/api/favorites';

// 즐겨찾기 삭제
export const DELETE_STOCK_FAVORITE: string = '/api/favorites';

// 단일 주식 즐겨찾기 조회
export const GET_FAVORITE_STOCK_LIST: string = '/api/favorites/stocks';

// ================= LEDGER =================
// 가계부 조회
export const GET_LEDGERS: string = '/api/ledgers';

// 가계부 저장
export const POST_LEDGERS: string = '/api/ledgers';

// 가계부 수정
export const PATCH_LEDGERS: string = '/api/ledgers/{{ledgerId}}';

// ================= NEWS =================

// 종목 뉴스 리스트 조회
export const GET_NEWS_LIST_BY_STOCK: string = '/api/news/stocks';

// ================= GOAL =================

// 목표 조회
export const GET_GOAL: string = '/api/goal';

// 목표 저장
export const POST_GOAL: string = '/api/goal';

// 서브 목표 저장
export const POST_GOAL_SUB: string = '/api/goal/sub';

// 목표 삭제
export const DELETE_GOAL: string = '/api/goal/{{goalId}}';

// ================= AUTH =================

// 로그인
export const POST_LOGIN: string = '/login';

// 회원가입
export const POST_SIGNUP: string = '/api/member';

// ================= INCOME =================
// 수입/지출 조회
export const GET_INCOME_BY_YEAR = '/api/income';

// 수입/지출 저장
export const POST_INCOME = '/api/income';

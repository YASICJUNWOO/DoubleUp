export const formatMoney = (money: number | string): string => {

    // Return a formatted string of money
    const numericMoney = typeof money === 'string' ? parseInt(money) : money;

    return numericMoney.toLocaleString('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0, // 소수점 이하를 절삭
        minimumFractionDigits: 0  // 소수점 이하 자릿수를 0으로
    });
}

// 억 단위로 변환, 세 자리마다 쉼표 (소수점 제거)
export const formatMarketCap = (marketCap: number): string => {
    return formatNumber(Math.floor(marketCap / 100000000)); // 소수점 제거
}

//세자리 쉼표
export const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
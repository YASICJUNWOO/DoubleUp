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

//억 단위로 변환, 세 자리마다 쉼표
export const formatMarketCap = (marketCap: number): string => {
    return (marketCap / 100000000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
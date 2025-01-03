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
    if (num === undefined || num === null) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 소수 백분율을 퍼센트로 변환
export const formatPercent = (percent: number): string => {
    return (percent * 100).toFixed(1);
}

// 금액을 단위별로 변환하는 함수
export const formatCurrency = (value:any) => {
    if (value === undefined) return '';
    const num = Number(value);
    if (num >= 1_000_000_000_000) { // 1조 단위
        return `${(num / 1_000_000_000_000).toFixed(1)}조`;
    } else if (num >= 100_000_000) { // 1억 단위
        return `${(num / 100_000_000).toFixed(1)}억`;
    } else if (num >= 10_000) { // 100만 단위
        return `${(num / 10_000).toFixed(1)}만원`;
    } else if (num >= 1_000) { // 1천 단위
        return `${(num / 1_000).toFixed(1)} 천원`;
    } else {
        return `${num}원`; // 그 이하
    }
};

// 입력 필드에서 단위를 제거하여 숫자로 변환하는 함수
export const parseCurrency = (value:any) => {
    if (!value) return '';
    return value.replace(/조|억|만원|원/g, '');
};
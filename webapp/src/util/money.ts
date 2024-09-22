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
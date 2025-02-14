export const CURRENCY = {
    WON: '￦',
    DOLLAR: '$',
} as const;

export type CurrencyKey = keyof typeof CURRENCY;
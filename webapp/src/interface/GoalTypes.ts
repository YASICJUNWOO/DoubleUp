export const GoalTypes = {
    PERIOD : 'PERIOD',
    AMOUNT : 'AMOUNT',
} as const;

export const GoalTypeLabel = {
    PERIOD : '기간',
    AMOUNT : '금액',
} as const;

export type GoalType = typeof GoalTypes[keyof typeof GoalTypes];

export const InstallFrequencyTypes = {
    DAY: { type: 'DAY', label: '매일' },
    WEEK: { type: 'WEEK', label: '매주' },
    MONTH: { type: 'MONTH', label: '매월' },
    YEAR: { type: 'YEAR', label: '매년' },
    CUSTOM: { type: 'CUSTOM', label: '사용자정의' },
} as const;

export type InstallFrequencyType = typeof InstallFrequencyTypes[keyof typeof InstallFrequencyTypes]['type'];
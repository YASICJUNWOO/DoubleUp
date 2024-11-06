// utils.tsx
import dayjs from "dayjs";

export const dateFormatYYYYMMDD = (date: Date): string => {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const gapDate = (startDate: string, endDate: string): number => {
    return dayjs(endDate).diff(dayjs(startDate), 'day');
}
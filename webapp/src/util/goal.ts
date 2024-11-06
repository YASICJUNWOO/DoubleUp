import {IGoal} from "../interface/interface";
import {GoalTypes} from "../interface/GoalTypes";
import {gapDate} from "./date";
import dayjs from "dayjs";

export const calculatePercent = (goal: IGoal): number => {
    if (goal.goalType === GoalTypes.PERIOD) {
        const gapDay = gapDate(goal.startDate, goal.endDate);
        const currentDay = gapDate(goal.startDate, dayjs().format('YYYY-MM-DD'));
        return Number((currentDay / gapDay * 100).toFixed(0));
    } else if (goal.goalType === GoalTypes.AMOUNT) {
        return Number((goal.currentAmount / goal.goalAmount * 100).toFixed(0));
    }

    return 0;
};
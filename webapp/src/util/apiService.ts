import axios from "axios";

export const fetchStockList = async (date: string) => {
    try {
        const response = await axios.get('/api/stock-prices/all', {
            params: { date }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stock list:", error);
        throw error;  // 에러를 호출한 함수로 전달
    }
};
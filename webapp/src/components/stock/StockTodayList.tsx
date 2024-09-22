import React, {useEffect, useState} from "react";
import {Table} from "antd";
import {Link} from "react-router-dom";
import axios from "axios";
import {dateFormatYYYYMMDD} from "../../util/date";
import {StockPrice} from "../../interface/interface";
import {fetchStockList} from "../../util/apiService";

/**
 * 주식 정보 목록을 나타내는 컴포넌트
 */

const StockTodayList: React.FC = () => {
    const [stockList, setStockList] = useState<StockPrice[]>([]);

    useEffect(() => {
        const today = new Date();

        const fetchData = async () => {

            try {
                const data = await fetchStockList(dateFormatYYYYMMDD(today));
                console.log("<<<<<<<Stock list>>>>>>", data);
                setStockList(data);
            } catch (error) {
                // 오류가 발생하면 이미 console.error로 에러 로그가 찍힘
            }

        };

        fetchData();
    }, []);

    // 테이블 컬럼 정의
    // 테이블 컬럼 정의
    const columns = [
        {
            title: "Symbol",
            dataIndex: ["stock", "symbol"], // stock 객체 내 symbol 속성 참조
            key: "symbol",
            render: (text: string, record: StockPrice) => (
                <Link to={`/stocks/${record.stock.id}`}>{text || "N/A"}</Link>
            ),
        },
        {
            title: "Name",
            dataIndex: ["stock", "name"], // stock 객체 내 name 속성 참조
            key: "name",
            render: (text: string) => text || "N/A",
        },
        {
            title: "Market",
            dataIndex: ["stock", "market"], // stock 객체 내 market 속성 참조
            key: "market",
            render: (text: string) => text || "N/A",
        },
        {
            title: "시가",
            dataIndex: "openPrice",
            key: "openPrice",
            render: (text: number) => (text !== null && text !== undefined ? text : "N/A"),
        },
        {
            title: "종가",
            dataIndex: "closePrice",
            key: "closePrice",
            render: (text: number) => (text !== null && text !== undefined ? text : "N/A"),
        },
        {
            title: "고가",
            dataIndex: "highPrice",
            key: "highPrice",
            render: (text: number) => (text !== null && text !== undefined ? text : "N/A"),
        },
        {
            title: "저가",
            dataIndex: "lowPrice",
            key: "lowPrice",
            render: (text: number) => (text !== null && text !== undefined ? text : "N/A"),
        },
        {
            title: "구분",
            dataIndex: ["stock", "stockType"], // stock 객체 내 stockType 속성 참조
            key: "stockType",
            render: (text: string) => (text === "COMMON" ? "개별주" : text === "ETF" ? "ETF" : "N/A"),
        },
    ];

    return (
        <div style={{padding: "20px"}}>
            <Table
                columns={columns}
                dataSource={stockList}
                rowKey="id"
                pagination={{pageSize: 10}}
            />
        </div>
    );
}

export default StockTodayList;

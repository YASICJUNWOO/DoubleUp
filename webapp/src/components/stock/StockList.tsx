import React, {useEffect, useRef, useState} from "react";
import {Button, Input, InputRef, Space, Table, TableColumnType, TableProps} from "antd";
import {IStockWithPresentPrice} from "../../interface/interface";
import axios from "axios";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";
import './animation.css';

type DataIndex = keyof IStockWithPresentPrice;

export const StockList: React.FC = () => {

    const [stocks, setStocks] = useState<IStockWithPresentPrice[]>([]);
    const [currentPrices, setCurrentPrices] = useState<Record<string, number>>({});
    const [previousPrices, setPreviousPrices] = useState<Record<string, number>>({});
    const [updatedPrices, setUpdatedPrices] = useState<Record<string, boolean>>({}); // 변경된 주식의 상태를 관리하는 새로운 상태
    const [flashTrigger, setFlashTrigger] = useState<number>(0); // flash 트리거용 상태


    useEffect(() => {
        axios.get('/api/stock-prices/now')
            .then(response => {
                setStocks(response.data);
                // 초기 가격을 저장합니다.
                const initialPrices: Record<string, number> = {};
                response.data.forEach((stock: IStockWithPresentPrice) => {
                    initialPrices[stock.symbol] = stock.currentPrice;
                });

                setCurrentPrices(initialPrices);
                setPreviousPrices(initialPrices);
            })
            .catch(error => {
                console.error(error);
            });

        const interval = setInterval(() => {
            axios.get('/api/stock-prices/now')
                .then(response => {
                    const updatedPrices = response.data.reduce((acc: Record<string, number>, stock: IStockWithPresentPrice) => {
                        acc[stock.symbol] = stock.currentPrice;
                        return acc;
                    }, {});

                    // 변경된 항목에 대해 상태 설정
                    setUpdatedPrices(prevUpdatedPrices => {
                        const updatedState: Record<string, boolean> = {};
                        response.data.forEach((stock: IStockWithPresentPrice) => {
                            updatedState[stock.symbol] = currentPrices[stock.symbol] !== stock.currentPrice; // currentPrices는 외부에서 참조
                        });
                        return updatedState;
                    });

                    setPreviousPrices(currentPrices); // 이전 가격 저장
                    setCurrentPrices(updatedPrices); // 새로운 가격 저장
                    setStocks(response.data); // 주식 데이터 업데이트

                    // flash 트리거를 발생시킵니다.
                    setFlashTrigger(prev => prev + 1);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');

    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IStockWithPresentPrice> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({closeDropdown: false});
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableProps<IStockWithPresentPrice>['columns'] = [
        {
            title: '티커',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: '거래소',
            dataIndex: 'market',
            key: 'market',
            filters: [
                {
                    text: '한국',
                    value: 'korea',
                    children: [
                        {text: '코스피', value: 'KOSPI'},
                        {text: '코스닥', value: 'KOSDAQ'}
                    ]
                },
                {
                    text: '미국',
                    value: 'usa',
                    children: [
                        {text: 'NYSE', value: 'NYSE'},
                        {text: 'NASDAQ', value: 'NASDAQ'}
                    ]
                }
            ],
            onFilter: (value, record) => record.market.indexOf(value as string) === 0
        },
        {
            title: '유형',
            dataIndex: 'stockType',
            key: 'stockType',
            filters: [
                {text: '주식', value: 'COMMON'},
                {text: 'ETF', value: 'ETF'}
            ],
            onFilter: (value, record) => record.stockType.indexOf(value as string) === 0
        },
        {
            title: '현재가',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
            width: '20%',
            render: (currentPrice: number, record) => {
                const changeColor = record.priceChange > 0 ? 'green' : record.priceChange === 0 ? 'grey' : 'red';
                const priceChanged = updatedPrices[record.symbol]; // 변경된 주식인지 확인
                const animationClass = priceChanged ? 'flash' : ''; // 가격이 변경되었을 때만 애니메이션 추가

                return (
                    <div
                        key={flashTrigger} // flashTrigger가 변경될 때마다 리렌더링
                        className={animationClass}
                        style={{ transition: 'background-color 0.5s' }}
                    >
                        <span>{currentPrice?.toLocaleString() ?? "가격 정보 없음"}</span>
                        <br />
                        <span style={{ color: changeColor }}>
                            {record.priceChange?.toLocaleString()} ({record.priceChangeRate}%)
                        </span>
                    </div>
                );
            }
        }
    ];

    return (
        <div>
            <Table
                   dataSource={stocks}
                   columns={columns}
                   rowKey="id"
                   size="small"/>
        </div>
    )
}
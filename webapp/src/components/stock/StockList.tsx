import React, {useEffect, useRef, useState} from "react";
import {Button, Input, InputRef, Space, Table, TableColumnsType, TableColumnType, TableProps} from "antd";
import {IStock} from "../../interface/interface";
import axios from "axios";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {FilterDropdownProps} from "antd/es/table/interface";

type DataIndex = keyof IStock;

export const StockList: React.FC = () => {

    const [stocks, setStocks] = useState<IStock[]>([]);

    useEffect(() => {
        axios.get('/api/stock/all')
            .then(response => {
                setStocks(response.data);
            })
            .catch(error => {
                console.error(error);
            });
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

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<IStock> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
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
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableProps<IStock>['columns'] = [
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
        }
    ];

    return (
        <div>
            <Table dataSource={stocks} columns={columns} rowKey="id"/>
        </div>
    )
}
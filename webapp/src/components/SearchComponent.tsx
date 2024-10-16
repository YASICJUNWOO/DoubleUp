import React, {useEffect, useRef, useState} from 'react';
import {Input, List, Spin} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import axios from 'axios';
import {IStock} from "../interface/interface";
import {useNavigate} from "react-router-dom";

const { Search } = Input;

const SearchComponent: React.FC = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState<IStock[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false); // 검색 모달 열림 상태 관리

    const searchRef = useRef<HTMLDivElement>(null); // 검색창과 모달을 감쌀 ref

    // 검색 함수
    const onSearch = async (value: string) => {
        setSearchQuery(value);
        setLoading(true);
        setIsOpen(true); // 검색 결과 모달 열기
        try {
            const body = {
                keyword: value
            }
            const response = await axios.post(`/api/search/stock`, body);
            console.log(response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        } finally {
            setLoading(false);
        }
    };

    // 검색창 외부 클릭 시 모달 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false); // 외부 클릭 시 모달 닫기
            }
        };

        // 이벤트 리스너 등록
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //======================================SEARCH=========================================
    // 검색 결과 선택 시 호출되는 함수
    const handleSelectStock = (stockId: number) => {
        // 예: 선택된 주식 상세 페이지로 이동
        navigate(`/stocks/${stockId}`);
    };

    return (
        <div ref={searchRef} style={{ position: 'relative', width: '100%' }}>
            <Search
                placeholder="검색어를 입력하세요"
                enterButton={<SearchOutlined />}
                onSearch={onSearch}
                allowClear
                style={{ width: '100%', display: 'flex', alignItems: 'center' }} // 중앙 정렬
            />

            {/* 검색 결과 표시 (검색어가 있을 때만) */}
            {searchQuery && isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '40px',  // 검색창 아래에 위치
                    left: 0,
                    right: 0,
                    background: '#fff',
                    padding: '10px',
                    zIndex: 1000,
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}>
                    {loading ? <Spin /> : (
                        <List
                            itemLayout="horizontal"
                            dataSource={searchResults}
                            renderItem={(item: IStock) => (
                                <List.Item onClick={() => {
                                    handleSelectStock(item.stockId);
                                    setIsOpen(false); // 아이템 클릭 시 모달 닫기
                                }}>
                                    <List.Item.Meta
                                        title={<a href={`/stocks/${item.stockId}`}>{item.name}</a>}
                                        description={`주식 코드: ${item.symbol}`}
                                    />
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;

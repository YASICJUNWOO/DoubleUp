import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, List, message, Modal} from "antd";
import {Link} from "react-router-dom";
import {IPortfolio} from "../../interface/interface";

const PortfolioList: React.FC = () => {

    const [portfolioList, setPortfolioList] = useState<IPortfolio[]>([]);

    useEffect(() => {
        const fetchPortfolioList = async () => {
            axios.get('/api/portfolio')
                .then(response => {
                    setPortfolioList(response.data);
                    console.log("PortfolioDetail list fetched successfully!", response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the portfolio list!", error);
                });
        }

        fetchPortfolioList();
    }, []);

    //===================ALERT FUNCTION===================
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '포트폴리오가 성공적으로 삭제되었습니다.',
        });
    };
    //================================================================

    //===================DELETE FUNCTION===================
    const [selectedPortfolioId, setSelectedPortfolioId] = useState<number | null>(null); // 선택된 포트폴리오 ID
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 삭제 함수의 구현 예시
    const handleDelete = (portfolioId: number) => {
        setSelectedPortfolioId(portfolioId);
        setIsModalOpen(true);
    };

    // 모달에서 확인 버튼을 눌렀을 때 실행되는 함수
    const handleOk = () => {

        const deletePortfolio = async () => {
            axios.delete(`/api/portfolio/${selectedPortfolioId}`)
                .then(response => {
                    console.log("Portfolio deleted successfully!", response);
                    setPortfolioList((prevList) =>
                        prevList.filter((portfolio) => portfolio.id !== selectedPortfolioId)
                    ); // 리스트에서 삭제된 포트폴리오 제거
                    success(); // 삭제 성공 메시지
                })
                .catch(error => {
                    console.error("There was an error deleting the portfolio!", error);
                });
        }

        deletePortfolio();
        setIsModalOpen(false);
    }

    // 모달에서 취소 버튼을 눌렀을 때 실행되는 함수
    const handleCancel = () => {
        setSelectedPortfolioId(null);
        setIsModalOpen(false);
    };
    //================================================================

    return (
        <>
            {contextHolder}
            <div style={{padding: "20px"}}>
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={portfolioList}
                    renderItem={portfolio => (
                        <List.Item>
                            <Link to={`/portfolio/${portfolio.id}`}>
                                <Card
                                    className={'custom-shadow'}
                                    title={portfolio.name}
                                    bordered={true}
                                    extra={(
                                        <Button
                                            type="primary"
                                            danger
                                            onClick={(e) => {
                                                e.stopPropagation(); // 이벤트 전파 중지
                                                e.preventDefault(); // 기본 동작 방지
                                                handleDelete(portfolio.id); // 삭제 함수 호출
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    )}>
                                    <p>Total Amount: {portfolio.totalInvestmentAmount}</p>
                                </Card>
                            </Link>
                        </List.Item>


                    )}
                    locale={{
                        emptyText: '포트폴리오가 없습니다', // 빈 리스트일 때 보여줄 메시지
                    }}
                />
                {/* 삭제 확인 모달 */}
                {isModalOpen && (
                    <Modal
                        title="Basic Modal"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <p>정말 삭제하시겠습니까?</p>
                    </Modal>
                )}
            </div>
        </>
    );
}

export default PortfolioList;
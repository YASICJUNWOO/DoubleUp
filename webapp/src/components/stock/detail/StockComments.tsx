import React, {useEffect, useState} from "react";
import {Avatar, Button, Input, List, message, Typography} from "antd";
import axios from "axios";
import {useAuth} from "../../auth/AuthContext";
import {useStockOld} from "./StockDetail";
import {useNavigate} from "react-router-dom";
import {IMember, IStock} from "../../../interface/interface";
import {LikeOutlined, MessageOutlined} from "@ant-design/icons";
import {useImageErrorHandling} from "../../../util/image-loader";

const {TextArea} = Input;

interface Review {
    reviewId: number;
    member: IMember;
    stock: IStock;
    content: string;
    rating: number;
}

const StockComments: React.FC = () => {

    const {stockId, stock} = useStockOld();
    const {member} = useAuth();

    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({}); // 리뷰 본문 확장 상태

    const fetchComments = async () => {
        axios.get(`/api/review/stock?stockId=${stockId}`)
            .then((response) => {
                console.log("<<<<<<Reviews>>>>>>", response.data);
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                message.error("댓글을 불러오는 데 실패했습니다.");
            });
    }


    useEffect(() => {
        fetchComments();
    }, []);

    const handleAddComment = () => {

        if(!member) {
            message.error("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        const body = {
            stockId: stockId,
            memberId: member?.id,
            content: inputValue,
        };

        const requestReview = async () => {
            try {
                await axios.post('/api/review', body);
                message.success("댓글이 성공적으로 추가되었습니다.");
                setInputValue(""); // 입력 필드 초기화
                fetchComments(); // 댓글을 다시 불러옴
            } catch (error) {
                console.error("Error adding comment:", error);
                message.error("댓글을 추가하는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (inputValue.trim()) {
            setLoading(true); // 로딩 상태 활성화
            requestReview();
        }
    };

    const toggleExpand = (reviewId: number) => {
        setExpanded((prevState) => ({
            ...prevState,
            [reviewId]: !prevState[reviewId],
        }));
    };


    const { getImageSrc, handleImgError } = useImageErrorHandling();

    return (
        <div>
            <TextArea
                autoSize={{minRows: 2, maxRows: 6}}
                value={inputValue}
                onChange={(e:any) => setInputValue(e.target.value)}
                placeholder="의견을 남겨주세요"
            />
            <Button type="primary" onClick={handleAddComment} style={{marginTop: "10px"}} loading={loading}>
                리뷰 남기기
            </Button>
            <div style={{marginTop: "20px", maxHeight: "300px", overflowY: "auto"}}>
                <List
                    header={`${reviews.length} Comments`}
                    itemLayout="horizontal"
                    dataSource={reviews}
                    renderItem={(item) => {
                        const isExpanded = expanded[item.reviewId];
                        const lines = item.content.split('\n'); // 줄바꿈을 기준으로 분리
                        const isLongContent = lines.length > 3; // 기준 줄 수 (여기서는 3줄) 이상이면 긴 콘텐츠로 간주
                        const content = isExpanded || !isLongContent ? item.content : lines.slice(0, 3).join('\n') + '...';

                        return (
                            <div style={{display: "flex", marginBlock: "15px"}}>
                                <Avatar
                                    style={{ marginRight: "10px" }}
                                    src={`https://ui-avatars.com/api/?name=${item.member.name}&background=random&rounded=true`}
                                    onError={() => handleImgError(stock!.symbol)}
                                />
                                <div style={{marginLeft: "10px", flexGrow: 1}}>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <Typography.Text strong>{item.member.name}</Typography.Text>
                                        <Typography.Text
                                            type="secondary">
                                            2시간 전
                                            {/*{moment(item.createdAt).fromNow()}*/}
                                        </Typography.Text>
                                    </div>
                                    <Typography.Text style={{whiteSpace: 'pre-wrap'}}>
                                        {content}
                                    </Typography.Text>
                                    {isLongContent && (
                                        <div style={{ marginTop: '5px' }}> {/* 버튼이 줄바꿈 아래에 오도록 분리 */}
                                            <Button
                                                type="link"
                                                onClick={() => toggleExpand(item.reviewId)}
                                                style={{padding: 0}}
                                            >
                                                {isExpanded ? "접기" : "더보기"}
                                            </Button>
                                        </div>
                                    )}
                                    <div style={{marginTop: "10px"}}>
                                        <Button icon={<LikeOutlined/>} type="text">
                                            좋아요
                                        </Button>
                                        <Button icon={<MessageOutlined/>} type="text">
                                            대댓글
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
};

export default StockComments;

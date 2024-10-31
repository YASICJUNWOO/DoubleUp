import React, {useState} from 'react';
import {Avatar, Button, Col, Input, List, Row, Space, Typography} from 'antd';
import {LikeFilled, LikeOutlined, MessageOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import {gray} from '@ant-design/colors';
import {useStylesContext} from "../../../../../context";

type CommentData = {
    id: number;
    author: string;
    avatar: string;
    content: string;
    likes: number;
    liked: boolean;
    replies?: CommentData[];
    images?: string[];
};

// 하드코딩된 더미 데이터
const initialComments: CommentData[] = [
    {
        id: 1,
        author: 'User1',
        avatar: 'https://via.placeholder.com/40',
        content: '이 주식은 정말 좋은 것 같아요!',
        likes: 10,
        liked: false,
        replies: [
            {
                id: 2,
                author: 'User2',
                avatar: 'https://via.placeholder.com/40',
                content: '저도 동의해요!',
                likes: 5,
                liked: false,
            },
        ],
        images: ['https://picsum.photos/200/300'],
    },
    {
        id: 3,
        author: 'User3',
        avatar: 'https://via.placeholder.com/40',
        content: '조금 더 분석이 필요할 것 같아요.',
        likes: 2,
        liked: true,
        images: [],
    },
];

const Replycontent = ({comment}: { comment: CommentData }) => {

    const stylesContext = useStylesContext();

    return (
        <Space align="start">
            <Avatar src={comment.avatar} alt={comment.author}/>
            <Space direction="vertical" style={{width: "100%"}}>
                <Typography.Text strong>{comment.author}</Typography.Text>
                <Typography.Paragraph style={{margin: 0}}>{comment.content}</Typography.Paragraph>
            </Space>
        </Space>
    );
}

// 댓글 아이템 컴포넌트
const CommentItem = ({comment, onLike}: { comment: CommentData; onLike: (id: number) => void }) => {

    const stylesContext = useStylesContext();

    return (
        <div style={{marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${gray[1]}`}}>
            <Row {...stylesContext?.rowProps}>
                <Col span={2}>
                    <Avatar src={comment.avatar} alt={comment.author}/>
                </Col>
                <Col span={22}>
                    <Row id="comment-user-info" {...stylesContext?.rowProps}>
                        <Typography.Text strong>{comment.author}</Typography.Text>
                    </Row>
                    <Row id="comment-content" {...stylesContext?.rowProps}>
                        <Space direction="vertical" style={{width: "100%"}}>
                            <Typography.Paragraph style={{marginTop: 4}}>{comment.content}</Typography.Paragraph>
                            {comment.images?.map((image, index) => (
                                <img key={index} src={image} alt="attached"
                                     style={{maxWidth: '100px', marginRight: 8}}/>
                            ))}
                            <Space>
                                <Button
                                    type="text"
                                    icon={comment.liked ? <LikeFilled style={{color: 'blue'}}/> : <LikeOutlined/>}
                                    onClick={() => onLike(comment.id)}
                                >
                                    {comment.likes}
                                </Button>
                                <Button type="text" icon={<MessageOutlined/>}>
                                    댓글
                                </Button>
                            </Space>
                            {comment.replies?.map((reply) => (
                                <Replycontent key={reply.id} comment={reply}/>
                            ))}
                        </Space>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export const CommunityCard = () => {
    const [comments, setComments] = useState<CommentData[]>(initialComments);
    const [newComment, setNewComment] = useState<string>('');

    const handleLike = (id: number) => {
        setComments((prevComments) =>
            prevComments.map((comment) =>
                comment.id === id
                    ? {...comment, likes: comment.liked ? comment.likes - 1 : comment.likes + 1, liked: !comment.liked}
                    : comment
            )
        );
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const newCommentData: CommentData = {
                id: comments.length + 1,
                author: 'NewUser',
                avatar: 'https://via.placeholder.com/40',
                content: newComment,
                likes: 0,
                liked: false,
                images: [],
            };
            setComments([...comments, newCommentData]);
            setNewComment('');
        }
    };

    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <Input.TextArea
                rows={3}
                placeholder="의견을 입력하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{marginBottom: 8}}
            />
            <Space style={{display: "flex", justifyContent: 'end'}}>
                <Button icon={<UploadOutlined/>}>사진 첨부</Button>
                <Button type="primary" icon={<PlusOutlined/>} onClick={handleAddComment}>
                    의견 등록
                </Button>
            </Space>

            <List
                dataSource={comments}
                renderItem={(comment) =>
                    <CommentItem key={comment.id} comment={comment} onLike={handleLike}/>
                }
            />
        </Space>
    );
};

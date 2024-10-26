import React, {useState} from 'react';
import {Alert, Button, Col, Form, Input, Row, Typography} from 'antd';
import {MailOutlined} from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

const FindAccount: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = (values: any) => {
        const { email } = values;

        setIsLoading(true);
        setIsError(false);

        axios.post('/api/find-password', { email })
            .then(response => {
                setIsSubmitted(true);
                setIsLoading(false);
                // 성공 시 처리 로직 (예: 알림 표시)
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                setIsError(true);
                setIsLoading(false);
            });
    };

    return (
        <Row justify="center" align="middle" style={{ height: '70vh' }}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    아이디/비밀번호 찾기
                </Title>

                {/* 성공 또는 오류 메시지 */}
                {isSubmitted && (
                    <Alert
                        message="이메일이 전송되었습니다. 메일함을 확인해주세요."
                        type="success"
                        showIcon
                        style={{ marginBottom: '24px', textAlign: 'center' }}
                    />
                )}

                {isError && (
                    <Alert
                        message="오류가 발생했습니다. 다시 시도해주세요."
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px', textAlign: 'center' }}
                    />
                )}

                {/* 이메일 입력 폼 */}
                <Form
                    name="find-form"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    {/* 이메일 입력 필드 */}
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '이메일을 입력해주세요!' },
                            { type: 'email', message: '유효한 이메일 주소를 입력해주세요!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="이메일"
                            size="large"
                            disabled={isSubmitted} // 이메일 전송 후 비활성화
                        />
                    </Form.Item>

                    {/* 제출 버튼 */}
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={isLoading} // 로딩 상태
                            disabled={isSubmitted} // 제출 후 버튼 비활성화
                        >
                            이메일 전송
                        </Button>
                    </Form.Item>
                </Form>

                {/* 로그인 페이지로 돌아가는 링크 */}
                <Row justify="center">
                    <Col>
                        <Button type="link" href="/login">
                            로그인으로 돌아가기
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default FindAccount;

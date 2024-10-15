import React from 'react';
import {Alert, Button, Col, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const { Title } = Typography;

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = React.useState(false);

    // 폼 제출 핸들러
    const onFinish = (values: any) => {
        const { name, email, password } = values;

        const registerRequest = () => {
            const formData = new URLSearchParams();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);

            axios.post('/register', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
                .then(response => {
                    console.log(response);

                    // 회원가입 성공 후 로그인 페이지로 이동
                    navigate('/login');
                })
                .catch(error => {
                    console.log(error);
                    setIsError(true);
                });
        };

        registerRequest();
    };

    return (
        <Row justify="center" align="middle" style={{ height: '70vh' }}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    회원가입
                </Title>
                {isError ? (
                    <Alert
                        message="회원가입에 실패했습니다. 다시 시도해주세요."
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px', textAlign: 'center' }}
                    />
                ) : null}
                <Form
                    name="register-form"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    {/* 이름 입력 필드 */}
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: '이름을 입력해주세요!' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="이름"
                            size="large"
                        />
                    </Form.Item>

                    {/* 이메일 입력 필드 */}
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '이메일을 입력해주세요!' },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="이메일"
                            size="large"
                        />
                    </Form.Item>

                    {/* 비밀번호 입력 필드 */}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="비밀번호"
                            size="large"
                        />
                    </Form.Item>

                    {/* 회원가입 버튼 */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large">
                            회원가입
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Register;

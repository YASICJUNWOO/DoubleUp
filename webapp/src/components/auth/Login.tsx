import React from 'react';
import {Alert, Button, Col, Divider, Form, Input, Row, Typography} from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import axios from "axios";
import {useAuth} from "./AuthContext";
import {Link, useNavigate} from "react-router-dom";

const { Title } = Typography;

const Login: React.FC = () => {

    const {login}  = useAuth();
    const navigate = useNavigate();
    const [isError, setIsError] = React.useState(false);

    // 폼 제출 핸들러
    const onFinish = (values: any) => {

        const { email, password } = values;

        const loginRequest = () => {
            const formData = new URLSearchParams();
            formData.append('email', email);
            formData.append('password', password);

            axios.post('/login', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                withCredentials: true // 인증 쿠키나 세션 사용 시 필요
            })
                .then(response => {
                    console.log(response);

                    // 로그인 성공 시 사용자 정보를 저장하고 메인 페이지로 이동
                    login(response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.log(error);
                    setIsError(true);
                });
        };

        loginRequest();
    };

    return (
        <Row justify="center" align="middle" style={{ height: '70vh' }}>
            <Col xs={24} sm={16} md={12} lg={8}>
                <Title level={2} style={{ textAlign: 'center' }}>
                    로그인
                </Title>
                {isError ? (
                    <Alert
                        message="로그인에 실패했습니다. 다시 시도해주세요."
                        type="error"
                        showIcon
                        style={{ marginBottom: '24px', textAlign: 'center' }}
                    />
                ) : null}
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    layout="vertical"
                    initialValues={{ remember: true }}
                >
                    {/* 이메일 입력 필드 */}
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '이메일을 입력해주세요!' },
                            //{ type: 'email', message: '유효한 이메일 주소를 입력해주세요!' },
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

                    {/* 로그인 버튼 */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block size="large">
                            로그인
                        </Button>
                    </Form.Item>
                </Form>

                {/* 회원가입과 아이디/비밀번호 찾기 */}
                <Row justify="space-between">
                    <Col>
                        <Link
                            to="/register"
                            style={{ color: 'black' }}
                        >회원가입</Link>
                    </Col>
                    <Col>
                        <Link
                            to="/find-password"
                            style={{ color: 'black' }}
                        >아이디/비밀번호 찾기</Link>
                    </Col>
                </Row>


                {/* 소셜 로그인 버튼 구분선 */}
                <Divider>또는</Divider>

                {/* 소셜 로그인 버튼 */}
                <Row justify="center" gutter={[16, 16]}>
                    <Col span={24}>
                        <Button
                            type="default"
                            block
                            size="large"
                            style={{ backgroundColor: '#FEE500', borderColor: '#FEE500' }}
                            href="/oauth2/authorization/kakao"
                        >
                            카카오로 로그인
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Button
                            type="default"
                            block
                            size="large"
                            style={{ backgroundColor: '#03C75A', borderColor: '#03C75A', color: 'white' }}
                            href="/oauth2/authorization/naver"
                        >
                            네이버로 로그인
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Button
                            type="default"
                            block
                            size="large"
                            style={{ backgroundColor: '#DB4437', borderColor: '#DB4437', color: 'white' }}
                            href="/oauth2/authorization/google"
                        >
                            구글로 로그인
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default Login;
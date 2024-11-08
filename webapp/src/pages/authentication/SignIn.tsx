import {Button, Checkbox, Col, Divider, Flex, Form, Input, message, Row, theme, Typography,} from 'antd';
import {FacebookFilled, GoogleOutlined, TwitterOutlined,} from '@ant-design/icons';
import {Logo} from '../../components';
import {useMediaQuery} from 'react-responsive';
import {PATH_AUTH, PATH_DASHBOARD} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {postLogin} from "../../constants/api";
import {IMember} from "../../interface/interface";
import {useAuth} from "../../context/AuthContext";

const {Title, Text, Link} = Typography;

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

export const SignInPage = () => {

    const {login} = useAuth();

        const {
            token: {colorPrimary},
        } = theme.useToken();

        const isMobile = useMediaQuery({maxWidth: 769});
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);


        const onFinish = (values: any) => {
            setLoading(true);

            const body = {
                email: values.email,
                password: values.password
            }

            postLogin(body)
                .then((res) => {

                    const member: IMember = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email
                    };

                    login(member); // context에 저장

                    message.open({
                        type: 'success',
                        content: member.name + ' 님 환영합니다.',
                    });

                    setTimeout(() => {
                        navigate(PATH_DASHBOARD.default);
                    }, 3000);

                })
                .catch((error) => {
                    console.log(error)
                    message.open({
                        type: 'error',
                        content: 'Login failed',
                    });

                })
                .finally(() => {
                    setLoading(false);
                })
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Row style={{minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden'}}>
                <Col xs={24} lg={12}>
                    <Flex
                        vertical
                        align="center"
                        justify="center"
                        className="text-center"
                        style={{background: colorPrimary, height: '100%', padding: '1rem'}}
                    >
                        <Logo color="white"/>
                        <Title level={2} className="text-white">
                            안녕하세요 DoubleUp입니다.
                        </Title>
                        <Text className="text-white" style={{fontSize: 18}}>
                            DoubleUp의 회원이 되어 다양한 자산 관리 서비스를 경험해보세요.
                        </Text>
                    </Flex>
                </Col>
                <Col xs={24} lg={12}>
                    <Flex
                        vertical
                        align={isMobile ? 'center' : 'flex-start'}
                        justify="center"
                        gap="middle"
                        style={{height: '100%', padding: '2rem'}}
                    >
                        <Title className="m-0">Login</Title>
                        <Flex gap={4}>
                            <Text>계정이 없으신가요?</Text>
                            <Link href={PATH_AUTH.signup}>회원가입</Link>
                        </Flex>
                        <Form
                            name="sign-up-form"
                            layout="vertical"
                            labelCol={{span: 24}}
                            wrapperCol={{span: 24}}
                            initialValues={{
                                email: 'admin',
                                password: 'admin',
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            requiredMark={false}
                        >
                            <Row gutter={[8, 0]}>
                                <Col xs={24}>
                                    <Form.Item<FieldType>
                                        label="이메일"
                                        name="email"
                                        rules={[
                                            {required: true, message: 'Please input your email'},
                                        ]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item<FieldType>
                                        label="비밀번호"
                                        name="password"
                                        rules={[
                                            {required: true, message: 'Please input your password!'},
                                        ]}
                                    >
                                        <Input.Password/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item<FieldType> name="remember" valuePropName="checked">
                                        <Checkbox>자동 로그인</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Flex align="center" justify="space-between">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="middle"
                                        loading={loading}
                                    >
                                        로그인
                                    </Button>
                                    <Link href={PATH_AUTH.passwordReset}>ID / 비밀번호 찾기</Link>
                                </Flex>
                            </Form.Item>
                        </Form>
                        <Divider className="m-0">or</Divider>
                        <Flex
                            vertical={isMobile}
                            gap="small"
                            wrap="wrap"
                            style={{width: '100%'}}
                        >
                            <Button icon={<GoogleOutlined/>}>Sign in with Google</Button>
                            <Button icon={<FacebookFilled/>}>Sign in with Facebook</Button>
                            <Button icon={<TwitterOutlined/>}>Sign in with Twitter</Button>
                        </Flex>
                    </Flex>
                </Col>
            </Row>
        );
    }
;

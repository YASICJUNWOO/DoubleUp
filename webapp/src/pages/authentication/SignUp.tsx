import {Button, Checkbox, Col, Divider, Flex, Form, Input, message, Row, theme, Typography,} from 'antd';
import {FacebookFilled, GoogleOutlined, TwitterOutlined,} from '@ant-design/icons';
import {Logo} from '../../components';
import {useMediaQuery} from 'react-responsive';
import {PATH_AUTH, PATH_DASHBOARD} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {signUp} from "../../constants/api";

const {Title, Text, Link} = Typography;

type FieldType = {
    email?: string;
    password?: string;
    name?: string;
    confirmPassword?: string;
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required('이름은 필수 입력 항목입니다.'),
    email: Yup.string()
        //.email('Invalid email')
        .required('이메일은 필수 입력 항목입니다.'),
    password: Yup.string().required('비밀번호는 필수 입력 항목입니다.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
});

export const SignUpPage = () => {
    const {
        token: {colorPrimary},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues: FieldType = {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            const body = {
                email: values.email,
                password: values.password,
                name: values.name,
            }

            signUp(body)
                .then((res) => {
                    message.open({
                        type: 'success',
                        content: '회원가입을 환영합니다!',
                    });

                    setTimeout(() => {
                        navigate(PATH_AUTH.signin);
                    }, 2000);
                })
                .catch((err) => {
                    message.open({
                        type: 'error',
                        content: '회원가입에 실패했습니다.',
                    });
                });
        },
    });

    useEffect(() => {
        console.log("formikChange", formik.values);
    }, [formik.values]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true);

        message.open({
            type: 'success',
            content: 'Account signup successful',
        });

        setTimeout(() => {
            navigate(PATH_DASHBOARD.default);
        }, 5000);
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
                    <Title className="m-0">Create an account</Title>
                    <Flex gap={4}>
                        <Text>Already have an account?</Text>
                        <Link href={PATH_AUTH.signin}>Sign in here</Link>
                    </Flex>
                    <Flex
                        vertical={isMobile}
                        gap="small"
                        wrap="wrap"
                        style={{width: '100%'}}
                    >
                        <Button icon={<GoogleOutlined/>}>Sign up with Google</Button>
                        <Button icon={<FacebookFilled/>}>Sign up with Facebook</Button>
                        <Button icon={<TwitterOutlined/>}>Sign up with Twitter</Button>
                    </Flex>
                    <Divider className="m-0">or</Divider>
                    <Form
                        layout="vertical"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 24}}
                        onFinish={formik.handleSubmit}
                        requiredMark={true}
                    >
                        <Row gutter={[8, 0]}>
                            <Col xs={24}>
                                <Form.Item
                                    label="이름"
                                    validateStatus={formik.errors.name ? 'error' : 'success'}
                                    help={formik.errors.name}
                                >
                                    <Input
                                        onChange={(e) =>
                                            formik.setFieldValue('name', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    label="이메일"
                                    validateStatus={formik.errors.email ? 'error' : 'success'}
                                    help={formik.errors.email}
                                >
                                    <Input
                                        onChange={(e) =>
                                            formik.setFieldValue('email', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    label="비밀번호"
                                    validateStatus={formik.errors.password ? 'error' : 'success'}
                                    help={formik.errors.password}
                                >
                                    <Input.Password
                                        onChange={(e) =>
                                            formik.setFieldValue('password', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    label="비밀번호 확인"
                                    validateStatus={formik.errors.confirmPassword ? 'error' : 'success'}
                                    help={formik.errors.confirmPassword}
                                >
                                    <Input.Password
                                        onChange={(e) =>
                                            formik.setFieldValue('confirmPassword', e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24}>
                                <Form.Item
                                    valuePropName="checked"
                                >
                                    <Flex gap="small">
                                        <Checkbox/>
                                        <Text>DoubleUp의</Text>
                                        <Flex>
                                            <Link>약관</Link>
                                            <Text>에 동의합니다.</Text>
                                        </Flex>
                                    </Flex>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="middle"
                                loading={loading}
                            >
                                회원가입
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Col>
        </Row>
    );
};

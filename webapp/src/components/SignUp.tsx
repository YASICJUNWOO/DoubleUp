import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from "axios";

const SignUp: React.FC = () => {
    const onFinish = (values: any) => {

        const body = {
            name: values.name,
            email: values.email,
            password: values.password,
        }

        axios.post('/api/member', body)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Form
            name="signup"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '0 auto', padding: '2rem' }}
        >
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default SignUp;

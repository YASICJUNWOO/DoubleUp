import React from "react";
import {Button, Flex, Modal, Space, Typography} from "antd";
import {useNavigate} from "react-router-dom";
import {SmileOutlined} from "@ant-design/icons";
import Lottie from 'lottie-react';
import animationData from "./stock.json";

const { Text, Title } = Typography;

interface Props {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const WelcomeAnimation = () => {
    return (
        <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
            style={{ width: 200, height: 200 }}
        />
    );
};
export const RecommendLoginModal: React.FC<Props> = ({
                                                         visible,
                                                         setVisible,
                                                     }) => {
    const navigate = useNavigate();

    return (
        <Modal
            title={
                <Space>
                    <SmileOutlined style={{ color: "#faad14" }} />
                    <Title level={4} style={{ margin: 0 }}>
                        안녕하세요! DoubleUp에 오신 것을 환영합니다.
                    </Title>
                </Space>
            }
            open={visible}
            onCancel={() => {
                setVisible(false);
            }}
            footer={[
                <Button
                    key="cancel"
                    onClick={() => {
                        setVisible(false);
                    }}
                >
                    둘러보기
                </Button>,
                <Button
                    key="login"
                    type="primary"
                    onClick={() => {
                        navigate("/auth/signin");
                    }}
                >
                    로그인
                </Button>,
            ]}
            centered
        >
            <Flex vertical align="center" style={{ gap: 12, marginBottom: 24 }}>
                <WelcomeAnimation />
                <Text>
                    로그인을 하시면 더 많은 기능과 혜택을 이용하실 수 있습니다.
                </Text>
                <Text>
                    지금 로그인하여 개인화된 서비스를 경험해보세요.
                </Text>
            </Flex>
        </Modal>
    );
};

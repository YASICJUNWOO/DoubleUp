import {Button, CardProps, Flex, Image, Typography} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {Card} from '../../../index';
import {useNavigate} from "react-router-dom";

type Props = CardProps;

export const GetStartedCard = ({ ...others }: Props) => {

  const navigateFunction = useNavigate();

  return (
    <Card {...others}>
      <Flex justify="space-between" align="center" gap="middle">
        <Flex vertical gap="large" align="flex-start">
          <Typography.Title level={4} style={{ margin: 0 }}>
            안녕하세요! 👋 Double Up입니다.
          </Typography.Title>
          <Typography.Text>
            목표를 설정하고, 당신의 성장을 기록해보세요
          </Typography.Text>
          <Button type="primary" size="middle" onClick={() => navigateFunction('/dashboards/goal')}>
            목표 생성하기 <RightOutlined />
          </Button>
        </Flex>
        <Image
          src="/get-started.png"
          height={180}
          preview={false}
          style={{ objectFit: 'cover' }}
        />
      </Flex>
    </Card>
  );
};

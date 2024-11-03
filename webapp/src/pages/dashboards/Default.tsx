import React, {useEffect, useRef, useState} from 'react';
import {Card, GetStartedCard, Loader, ProjectsCard,} from '../../components';
import {
    Alert,
    Button,
    CardProps,
    Carousel,
    CarouselProps,
    Col,
    Flex,
    Progress,
    Row,
    Space,
    Tooltip,
    Typography,
} from 'antd';
import {EditOutlined} from '@ant-design/icons';
import {Helmet} from 'react-helmet-async';
import {useStylesContext} from '../../context';
import {useFetchData} from '../../hooks';
import {Projects} from '../../types';
import CountUp from 'react-countup';
import {Liquid} from '@ant-design/plots';
import {IGoal} from "../../interface/interface";
import {getGoal} from "../../constants/api";
import {formatCurrency} from "../../util/money";
import {blue, cyan, green, red, yellow} from "@ant-design/colors";


const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
};

const getProgressColor = (percent: number) => {
    if (percent < 10) return red[5];    // #F5222D
    if (percent < 30) return yellow[5]; // #FAAD14
    if (percent < 50) return blue[5];   // #1890FF
    if (percent < 70) return cyan[5];  // #13C2C2
    if (percent < 90) return yellow[5]; // #FAAD14
    return green[5];                    // #52C41A
};

const ACTIVITY_DATA = [
    {
        day: 'Monday',
        value: 10,
    },
    {
        day: 'Tuesday',
        value: 22,
    },
    {
        day: 'Wednesday',
        value: 25,
    },
    {
        day: 'Thursday',
        value: 26,
    },
    {
        day: 'Friday',
        value: 15,
    },
    {
        day: 'Saturday',
        value: 12,
    },
    {
        day: 'Sunday',
        value: 3,
    },
];

const CAROUSEL_PROPS: CarouselProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
};

const CARD_PROPS: CardProps = {
    style: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
};


const goalList = ['주택 구입', '자동차 구입', '미국 여행'];
const generateRandomString = () => {
    //goalList 배열에서 무작위로 하나의 문자열을 선택
    return goalList[Math.floor(Math.random() * goalList.length)];
};

// Ant Design의 밝은 색상 코드 배열
const colors = ['#69c0ff', '#b37feb', '#5cdbd3', '#95de64', '#ff85c0'];

const DemoLiquid = () => {

    // 컴포넌트가 마운트될 때 랜덤 색상을 선택
    const [brandColor, setBrandColor] = useState('');

    useEffect(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBrandColor(randomColor);
    }, []);

    const config = {
        percent: Math.random(),
        outline: {
            border: 4,
            distance: 8,
        },
        wave: {
            length: 128,
        },
        theme: {
            styleSheet: {
                brandColor: brandColor
            },
        },
        statistic: {
            title: {
                content: generateRandomString(),
            },
        }
    };

return <Liquid {...config} />;
}

export const DefaultDashboardPage = () => {
    const stylesContext = useStylesContext();

    const [income, setIncome] = useState<number>(2_830_000);
    const [expend, setExpend] = useState<number>(980_000);

    const [goal, setGoal] = useState<IGoal>();

    useEffect(() => {
        getGoal({memberId: '1'})
            .then((response) => {
                setGoal(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);


    const sliderRef1 = useRef<any>(null);
    const sliderRef2 = useRef<any>(null);
    const {
        data: projectsData = [],
        error: projectsError,
        loading: projectsLoading,
    } = useFetchData('../mocks/Projects.json');

    return (
        <div>
            <Helmet>
                <title>메인 | DoubleUp</title>
            </Helmet>
            <Row {...stylesContext?.rowProps}>
                <Col xs={24} lg={16}>
                    <Row {...stylesContext?.rowProps}>
                        <Col span={24}>
                            <GetStartedCard/>
                        </Col>
                            <Col xs={24} lg={16}>
                            <Card
                                title="목표 달성률"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                {goal === undefined ? (
                                    <Loader/>
                                ) : (
                                    goal.goalDetails.map((goalDetail) => {
                                        const percent = calculateProgress(goal?.initialAmount, goalDetail.goalAmount);
                                        const color = getProgressColor(percent);

                                        return percent !== undefined && (
                                            <div key={goalDetail.goalYear} style={{marginBottom: '20px'}}>
                                                <Space align="end">
                                                    <Typography.Title level={4} style={{margin: "0px"}}>
                                                        {goalDetail.goalYear}년
                                                    </Typography.Title>
                                                    <Typography.Text>
                                                        {formatCurrency(goalDetail.goalAmount).replace(/\.\d+/, '')}
                                                    </Typography.Text>
                                                </Space>
                                                <Tooltip
                                                    title={`목표 금액: ${goalDetail.goalAmount.toLocaleString()}원, 현재 금액: ${goal?.initialAmount.toLocaleString()}원`}
                                                >
                                                    <Progress
                                                        percent={Number(percent.toFixed(2))}
                                                        strokeColor={color}
                                                        status={percent === 100 ? 'success' : 'active'}
                                                    />
                                                </Tooltip>
                                            </div>
                                        );
                                    })
                                )}
                            </Card>
                        </Col>
                            <Col xs={24} lg={8}>
                                <Row {...stylesContext?.rowProps}>
                                    <Col span={24}>
                                        <Card
                                            title=" 이번달 수입"
                                            extra={<Button icon={<EditOutlined />} />}
                                            bordered={false}
                                        >
                                            <Flex vertical gap="middle">
                                                <Typography.Title level={4} className="m-0">
                                                    + <CountUp end={income} /> 원
                                                </Typography.Title>
                                            </Flex>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Card
                                            title="이번달 지출"
                                            extra={<Button icon={<EditOutlined />} />}
                                            bordered={false}
                                        >
                                            <Flex vertical gap="middle">
                                                <Typography.Title level={4} className="m-0">
                                                    - <CountUp end={expend} /> 원
                                                </Typography.Title>
                                            </Flex>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Card
                                            title="이번달 저축"
                                            extra={<Button icon={<EditOutlined />} />}
                                            bordered={false}
                                        >
                                            <Flex vertical gap="middle">
                                                <Typography.Title level={4} className="m-0">
                                                     <CountUp
                                                         end={income - expend}
                                                         style={{color:green[4]}}
                                                         prefix="+"
                                                         suffix=" "
                                                     />
                                                          원
                                                </Typography.Title>
                                            </Flex>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                        <Col xs={24} lg={24}>
                            <Card
                                title="예비 컴포넌트"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                이번달 수입
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col md={24} lg={8}>
                    <Row {...stylesContext?.rowProps}>
                        <Col span={24}>
                            <Card
                                title="목표 달성률"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                <Carousel
                                    autoplay
                                    autoplaySpeed={3000}
                                >
                                    <DemoLiquid/>
                                    <DemoLiquid/>
                                </Carousel>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Ongoing projects"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                {projectsError ? (
                                    <Alert
                                        message="Error"
                                        description={projectsError.toString()}
                                        type="error"
                                        showIcon
                                    />
                                ) : projectsLoading ? (
                                    <Loader/>
                                ) : (
                                    <Carousel
                                        ref={sliderRef1}
                                        {...stylesContext?.carouselProps}
                                        {...CAROUSEL_PROPS}
                                    >
                                        {projectsData
                                            .filter(
                                                (o: Projects) =>
                                                    o.status.toLowerCase() === 'in progress'
                                            )
                                            .slice(0, 4)
                                            .map((o: Projects) => (
                                                <ProjectsCard
                                                    key={o.project_id}
                                                    project={o}
                                                    size="small"
                                                    style={{margin: `0 8px`}}
                                                />
                                            ))}
                                    </Carousel>
                                )}
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Queued projects"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                {projectsError ? (
                                    <Alert
                                        message="Error"
                                        description={projectsError.toString()}
                                        type="error"
                                        showIcon
                                    />
                                ) : projectsLoading ? (
                                    <Loader/>
                                ) : (
                                    <Carousel
                                        ref={sliderRef2}
                                        {...stylesContext?.carouselProps}
                                        {...CAROUSEL_PROPS}
                                    >
                                        {projectsData
                                            .filter(
                                                (o: Projects) => o.status.toLowerCase() === 'on hold'
                                            )
                                            .slice(0, 4)
                                            .map((o: Projects) => (
                                                <ProjectsCard
                                                    key={o.project_id}
                                                    project={o}
                                                    size="small"
                                                    style={{margin: `0 8px`}}
                                                />
                                            ))}
                                    </Carousel>
                                )}
                            </Card>
                        </Col>
                        <Col span={24}>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

import React, {useState} from 'react';
import {Button, Col, Drawer, MenuProps, Row} from 'antd';
import {Avatar, Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {MenuOutlined, UserOutlined} from '@ant-design/icons';
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const {Header} = Layout;
const {Title} = Typography;

// MenuItem 타입 정의
type MenuItem = Required<MenuProps>['items'][number];

// 메뉴 항목 정의
const items: MenuItem[] = [
        // {
        //     label: <Link to="/">Home</Link>,
        //     key: '1',
        // },
        // {
        //     label: <Link to="/signup">Sign Up</Link>,
        //     key: '2',
        // },
        {
            label: <Link to="/members">MemberList</Link>,
            key: '3',
        },
        {
            label: '주식',
            key: '주식 메뉴',
            children: [
                {
                    label: <Link to="/stocks/rank">주식 스크리너</Link>,
                    key: '주식 스크리너',
                },
                {
                    label: <Link to="/stocks">주식 목록</Link>,
                    key: '주식 목록',
                },
                {
                    label: <Link to="/stocks/today">오늘 시황</Link>,
                    key: '오늘 시황',
                }]
            ,
        },
        {
            label: '포트폴리오',
            key:
                '포트폴라오',
            children: [
                {
                    label: <Link to="/portfolio/create">포트폴리오 생성</Link>,
                    key: '포트폴리오 생성',
                },
                {
                    label: <Link to="/portfolio">포트폴리오 목록</Link>,
                    key: '포트폴리오 목록',
                },
            ],
        }
        ,
    ]
;

const AppHeader: React.FC = () => {

    const screens = useBreakpoint();  // 화면 크기 감지
    const [drawerVisible, setDrawerVisible] = useState(false); // Drawer 열기/닫기 상태 관리

    // Drawer 열기
    const showDrawer = () => {
        setDrawerVisible(true);
    };

    // Drawer 닫기
    const closeDrawer = () => {
        setDrawerVisible(false);
    };


    return (
        <Header style={{padding: '0 20px', background: '#001529'}}>
            <Row align="middle" justify="space-between" style={{width: '100%'}}>
                {/* Left: Logo and Title */}
                <Col lg={4}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar src="/path/to/logo.svg" size="large" alt="Logo"/>
                        <Title level={4} style={{color: 'white', margin: '0 4px', cursor: 'pointer'}}
                               onClick={() => window.location.href = '/'}>
                            Double Up Investment
                        </Title>
                    </div>
                </Col>

                {/* Center: Menu */}
                {/* 큰 화면에서는 Menu 표시 */}
                {screens.md && (
                    <Col span={10}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            items={items}
                            style={{display: 'flex', justifyContent: 'flex-start'}}
                        />
                    </Col>
                )}

                {/* 작은 화면에서는 Drawer로 메뉴 표시 */}
                {!screens.md && (
                    <Col>
                        <Button type="primary" icon={<MenuOutlined />} onClick={showDrawer} />
                    </Col>
                )}

                {/* Right: Avatar */}
                <Col>
                    <Avatar icon={<UserOutlined/>} style={{backgroundColor: '#87d068'}}/>
                </Col>

                {/* 작은 화면에서 Drawer */}
                <Drawer
                    title="메뉴"
                    placement="right"
                    onClose={closeDrawer}
                    width={'50%'}
                    visible={drawerVisible}
                    bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }} // 스크롤 설정
                >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        items={items}
                        style={{ maxHeight: '100%', overflowY: 'auto' }} // Menu에 스크롤 적용
                    />
                </Drawer>
            </Row>
        </Header>
    );
};

export default AppHeader;

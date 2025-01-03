import React, {useState} from 'react';
import {Avatar, Button, Col, Drawer, Layout, Menu, MenuProps, Row, Typography} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import {MenuOutlined} from '@ant-design/icons';
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import {useAuth} from "../context/AuthContext";
import UserMenu from "./auth/UserMenu";
import SearchComponent from "./SearchComponent";

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
        label: '홈',
        key: '홈',
        children: [
            {
                label: <Link to="/play">홈</Link>,
                key: '홈',
            }
        ],
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

    //======================================AUTH===============================================
    const {isAuthenticated, member, logout} = useAuth();
    const navigate = useNavigate();
    //================================================================================


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
            <Row align="middle" justify="space-between">
                {/* Left: Logo and Title */}
                <Col>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar src="/path/to/logo.svg" size="large" alt="Logo"/>
                        <Title level={4} style={{color: 'white', margin: '0 4px', cursor: 'pointer'}}
                               onClick={() => window.location.href = '/'}>
                            Double Up Investment
                        </Title>
                    </div>
                </Col>


                <Col span={8} style={{display: "flex", alignItems: "center"}}>
                    {screens.md && (
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            items={items}
                            style={{minWidth: '50%'}}
                        />
                    )}
                    <div style={{flexGrow: 0, marginLeft: '20px', minWidth: '300px'}}>
                        <SearchComponent/>
                    </div>
                </Col>

                {/* 작은 화면에서는 Drawer로 메뉴 표시 */}
                {!screens.md && (
                    <Col>
                        <Button type="primary" icon={<MenuOutlined/>} onClick={showDrawer}/>
                    </Col>
                )}

                {/* Right: Login/Logout Button */}
                <Col>
                    {member ? (
                        <UserMenu></UserMenu>
                    ) : (
                        <Button type="primary" onClick={() => navigate('/login')}>
                            로그인
                        </Button>
                    )}
                </Col>


                {/* 작은 화면에서 Drawer */}
                <Drawer
                    title="메뉴"
                    placement="right"
                    onClose={closeDrawer}
                    width={'50%'}
                    visible={drawerVisible}
                    bodyStyle={{overflowY: 'auto', maxHeight: 'calc(100vh - 64px)'}} // 스크롤 설정
                >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        items={items}
                        style={{maxHeight: '100%', overflowY: 'auto'}} // Menu에 스크롤 적용
                    />
                </Drawer>

            </Row>
        </Header>
    );
};

export default AppHeader;

import {Button, Dropdown, Flex, FloatButton, Input, Layout, MenuProps, message, theme, Tooltip,} from 'antd';
import {useLocation, useNavigate} from 'react-router-dom';
import {ReactNode, useEffect, useRef, useState} from 'react';
import {
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MessageOutlined,
    QuestionOutlined,
    SettingOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {CSSTransition, SwitchTransition, TransitionGroup,} from 'react-transition-group';
import {useMediaQuery} from 'react-responsive';
import SideNav from './SideNav';
import HeaderNav from './HeaderNav';
import FooterNav from './FooterNav';
import {PATH_AUTH, PATH_USER_PROFILE} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {NProgress} from "../../components/Nprogress";
import {useAuth} from "../../context/AuthContext";
import {RecommendLoginModal} from "../../components/auth/recommendLoginModal";

const {Content} = Layout;

type AppLayoutProps = {
    children: ReactNode;
};

export const AppLayout = ({children}: AppLayoutProps) => {
    const {
        token: {borderRadius},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769});
    const [collapsed, setCollapsed] = useState(true);
    const [navFill, setNavFill] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const nodeRef = useRef(null);
    const floatBtnRef = useRef(null);
    const dispatch = useDispatch();
    const {mytheme} = useSelector((state: RootState) => state.theme);

    const {logout, isAuthenticated, member} = useAuth();
    const [visible, setVisible] = useState(!isAuthenticated);

    const [mobileSiderOpen, setMobileSiderOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: 'user-profile-link',
            label: 'profile',
            icon: <UserOutlined/>,
            onClick: () => {
                navigate(PATH_USER_PROFILE.details)
            },
        },
        {
            key: 'user-settings-link',
            label: 'settings',
            icon: <SettingOutlined/>,
        },
        {
            key: 'user-help-link',
            label: 'help center',
            icon: <QuestionOutlined/>,
        },
        {
            type: 'divider',
        },
        {
            key: 'user-logout-link',
            label: 'logout',
            icon: <LogoutOutlined/>,
            danger: true,
            onClick: () => {
                message.open({
                    type: 'loading',
                    content: 'signing you out',
                });

                logout();

                setTimeout(() => {
                    console.log(`move to ${PATH_AUTH.signin}`)
                    navigate(PATH_AUTH.signin);
                }, 1000);
            },
        },
    ];

    useEffect(() => {
        setCollapsed(isMobile);
    }, [isMobile]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 5) {
                setNavFill(true);
            } else {
                setNavFill(false);
            }
        });
    }, []);

    const handleMobileSider = () => {
        if (collapsed) {
            setMobileSiderOpen(true);
        } else {
            setMobileSiderOpen(false);
        }
    }

    return (
        <>
            <NProgress isAnimating={isLoading} key={location.key}/>
            <Layout
                style={{
                    minHeight: '100vh',
                    // backgroundColor: 'white',
                }}
            >
                <SideNav
                    mobileSiderOpen={mobileSiderOpen}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        overflow: 'auto',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: 'none',
                        border: 'none',
                        transition: 'all .2s',
                    }}
                />
                <Layout
                    style={
                        {
                            // background: 'none',
                        }
                    }
                >
                    <HeaderNav
                        style={{
                            marginLeft: collapsed ? 0 : '200px',
                            padding: '0 2rem 0 0',
                            background: navFill ? 'rgba(255, 255, 255, .5)' : 'none',
                            backdropFilter: navFill ? 'blur(8px)' : 'none',
                            boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            gap: 8,
                            transition: 'all .25s',
                        }}
                    >
                        <Flex align="center">
                            <Button
                                type="text"
                                icon={
                                    collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>
                                }
                                onClick={() => {
                                    isMobile && handleMobileSider();
                                    setCollapsed(!collapsed)
                                }}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <Input.Search
                                placeholder="search"
                                style={{
                                    width: isMobile ? '100%' : '400px',
                                    marginLeft: isMobile ? 0 : '.5rem',
                                }}
                                size="middle"
                            />
                        </Flex>
                        <Flex align="center" gap="small">
                            {/*<Tooltip title="Apps">*/}
                            {/*    <Button icon={<AppstoreOutlined/>} type="text" size="large"/>*/}
                            {/*</Tooltip>*/}
                            <Tooltip title="Messages">
                                <Button icon={<MessageOutlined/>} type="text" size="large"/>
                            </Tooltip>
                            {/*<Tooltip title="Theme">*/}
                            {/*    <Switch*/}
                            {/*        className=" hidden sm:inline py-1"*/}
                            {/*        checkedChildren={<MoonOutlined/>}*/}
                            {/*        unCheckedChildren={<SunOutlined/>}*/}
                            {/*        checked={mytheme === 'light' ? true : false}*/}
                            {/*        onClick={() => dispatch(toggleTheme())}*/}
                            {/*    />*/}
                            {/*</Tooltip>*/}
                            <Dropdown menu={{items}} trigger={['click']}>
                                <Flex>
                                    <img
                                        src={isAuthenticated && member ? `https://ui-avatars.com/api/?name=${member.name}&background=CEF6D8` : "https://ui-avatars.com/api/?name=John+Doe"}
                                        alt="user profile photo"
                                        height={36}
                                        width={36}
                                        style={{borderRadius, objectFit: 'cover'}}
                                    />
                                </Flex>
                            </Dropdown>
                        </Flex>
                    </HeaderNav>
                    <Content
                        style={{
                            margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
                            // background: '#ebedf0',
                            borderRadius: collapsed ? 0 : borderRadius,
                            transition: 'all .25s',
                            padding: '24px 32px',
                            minHeight: 360,
                        }}
                    >
                        <TransitionGroup>
                            <SwitchTransition>
                                <CSSTransition
                                    key={`css-transition-${location.key}`}
                                    nodeRef={nodeRef}
                                    onEnter={() => {
                                        setIsLoading(true);
                                    }}
                                    onEntered={() => {
                                        setIsLoading(false);
                                    }}
                                    timeout={300}
                                    classNames="bottom-to-top"
                                    unmountOnExit
                                >
                                    {() => (
                                        <div ref={nodeRef} style={{background: 'none'}}>
                                            {children}
                                            {!isAuthenticated &&
                                                <RecommendLoginModal visible={visible} setVisible={setVisible}/>}
                                        </div>
                                    )}
                                </CSSTransition>
                            </SwitchTransition>
                        </TransitionGroup>
                        <div ref={floatBtnRef}>
                            <FloatButton.BackTop/>
                        </div>
                    </Content>
                    <FooterNav
                        style={{
                            textAlign: 'center',
                            marginLeft: collapsed ? 0 : '200px',
                            background: 'none',
                        }}
                    />
                </Layout>
            </Layout>
        </>
    );
};

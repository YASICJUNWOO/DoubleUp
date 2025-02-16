import React, {useEffect, useRef, useState} from 'react';
import {ConfigProvider, Layout, Menu, MenuProps, SiderProps} from 'antd';
import {BranchesOutlined, BugOutlined, PieChartOutlined, SecurityScanOutlined,} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import {PATH_AUTH, PATH_DASHBOARD, PATH_ERROR, PATH_LANDING, PATH_SITEMAP,} from '../../constants';
import {COLOR} from '../../App';
import {Logo} from "../../components";
import {useMediaQuery} from "react-responsive";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
};

const items: MenuProps['items'] = [
    getItem('대시보드', 'dashboards', <PieChartOutlined/>, [
        getItem(<Link to={PATH_DASHBOARD.default}>메인</Link>, 'default', null),
        getItem(
            <Link to={PATH_DASHBOARD.income}>수입</Link>,
            'income',
            null
        ),
        getItem(
            <Link to={PATH_DASHBOARD.stocks}>주식</Link>,
            'stocks',
            null
        ),
        getItem(
            <Link to={PATH_DASHBOARD.financeLedger}>가계부</Link>,
            'financeLedger',
            null
        ),
        getItem(
            <Link to={PATH_DASHBOARD.portfolio}>포트폴리오</Link>,
            'portfolio',
            null
        ),
        getItem(
            <Link to={PATH_DASHBOARD.goalList}>목표 목록</Link>,
            'goals',
            null
        ),
        getItem(
            <Link to={PATH_DASHBOARD.goal}>목표 관리</Link>,
            'goal',
            null
        ),
    ]),
    getItem(
        <Link to={PATH_SITEMAP.root}>사이트맵</Link>,
        'sitemap',
        <BranchesOutlined/>
    ),

    getItem('인증 관리', 'authentication', <SecurityScanOutlined/>, [
        getItem(<Link to={PATH_AUTH.signin}>Sign In</Link>, 'auth-signin', null),
        getItem(<Link to={PATH_AUTH.signup}>Sign Up</Link>, 'auth-signup', null),
        getItem(<Link to={PATH_AUTH.welcome}>Welcome</Link>, 'auth-welcome', null),
        getItem(
            <Link to={PATH_AUTH.verifyEmail}>Verify email</Link>,
            'auth-verify',
            null
        ),
        getItem(
            <Link to={PATH_AUTH.passwordReset}>Password reset</Link>,
            'auth-password-reset',
            null
        ),
        // getItem(<Link to={PATH_AUTH.passwordConfirm}>Passsword confirmation</Link>, 'auth-password-confirmation', null),
        getItem(
            <Link to={PATH_AUTH.accountDelete}>Account deleted</Link>,
            'auth-account-deactivation',
            null
        ),
    ]),

    getItem('오류', 'errors', <BugOutlined/>, [
        getItem(<Link to={PATH_ERROR.error400}>400</Link>, '400', null),
        getItem(<Link to={PATH_ERROR.error403}>403</Link>, '403', null),
        getItem(<Link to={PATH_ERROR.error404}>404</Link>, '404', null),
        getItem(<Link to={PATH_ERROR.error500}>500</Link>, '500', null),
        getItem(<Link to={PATH_ERROR.error503}>503</Link>, '503', null),
    ]),
];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = {
    mobileSiderOpen: boolean;
} & SiderProps

const SideNav = ({mobileSiderOpen, ...others}: SideNavProps) => {
    const isMobile = useMediaQuery({ maxWidth: 769 });

    const nodeRef = useRef(null);
    const {pathname} = useLocation();
    const [openKeys, setOpenKeys] = useState(['']);
    const [current, setCurrent] = useState('');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    useEffect(() => {
        const paths = pathname.split('/');
        setOpenKeys(paths);
        setCurrent(paths[paths.length - 1]);
    }, [pathname]);

    useEffect(() => {
        if (isMobile) {
            if (mobileSiderOpen) {
                const paths = pathname.split('/');
                setOpenKeys(paths);
                setCurrent(paths[paths.length - 1]);
            }
            else{
                setOpenKeys(['']);
                setCurrent('');
            }
        }
    }, [mobileSiderOpen,pathname]);

    return (
        <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
            <Logo
                color="black"
                asLink
                href={PATH_LANDING.root}
                justify="center"
                gap="small"
                imgSize={{h: 36, w: 36}}
                style={{padding: '1rem 0'}}
            />
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemBg: 'none',
                            itemSelectedBg: COLOR['100'],
                            itemHoverBg: COLOR['50'],
                            itemSelectedColor: COLOR['600'],
                        },
                    },
                }}
            >
                <Menu
                    mode="inline"
                    items={items}
                    onClick={onClick}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={[current]}
                    style={{border: 'none'}}
                />
            </ConfigProvider>
        </Sider>
    );
};

export default SideNav;

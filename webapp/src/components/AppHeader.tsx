import React from 'react';
import type {MenuProps} from 'antd';
import {Avatar, Layout, Menu, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {UserOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {Title} = Typography;

// MenuItem 타입 정의
type MenuItem = Required<MenuProps>['items'][number];

// 메뉴 항목 정의
const items: MenuItem[] = [
        {
            label: <Link to="/">Home</Link>,
            key: '1',
        },
        {
            label: <Link to="/signup">Sign Up</Link>,
            key: '2',
        },
        {
            label: <Link to="/members">MemberList</Link>,
            key: '3',
        },
        {
            label: '주식',
            key: '주식 메뉴',
            children: [
                {
                    label: <Link to="/stocks">전체 주식</Link>,
                    key: '4',
                }]
            ,
        },
        {
            label: <Link to="/portfolio">Portfolio</Link>,
            key:
                '5',
        }
        ,
    ]
;

const AppHeader: React.FC = () => {
    return (
        <Header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar src="/path/to/logo.svg" size="large" alt="Logo"/>
                <Title level={4} style={{color: 'white', margin: '0 4px'}} onClick={() => window.location.href = '/'}>
                    Double Up Investment
                </Title>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items}
                  style={{flex: 1, justifyContent: 'center'}}/>
            <Avatar icon={<UserOutlined/>} style={{backgroundColor: '#87d068'}}/>
        </Header>
    );
};

export default AppHeader;

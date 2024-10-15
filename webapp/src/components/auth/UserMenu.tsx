import {Button, Dropdown} from 'antd';
import {DownOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext'; // assuming useAuth provides member and logout

const UserMenu: React.FC = () => {
    const { member, logout } = useAuth();
    const navigate = useNavigate();

    const handleMenuClick = (key: string) => {
        if (key === 'profile') {
            navigate('/profile'); // '내 정보' 페이지로 이동
        } else if (key === 'logout') {
            logout(); // 로그아웃 실행
        }
    };

    const menuItems = [
        {
            label: '내 정보',
            key: 'profile',
            icon: <UserOutlined />,
        },
        {
            label: '로그아웃',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <Dropdown
            menu={{
                items: menuItems,
                onClick: ({ key }) => handleMenuClick(key),
            }}
            trigger={['click']}
        >
            <Button type="primary">
                {member?.name} <DownOutlined />  {/* 사용자 이름 표시 */}
            </Button>
        </Dropdown>
    );
};

export default UserMenu;

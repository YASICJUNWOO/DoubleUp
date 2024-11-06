import {AppLayout} from '../app';
import {Col, ConfigProvider, Descriptions, Image, Row, Tabs, TabsProps, theme, Typography,} from 'antd';
import {Card} from '../../components';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {USER_PROFILE_ITEMS} from '../../constants';
import {useStylesContext} from '../../context';
import './styles.css';
import {useEffect, useState} from 'react';
import {useAuth} from "../../context/AuthContext";
import {IMember} from "../../interface/interface";

const {Link} = Typography;

const getDescriptionItems = (member:IMember) => [
    {
        key: 'full-name',
        label: 'Name',
        children: <span>{member.name}</span>,
    },
    {
        key: 'job-title',
        label: 'Job title',
        children: <span>임시이이이이이이</span>,
    },
    {
        key: 'email',
        label: 'Email',
        children: (
            <Link href="mailto:kelvin.kiprop96@gmail.com">
                {member.email}
            </Link>
        ),
    },
    {
        key: 'telephone',
        label: 'Phone',
        children: <Link href="tel:+254706094433">임시이이이이이이</Link>,
    },
    {
        key: 'github',
        label: 'Github',
        children: (
            <Link href="https://github.com/kelvink96" target="_blank">
                kelvink96
            </Link>
        ),
    },
];

const TAB_ITEMS: TabsProps['items'] = USER_PROFILE_ITEMS.map((u) => ({
    key: u.title,
    label: u.title,
}));

export const UserAccountLayout = () => {

    const {member, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && member === null) {
            console.log('User not authenticated');
            navigate('/auth/signin');
        }
    }, [isAuthenticated, member, navigate]);

    const {
        token: {borderRadius},
    } = theme.useToken();

    const stylesContext = useStylesContext();
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

    const onChange = (key: string) => {
        navigate(key);
    };

    useEffect(() => {
        console.log(location);
        const k =
            TAB_ITEMS.find((d) => location.pathname.includes(d.key))?.key || '';

        console.log(k);
        setActiveKey(k);
    }, [location]);


    return (
        <>
            <AppLayout>
                <Card
                    className="user-profile-card-nav card"
                    actions={[
                        <ConfigProvider
                            theme={{
                                components: {
                                    Tabs: {
                                        colorBorderSecondary: 'none',
                                    },
                                },
                            }}
                        >
                            <Tabs
                                defaultActiveKey={activeKey}
                                activeKey={activeKey}
                                items={TAB_ITEMS}
                                onChange={onChange}
                                style={{textTransform: 'capitalize'}}
                            />
                        </ConfigProvider>,
                    ]}
                >
                    <Row {...stylesContext?.rowProps}>
                        {member && (
                            <>
                                <Col xs={24} sm={8} lg={4}>
                                    <Image
                                        src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                                        alt="user profile image"
                                        height="100%"
                                        width="100%"
                                        style={{ borderRadius }}
                                    />
                                </Col>
                                <Col xs={24} sm={16} lg={20}>
                                    <Descriptions
                                        title="User Info"
                                        items={getDescriptionItems(member)}
                                        column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                                    />
                                </Col>
                            </>
                        )}
                    </Row>
                </Card>
                <div style={{marginTop: '1.5rem'}}>
                    <Outlet/>
                </div>
            </AppLayout>
        </>
    );
};

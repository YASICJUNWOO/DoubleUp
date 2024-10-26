import {Button, Drawer, Flex, FloatButton, Layout, theme, Tooltip,} from 'antd';
import {CSSTransition, SwitchTransition, TransitionGroup,} from 'react-transition-group';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {
    AppstoreAddOutlined,
    GithubOutlined,
    LoginOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
} from '@ant-design/icons';
import {useMediaQuery} from 'react-responsive';

import {PATH_AUTH, PATH_DASHBOARD, PATH_DOCS, PATH_GITHUB, PATH_LANDING,} from '../../constants';
import {NProgress} from "../../components/Nprogress";
import {Logo} from "../../components/Logo/Logo"; // 로고와 진행률 표시 컴포넌트

const { Header, Content, Footer } = Layout;  // Ant Design Layout에서 제공하는 컴포넌트 분리

export const GuestLayout = () => {
  // theme에서 borderRadius 토큰을 가져옴
  const {
    token: { borderRadius },
  } = theme.useToken();

  // 769px 이하 화면 크기를 모바일로 간주
  const isMobile = useMediaQuery({ maxWidth: 769 });

  // 페이지 전환 시 로딩 상태를 관리
  const [isLoading, setIsLoading] = useState(false);

  // 현재 경로를 가져옴 (페이지 전환 시 사용)
  const location = useLocation();

  // 페이지 전환 애니메이션을 위한 참조 생성
  const nodeRef = useRef(null);

  // 스크롤에 따라 헤더의 배경색 변화를 위한 상태 관리
  const [navFill, setNavFill] = useState(false);

  // 모바일 메뉴 Drawer 열기 상태 관리
  const [open, setOpen] = useState(false);

  // Drawer 열기 함수
  const showDrawer = () => {
    setOpen(true);
  };

  // Drawer 닫기 함수
  const onClose = () => {
    setOpen(false);
  };

  // 스크롤 이벤트를 감지하여 헤더 스타일 변화
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {  // 스크롤이 50px 이상일 때
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
      <>
        {/* 페이지 전환 중 로딩 애니메이션 표시 */}
        <NProgress isAnimating={isLoading} key={location.key} />
        <Layout
            className="layout"
            style={{
              minHeight: '100vh',  // 화면 전체 높이를 차지하게 설정
            }}
        >
          {/* 헤더 영역 */}
          <Header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',  // 헤더 안의 요소들을 양 끝으로 정렬
                backdropFilter: navFill ? 'blur(8px)' : 'none',  // 스크롤 시 헤더에 블러 효과 추가
                boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',  // 스크롤 시 그림자 효과 추가
                gap: 12,  // 헤더 안의 요소들 간의 간격
                position: 'sticky',  // 스크롤 시에도 헤더가 상단에 고정
                top: 0,  // 상단에 위치
                padding: isMobile ? '0 1rem' : '0 2rem',  // 모바일에서는 더 작은 패딩을 적용
                zIndex: 1,  // 다른 요소보다 위에 표시되도록 설정
              }}
          >
            {/* 로고 컴포넌트 */}
            <Logo color="blue" asLink href={PATH_LANDING.root} />

            {/* 데스크탑에서는 링크 버튼을 표시, 모바일에서는 Drawer를 표시 */}
            {!isMobile ? (
                <>
                  <Flex gap="small">  {/* Flex 컴포넌트로 버튼들을 가로 정렬 */}
                    <Link to={PATH_DOCS.productRoadmap} target="_blank">
                      <Button icon={<ProductOutlined />} type="link">
                        Product Roadmap
                      </Button>
                    </Link>
                    <Link to={PATH_DOCS.components} target="_blank">
                      <Button icon={<AppstoreAddOutlined />} type="link">
                        Components
                      </Button>
                    </Link>
                    <Link to={PATH_GITHUB.repo} target="_blank">
                      <Button icon={<GithubOutlined />} type="link">
                        Give us a star
                      </Button>
                    </Link>
                    <Link to={PATH_AUTH.signin}>
                      <Button icon={<LoginOutlined />} type="primary">
                        Live Preview
                      </Button>
                    </Link>
                  </Flex>
                </>
            ) : (
                // 모바일에서는 메뉴 버튼을 표시하여 Drawer 열기
                <Tooltip title={`${open ? 'Expand' : 'Collapse'} Sidebar`}>
                  <Button
                      type="text"
                      icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      onClick={showDrawer}
                      style={{
                        fontSize: '16px',
                        width: 48,
                        height: 48,
                      }}
                  />
                </Tooltip>
            )}
          </Header>

          {/* 컨텐츠 영역 */}
          <Content
              style={{
                borderRadius,  // 테두리 둥글게
                transition: 'all .25s',  // 부드러운 전환 애니메이션
                paddingBottom: '10rem',  // 하단 여백 추가
              }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                    key={`css-transition-${location.key}`}  // 페이지 전환 시 키값으로 구분
                    nodeRef={nodeRef}  // 애니메이션이 적용될 DOM 노드
                    onEnter={() => {
                      setIsLoading(true);  // 페이지 전환 시 로딩 상태 설정
                    }}
                    onEntered={() => {
                      setIsLoading(false);  // 전환 완료 시 로딩 상태 해제
                    }}
                    timeout={300}  // 애니메이션 지속 시간
                    classNames="page"  // CSS 클래스 이름
                    unmountOnExit  // 컴포넌트 언마운트 시 DOM에서 제거
                >
                  {() => (
                      <div
                          ref={nodeRef}
                          className="site-layout-content"
                          style={{ background: 'none' }}
                      >
                        <Outlet />  {/* 자식 경로의 컴포넌트가 여기 렌더링 */}
                      </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <FloatButton.BackTop />  {/* 페이지 맨 위로 스크롤하는 버튼 */}
          </Content>

          {/* 푸터 영역 */}
          <Footer
              style={{
                textAlign: 'center',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',  // 푸터 배경색 설정
              }}
          >
            AntD Dashboard &copy; {new Date().getFullYear()} Created by Design
            Sparx
          </Footer>
        </Layout>

        {/* 모바일 메뉴 Drawer */}
        <Drawer title="Menu" placement="left" onClose={onClose} open={open}>
          <>
            <Flex gap="small" vertical>  {/* 메뉴 항목들을 세로 정렬 */}
              <Link to={PATH_DOCS.productRoadmap} target="_blank">
                <Button icon={<ProductOutlined />} type="link">
                  Roadmap
                </Button>
              </Link>
              <Link to={PATH_DASHBOARD.default}>
                <Button icon={<LoginOutlined />} type="text">
                  Live Preview
                </Button>
              </Link>
              <Link to={PATH_DOCS.components} target="_blank">
                <Button icon={<AppstoreAddOutlined />} type="text">
                  Components
                </Button>
              </Link>
              <Link to={PATH_GITHUB.repo} target="_blank">
                <Button icon={<GithubOutlined />} type="text">
                  Github
                </Button>
              </Link>
            </Flex>
          </>
        </Drawer>
      </>
  );
};

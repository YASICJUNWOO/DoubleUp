// ScrollToTop 컴포넌트는 페이지 이동 시 스크롤을 상단으로 이동시키는 역할을 합니다.
import React, {ReactNode, useEffect} from "react";
import {createBrowserRouter, Navigate, useLocation} from "react-router-dom";
import {ErrorPage} from "../pages/errors/Error";
import {DashboardLayout} from "../layouts/dashboards";
import {StocksDashboardPage} from "../pages/dashboards/Stocks";
import {
    EcommerceDashboardPage,
    FinancialLedger,
    GoalList,
    LearningDashboardPage,
    MarketingDashboardPage,
    PortfolioDashboardPage,
    ProjectsDashboardPage,
    Test
} from "../pages";
import {StockDetailPage} from "../pages/dashboards/sub";
import {GoalSetup} from "../pages/dashboards/Goal";
import {DefaultDashboardPage} from "../pages/dashboards/Default";
import {
    AccountDeactivePage,
    PasswordResetPage,
    SignInPage,
    SignUpPage,
    VerifyEmailPage,
    WelcomePage
} from "../pages/authentication";
import {UserAccountLayout} from "../layouts";
import {UserProfileDetailsPage} from "../pages/userAccount";

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();  // 현재 경로 정보를 가져옴.

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',  // 부드럽게 스크롤 이동.
    });
  }, [pathname]);  // 경로가 변경될 때마다 실행.

  return null;  // 렌더링되는 UI는 없고 스크롤만 처리.
};

type PageProps = {
  children: ReactNode;
};

// PageWrapper는 ScrollToTop을 적용한 페이지 래퍼입니다.
const PageWrapper = ({ children }: PageProps) => {
  // 스크롤 복구 기능 적용.
  return (
      <>
        <ScrollToTop />
        {children}
      </>
  );
  // 실제 페이지 컨텐츠.
};

// 라우터 설정.
const router = createBrowserRouter([
  {
    path: '/',  // 루트 경로
    element: <Navigate to="/dashboards/default" />,  // 루트 경로에서 /dashboards로 리다이렉트
  },
  {
    path: '/dashboards',  // '/dashboards' 경로.
    element: <PageWrapper children={<DashboardLayout />} />,  // DashboardLayout 레이아웃 사용.
    errorElement: <ErrorPage />,  // 에러가 발생하면 ErrorPage를 렌더링.
    children: [
      {
        index: true,
        path: 'default',  // '/dashboards/default' 경로일 때.
        element: <DefaultDashboardPage />
      },
      {
        path: 'projects',  // '/dashboards/projects' 경로일 때.
        element: <ProjectsDashboardPage />,  // 프로젝트 대시보드 페이지.
      },
      // 다른 대시보드 경로들.
      {
        path: 'finance-ledger',
        element: <FinancialLedger />
      },
      {
        path: 'ecommerce',
        element: <EcommerceDashboardPage />,
      },
      {
        path: 'marketing',
        element: <MarketingDashboardPage />,
      },
      {
        path: 'stocks',
        element: <StocksDashboardPage />,
      },
      {
        path: 'stocks/detail/:stockId',
        element: <StockDetailPage />,
      },
      {
        path: 'portfolio',
        element: <PortfolioDashboardPage />,
      },
      {
        path: 'goal',
        element: <GoalSetup />,
      },
      {
        path: 'goals',
        element: <GoalList />,
      },
  //     {
  //       path: 'social',
  //       element: <SocialDashboardPage />,
  //     },
  //     {
  //       path: 'bidding',
  //       element: <BiddingDashboardPage />,
  //     },
      {
        path: 'learning',
        element: <LearningDashboardPage />,
      },
      {
        path: 'test',
        element: <Test />
      }
  //     {
  //       path: 'logistics',
  //       element: <LogisticsDashboardPage />,
  //     },
         ],
   },
  // {
  //   path: '/sitemap',
  //   element: <PageWrapper children={<DashboardLayout />} />,  // 사이트맵 페이지.
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       path: '',  // '/sitemap' 경로일 때.
  //       element: <SitemapPage />,  // 사이트맵 페이지 렌더링.
  //     },
  //   ],
  // },
  // {
  //   path: '/corporate',  // 기업 관련 페이지들.
  //   element: <PageWrapper children={<CorporateLayout />} />,  // CorporateLayout 레이아웃 사용.
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       path: 'about',  // '/corporate/about' 경로일 때.
  //       element: <CorporateAboutPage />,  // 기업 소개 페이지.
  //     },
  //     {
  //       path: 'team',  // '/corporate/team' 경로일 때.
  //       element: <CorporateTeamPage />,  // 팀 소개 페이지.
  //     },
  //     {
  //       path: 'faqs',  // '/corporate/faqs' 경로일 때.
  //       element: <CorporateFaqPage />,  // 자주 묻는 질문 페이지.
  //     },
  //     {
  //       path: 'contact',  // '/corporate/contact' 경로일 때.
  //       element: <CorporateContactPage />,  // 연락처 페이지.
  //     },
  //     {
  //       path: 'pricing',  // '/corporate/pricing' 경로일 때.
  //       element: <CorporatePricingPage />,  // 가격 정책 페이지.
  //     },
  //     {
  //       path: 'license',  // '/corporate/license' 경로일 때.
  //       element: <CorporateLicensePage />,  // 라이선스 페이지.
  //     },
  //   ],
  // },
  {
    path: '/user-profile',  // 사용자 프로필 관련 페이지들.
    element: <PageWrapper children={<UserAccountLayout />} />,  // UserAccountLayout 레이아웃 사용.
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'details',  // '/user-profile/details' 경로일 때.
        element: <UserProfileDetailsPage />,  // 사용자 상세 정보 페이지.
      },
      // {
      //   path: 'preferences',  // '/user-profile/preferences' 경로일 때.
      //   element: <UserProfilePreferencesPage />,  // 사용자 설정 페이지.
      // },
      // // 기타 사용자 프로필 관련 페이지들.
      // {
      //   path: 'information',
      //   element: <UserProfileInformationPage />,
      // },
      // {
      //   path: 'security',
      //   element: <UserProfileSecurityPage />,
      // },
      // {
      //   path: 'activity',
      //   element: <UserProfileActivityPage />,
      // },
      // {
      //   path: 'actions',
      //   element: <UserProfileActionsPage />,
      // },
      // {
      //   path: 'help',
      //   element: <UserProfileHelpPage />,
      // },
      // {
      //   path: 'feedback',
      //   element: <UserProfileFeedbackPage />,
      // },
    ],
  },
  {
    path: '/auth',  // 인증 관련 경로들.
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',  // '/auth/signup' 경로일 때.
        element: <SignUpPage />,  // 회원가입 페이지.
      },
      {
        path: 'signin',  // '/auth/signin' 경로일 때.
        element: <SignInPage />,  // 로그인 페이지.
      },
      {
        path: 'welcome',  // '/auth/welcome' 경로일 때.
        element: <WelcomePage />,  // 환영 페이지.
      },
      {
        path: 'verify-email',  // '/auth/verify-email' 경로일 때.
        element: <VerifyEmailPage />,  // 이메일 인증 페이지.
      },
      {
        path: 'password-reset',  // '/auth/password-reset' 경로일 때.
        element: <PasswordResetPage />,  // 비밀번호 재설정 페이지.
      },
      {
        path: 'account-delete',  // '/auth/account-delete' 경로일 때.
        element: <AccountDeactivePage />,  // 계정 비활성화 페이지.
      },
    ],
  },
  // {
  //   path: 'errors',  // 에러 페이지들.
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       path: '400',  // '/errors/400' 경로일 때.
  //       element: <Error400Page />,  // 400 에러 페이지.
  //     },
  //     {
  //       path: '403',  // '/errors/403' 경로일 때.
  //       element: <Error403Page />,  // 403 에러 페이지.
  //     },
  //     {
  //       path: '404',  // '/errors/404' 경로일 때.
  //       element: <Error404Page />,  // 404 에러 페이지.
  //     },
  //     {
  //       path: '500',  // '/errors/500' 경로일 때.
  //       element: <Error500Page />,  // 500 에러 페이지.
  //     },
  //     {
  //       path: '503',  // '/errors/503' 경로일 때.
  //       element: <Error503Page />,  // 503 에러 페이지.
  //     },
  //   ],
  // },
  // {
  //   path: '/about',  // '/about' 경로일 때.
  //   element: <PageWrapper children={<DashboardLayout />} />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       path: '',  // '/about' 기본 경로일 때.
  //       element: <AboutPage />,  // About 페이지 렌더링.
  //     },
  //   ],
  // },
]);

export default router;  // 생성된 라우터를 기본 내보내기.

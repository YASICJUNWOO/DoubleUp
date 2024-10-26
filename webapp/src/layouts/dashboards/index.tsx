import {AppLayout} from '../app'; // AppLayout 컴포넌트를 임포트
import {Outlet} from 'react-router-dom'; // React Router에서 제공하는 Outlet 컴포넌트를 임포트

// DashboardLayout 컴포넌트 정의
export const DashboardLayout = () => {
    return (
        // AppLayout으로 감싼 구조를 반환
        // AppLayout은 대시보드 전체의 레이아웃을 정의하는 부모 컴포넌트
        <AppLayout>
            {/* Outlet은 자식 라우트를 렌더링하는 자리 */}
            {/* 자식 라우트에서 설정된 컴포넌트들이 여기서 표시됨 */}
            <Outlet />
        </AppLayout>
    );
};
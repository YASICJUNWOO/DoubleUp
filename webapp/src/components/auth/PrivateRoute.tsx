import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from "./AuthContext";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;

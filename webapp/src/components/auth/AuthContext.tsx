import React, {createContext, ReactNode, useContext, useState} from 'react';
import {IMember} from "../../interface/interface";

interface AuthContextType {
    isAuthenticated: boolean;
    member: IMember | null;
    login: (member: IMember) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// auth context를 사용하기 위한 custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// auth context provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [member, setMember] = useState<IMember | null>(null);

    const login = (memberData: IMember) => {
        setIsAuthenticated(true);
        setMember(memberData); // 로그인 시 사용자 정보 설정
    };

    const logout = () => {
        setIsAuthenticated(false);
        setMember(null); // 로그아웃 시 사용자 정보 초기화
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, member, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

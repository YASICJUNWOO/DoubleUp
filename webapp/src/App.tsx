import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MemberList from "./components/admin/MemberList";
import Profile from "./components/member/Profile";
import StockDetail from "./components/stock/detail/StockDetail";
import PortfolioDetail from "./components/portfolio/PortfolioDetail";
import PortfolioList from "./components/portfolio/PortfolioList";
import AppHeader from "./components/AppHeader";
import {Content} from "antd/es/layout/layout";
import {Layout} from "antd";
import {StockList} from "./components/stock/StockList";
import {NewStockList} from "./components/stock/NewStockList";
import NewPortfolioCreate from "./components/portfolio/create/NewPortfolioCreate";
import Login from "./components/auth/Login";
import {AuthProvider} from "./components/auth/AuthContext";
import Register from "./components/auth/Register";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Layout>
                    <AppHeader/>
                    <Content style={{padding: '20px', marginTop: '10px', background: '#ffffff'}}>
                        <Routes>
                            //============= Default Route ==============
                            {/* 루트 경로(/)를 /stocks로 리디렉션 */}
                            <Route path="/" element={<Navigate to="/stocks/rank"/>}/>

                            //============= Member ==============
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/members" element={<MemberList/>}/>
                            <Route path="/members/:id" element={<Profile/>}/>

                            //============= Stock ==============
                            <Route path="/stocks" element={<StockList/>}/>
                            <Route path="/stocks/:id" element={<StockDetail/>}/>
                            <Route path="/stocks/rank" element={<NewStockList/>}/>

                            //============= Portfolio ==============
                            <Route path="/portfolio" element={<PortfolioList/>}/>
                            <Route path="/portfolio/:id" element={<PortfolioDetail/>}/>
                            <Route path="/portfolio/create" element={<NewPortfolioCreate isEdit={false}/>}/>
                            <Route path="/portfolio/edit/:id" element={<NewPortfolioCreate isEdit={true}/>}/>
                        </Routes>
                    </Content>
                </Layout>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;

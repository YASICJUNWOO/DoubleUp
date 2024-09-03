import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from "./components/Hello";
import SignUp from "./components/SignUp";
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import MemberList from "./components/admin/MemberList";
import Profile from "./components/member/Profile";
import StockList from "./components/stock/StockList";
import StockDetail from "./components/stock/StockDetail";
import Portfolio from "./components/portfolio/Portfolio";
import PortfolioList from "./components/portfolio/PortfolioList";
import AppHeader from "./components/AppHeader";
import {Content} from "antd/es/layout/layout";
import {Layout} from "antd";

function App() {
  return (
      <BrowserRouter>
          {/*<nav style={{marginBottom: '1rem'}}>*/}
          {/*    <Link to="/" style={{marginRight: '1rem'}}>Home</Link>*/}
          {/*    <Link to="/signup" style={{marginRight: '1rem'}}>Sign Up</Link>*/}
          {/*    <Link to="/members" style={{marginRight: '1rem'}}>MemberList</Link>*/}
          {/*    <Link to="/stocks" style={{marginRight: '1rem'}}>StockList</Link>*/}
          {/*    <Link to="/portfolio" style={{marginRight: '1rem'}}>Portfolio</Link>*/}
          {/*</nav>*/}
          <Layout>
              <AppHeader />
              <Content style={{ padding: '20px', marginTop: '64px' }}>
                  <Routes>
                      <Route path="/" element={<Hello />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/members" element={<MemberList />} />
                      <Route path="/members/:id" element={<Profile />} />
                      <Route path="/stocks" element={<StockList />} />
                      <Route path="/stocks/:id" element={<StockDetail />} />
                      <Route path="/portfolio" element={<PortfolioList />} />
                      <Route path="/portfolio/:id" element={<Portfolio />} />
                  </Routes>
              </Content>
          </Layout>
      </BrowserRouter>
  );
}

export default App;

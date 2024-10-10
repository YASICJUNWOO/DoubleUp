import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./components/SignUp";
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import MemberList from "./components/admin/MemberList";
import Profile from "./components/member/Profile";
import StockDetail from "./components/stock/detail/StockDetail";
import PortfolioDetail from "./components/portfolio/PortfolioDetail";
import PortfolioList from "./components/portfolio/PortfolioList";
import AppHeader from "./components/AppHeader";
import {Content} from "antd/es/layout/layout";
import {Layout} from "antd";
import PortfolioCreate from "./components/portfolio/create/PortfolioCreate";
import {StockList} from "./components/stock/StockList";
import {NewStockList} from "./components/stock/NewStockList";

function App() {
  return (
      <BrowserRouter>
          {/*<nav style={{marginBottom: '1rem'}}>*/}
          {/*    <Link to="/" style={{marginRight: '1rem'}}>Home</Link>*/}
          {/*    <Link to="/signup" style={{marginRight: '1rem'}}>Sign Up</Link>*/}
          {/*    <Link to="/members" style={{marginRight: '1rem'}}>MemberList</Link>*/}
          {/*    <Link to="/stocks" style={{marginRight: '1rem'}}>StockTodayList</Link>*/}
          {/*    <Link to="/portfolio" style={{marginRight: '1rem'}}>PortfolioDetail</Link>*/}
          {/*</nav>*/}
          <Layout>
              <AppHeader />
              <Content style={{ padding: '20px', marginTop: '10px', background:'#ffffff' }}>
                  <Routes>

                      //============= Member ==============
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/members" element={<MemberList />} />
                      <Route path="/members/:id" element={<Profile />} />

                      //============= Stock ==============
                      <Route path="/stocks" element={<StockList />} />
                      <Route path="/stocks/:id" element={<StockDetail />} />
                      <Route path="/stocks/rank" element={<NewStockList />} />

                      //============= Portfolio ==============
                      <Route path="/portfolio" element={<PortfolioList />} />
                      <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                      <Route path="/portfolio/create" element={<PortfolioCreate />} />
                  </Routes>
              </Content>
          </Layout>
      </BrowserRouter>
  );
}

export default App;

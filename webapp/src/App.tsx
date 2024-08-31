import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from "./components/Hello";
import SignUp from "./components/SignUp";
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import MemberList from "./components/admin/MemberList";
import Profile from "./components/member/Profile";

function App() {
  return (
      <BrowserRouter>
          <nav style={{marginBottom: '1rem'}}>
              <Link to="/" style={{marginRight: '1rem'}}>Home</Link>
              <Link to="/signup" style={{marginRight: '1rem'}}>Sign Up</Link>
              <Link to="/members" style={{marginRight: '1rem'}}>MemberList</Link>
          </nav>

          <Routes>
              <Route path="/" element={<Hello/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/members" element={<MemberList/>}/>
              <Route path="/members/:id" element={<Profile/>}/>
          </Routes>

      </BrowserRouter>
  );
}

export default App;

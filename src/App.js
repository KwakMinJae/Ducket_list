import './App.css';
import React, { Component } from 'react'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Header from './components/Header'
import Main from './components/Main'
import Content from './components/Content'
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header></Header>
      {/* <Main></Main> */}
      {/* <Content></Content>
      <Login></Login>
      <Signup></Signup> */}

        <Routes>
          {/* <Route index element={<Home/>}></Route> */}
          <Route index element={<Main/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/content" element={<Content/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          {/* <Route path="/*" element={<NotFound/>}></Route> */}
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;

// Header.jsx
import {NavLink} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import { Link, Router } from 'react-router-dom';
import header_logo from '../images/header_logo.png'
import header_app_logo from '../images/header_mobile_logo.png'
import { getAuth,  signOut , onAuthStateChanged} from "firebase/auth";

function Header() {
  const auth = getAuth();
  const [cUser,set_cUser] = useState() 
  console.log(cUser)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set_cUser(user)
      } else {
        return null
      }
    });
  },[cUser])

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // 로그아웃 성공
        console.log("로그아웃 성공");
        // auth.signOut();
        window.location.href = '/'
      })
      .catch((error) => {
        // 로그아웃 중 에러 발생
        console.error("로그아웃 에러:", error);
      });
  };
  
    return (
      
      <div className="App header">
        <header>
          <div className='header_wrap'>
            <NavLink to="/">
            <div className='header_logo web'><h1><img src={header_logo} alt="로고" /></h1>
            </div>
            <div className='header_logo mobile'><h1><img src={header_app_logo} alt="로고" /></h1>
            </div>
            </NavLink>
            {!cUser ? 
            <div className='header_login'>
              <button type="button">
                <NavLink to="/login">
                <span>Login</span>
                </NavLink>
              </button>
            </div> :
            <div className='header_login'>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          }
            
          </div>
        </header>
      </div>
      
    );
  }
  
  export default Header;
  
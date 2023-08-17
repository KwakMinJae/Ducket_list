import google from '../images/google_icon.png'
import React, { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, signOut } from "firebase/auth";
import duck from '../images/duck_ducks_pato_icon.png'
import {NavLink} from 'react-router-dom';
import { Helmet } from "react-helmet-async";

const Login = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailLogin = async (e) => {
      e.preventDefault(); // 폼 제출 방지
      try {
        await setPersistence(auth, browserSessionPersistence)
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("로그인 성공:", user);
        if (user) {
          // alert("로그인 성공",user)
          window.location.replace('/')
          
        }
        
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("로그인 에러:", errorCode, errorMessage);
        alert("아이디 또는 비밀번호가 틀렸습니다. ",errorMessage)
      }
    };

    const googleLogin = async () => {
      try {
        await setPersistence(auth, browserSessionPersistence)
        const result = await signInWithPopup(auth, provider)
        const token = result.accessToken
        const user = result.user
        if (user) {
          // alert("로그인 성공",user)
          window.location.replace('/')
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      }
    };

    const handleLogout = async () => {
      signOut(auth)
        .then(() => {
          // 로그아웃 성공
          console.log("로그아웃 성공");
          auth.signOut();
          window.location.href = '/'
        })
        .catch((error) => {
          // 로그아웃 중 에러 발생
          console.error("로그아웃 에러:", error);
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault(); // 폼 제출 방지
      handleEmailLogin(e); // 이메일로 로그인 함수 호출
    };

    return (
        <div className="login_comp">
          <Helmet>
            <title>로그인 해주세요</title>
          </Helmet>
          <div className='login_title'>
          <h2>로그인 해주세요 !!</h2><img src={duck} alt="로그인 해주세요 !!"/>
          </div>
          <form className="login_form" onSubmit={handleSubmit}>
              <div className='login_wrap'>
                <input
                className="login_input"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br/>
              <input
                className="login_input"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br/>
              <button type="submit" className='email_login'>이메일로 로그인</button><br/>
              <button type="button" onClick={googleLogin} className='google_login'>
                <img src={google} alt="구글 로그인"/> 구글 로그인
                </button><br/>
              <button type="button" className='login_sign'>
                <NavLink to = "/signup">
                  회원가입
                </NavLink>
              </button>
            </div>
          </form>

        </div>
    );
};

export default Login;

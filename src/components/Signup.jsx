import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import egg from '../images/egg.png'
import { Helmet } from "react-helmet-async";
import show from "../images/show_password.png"
import hide from "../images/hide_password.png"

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      const user = userCredential.user;
      console.log("회원가입 성공:", user);
      alert("회원가입이 성공하였습니다.");
      window.location.replace('/')
    } catch (error) {
      console.log("회원가입 에러:", error.message);
      alert("회원가입에 실패하였습니다. " + error.message);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      register();
    }
  };

  return (
    <div>
      <div className="login_comp">
          <Helmet>
            <title>회원가입 해주세요</title>
          </Helmet>
        <div className='login_title'>
          <h2>회원가입 해주세요 !!</h2><img src={egg} alt="회원가입 해주세요 !!"/>
        </div>
        <div className="login_form">
          <div className="login_wrap">
            <input
              className="login_input"
              placeholder="이메일을 입력해주세요"
              value={registerEmail}
              onChange={(e) => {
                setRegisterEmail(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            <div style={{ position:'relative' }}>
            <input
              className="login_input"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              value={registerPassword}
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            <a href="#none"
                onClick={() => setShowPassword(!showPassword)}
                className="show_password_button"
              >
                <img
                  src={showPassword ? hide : show}
                  alt={showPassword ? "숨기기" : "보이기"}
                  style={{ width: "24px", height: "24px" }}
                />
              </a>
            </div>
            <button onClick={register} className="login_sign">
              유저 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

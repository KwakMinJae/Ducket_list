import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import egg from '../images/egg.png'

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

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
        <div className='login_title'>
          <h2>회원가입이 할 수 있어요 !!</h2><img src={egg}/>
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
            <input
              className="login_input"
              placeholder="비밀번호를 입력해주세요"
              value={registerPassword}
              onChange={(e) => {
                setRegisterPassword(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
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

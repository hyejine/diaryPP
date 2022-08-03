import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./login.scss";
import Naver from "./Naver";

const Login = () => {
  const { naver } = window;
  const [userid, setUserId] = useState();

  const onNaverLogin = () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "o1yjLGVlc1wfFxCIIGHG",
        callbackUrl: "http://localhost:3000/naver", 
        isPopup: true, // popup 형식으로 띄울것인지 설정
        loginButton: { color: 'green', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
      });
      naverLogin.init();

  
    //   naverLogin.getLoginStatus(async function (status) {
    //     if (status) {
    //             // 아래처럼 선택하여 추출이 가능하고, 
    //       setUserId(naverLogin.user);
    //             // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
    //             // setUserInfo(naverLogin.user)
              
    //           }
    //         }) 
    //         console.log(naverLogin.user);
    };
    // console.log(userid);

    const location = useLocation();  

    const getNaverToken = () => {
      if (!location.hash) return;
      const token = location.hash.split('=')[1].split('&')[0];
      console.log(token);
    };

      
    // 요기!
	

    useEffect(() => {
      onNaverLogin();
      getNaverToken();
    }, []);
  return (
    <div className="login_wrap">
      <div className="login_inner">
        <p className="title1 text_center">Welcome!</p>
        <p className="title2 text_center">Please login to continue</p>
        <div className="login_input">
          <p className="email">Email</p>
          <input />
          <p className="password">Password</p>
          <input />
        </div>
        <p className="forget text_center">
          혹시 아이디 혹은 비밀번호를 잊어버리셨나요?
        </p>
        <div className="login_button">
            <button className="login_b">Login</button>
            <div>
                <div className="line">Or Login With</div>
            </div>
            <div id='naverIdLogin' />
            </div>
        </div>
      </div>
  );
};

export default Login;

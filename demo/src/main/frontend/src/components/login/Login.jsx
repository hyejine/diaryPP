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
        callbackUrl: "http://localhost:3000/login", 
        isPopup: false, // popup 형식으로 띄울것인지 설정
        loginButton: { color: 'green', type: 1, height: '47' }, //버튼의 스타일, 타입, 크기를 지정
        callbackHandle: true
      });
      naverLogin.init();

  
      // window.addEventListener('load', function(){
        naverLogin.getLoginStatus(async function (status) {
          console.log(status);
        if (status) {
                // 아래처럼 선택하여 추출이 가능하고, 
          setUserId(naverLogin.user);
                // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
                // setUserInfo(naverLogin.user)
              
              }
            }) 
            // console.log(userid);
          // })
    };
    console.log(userid);

    const userAccessToken = () => {
      window.location.href.includes('access_token') && getToken()
}
      
      const getToken = () => {
  const token = window.location.href.split('=')[1].split('&')[0]
  // .split('=')[1].split('&')[0]
           // console.log, alert 창을 통해 토큰이 잘 추출 되는지 확인하자! 
          console.log(token);
           // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!   
              localStorage.setItem('access_token', token)
          // setGetToken(token)
}

      // console.log(window.location.href);
           // 화면 첫 렌더링이후 바로 실행하기 위해 useEffect 를 사용하였다.
useEffect(() => {
  onNaverLogin()
  userAccessToken()
}, [])
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

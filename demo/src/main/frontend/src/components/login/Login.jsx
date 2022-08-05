import React, { useEffect, useState } from "react";
import "./login.scss";
import Naver from "./Naver";
import axios from "axios";

const Login = () => {
  const { naver } = window;
  const [userid, setUserId] = useState();
  const [testToken, setTestToken] = useState();

  const onNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: "o1yjLGVlc1wfFxCIIGHG",
      callbackUrl: "http://localhost:3000/login",
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: "green", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
      callbackHandle: true,
    });
    naverLogin.init();

    // window.addEventListener('load', function(){
    naverLogin.getLoginStatus(async function (status) {
      console.log(status);
      if (status) {
        setUserId(naverLogin.user);
      }
    });
    // })
  };
  console.log(userid);

  const userAccessToken = () => {
    // window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    const token = window.location.href.split("=")[1].split("&")[0];
  //   axios.post(`https://openapi.naver.com/v1/nid/me`, {
  //     token
  // }, {
  //     withCredentials: true
  // })
  // .then((res)=> {
  //     window.location.replace('/')
  //   //서버측에서 로직이 완료되면 홈으로 보내준다
  // })
   
   
    console.log(token);
    // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
    localStorage.setItem("access_token", token);
    // setGetToken(token)
  };

  useEffect(() => {
    onNaverLogin();
    userAccessToken();
  }, []);

  const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=380089a4f363b679b2dbe89f5bed98ae&redirect_uri=http://localhost:3000/login'
  const onKaKao =()=>{
    window.location.href = KAKAO_AUTH_URL;
  };

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
          <div id="naverIdLogin" />
          <button style ={{backgroundImage:'../../resources/image/kakao_login_medium_narrow.png', width:222}} onClick={onKaKao}><img width={222} alt="카카오 로그인 버튼" src="../../resources/image/kakao_login_medium_narrow.png"></img></button>
        </div>
      </div>
    </div>
  );
};

export default Login;

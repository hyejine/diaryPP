import React, { useEffect, useState } from "react";
import "./login.scss";
import Naver from "./Naver";
import axios from "axios";
import { useCallback } from "react";
import  GoogleLogin  from "./GoogleLogin";
import { Link } from "react-router-dom";
import GoogleButton from "../GoogleButton";
import Regist from "./regist/Regist";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/userSlice";
import AuthenticationService from "./AuthenticationService";

const Login = () => {
  const { register, handleSubmit,formState: { errors }} = useForm();

  const { naver } = window;
  const [userid, setUserId] = useState();
  const [testToken, setTestToken] = useState();


  // const onNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: "o1yjLGVlc1wfFxCIIGHG",
  //     callbackUrl: "http://localhost:3000/login",
  //     isPopup: false, // popup 형식으로 띄울것인지 설정
  //     loginButton: { color: "green", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
  //     callbackHandle: true,
  //   });
  //   naverLogin.init();

  //   // window.addEventListener('load', function(){
  //   naverLogin.getLoginStatus(async function (status) {
  //     console.log(status);
  //     if (status) {
  //       setUserId(naverLogin.user);
  //     }
  //   });
  //   // })
  // };
  // console.log(userid);

  // const userAccessToken = () => {
  //   // window.location.href.includes("access_token") && getToken();
  // };

  // const getToken = () => {
  //   const token = window.location.href.split("=")[1].split("&")[0];
  // //   axios.post(`https://openapi.naver.com/v1/nid/me`, {
  // //     token
  // // }, {
  // //     withCredentials: true
  // // })
  // // .then((res)=> {
  // //     window.location.replace('/')
  // //   //서버측에서 로직이 완료되면 홈으로 보내준다
  // // })

  //   console.log(token);
  //   // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
  //   localStorage.setItem("access_token", token);
  //   // setGetToken(token)
  // };

  // useEffect(() => {
  //   onNaverLogin();
  //   userAccessToken();
  // }, []);
  const grant_type = "authorization_code";
  const REST_API_KEY = "380089a4f363b679b2dbe89f5bed98ae";
  const REDIRECT_URI = "http://localhost:3000/login";
  const REST_SECRET = "Cwg68s5c1ZyfKbI0LZaReu6WCXxwazgD";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&client_secret=${REST_SECRET}`;
  const onKaKao = () => {
    // 회원정보 수집 확인 url로 이동
    window.location.href = KAKAO_AUTH_URL;
  };

  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const [accessToken, setAccessToken] = useState("");
  const [clickLogin, setClickLogin] =useState(false);
  const getToken = () => {
    axios({
      method: "post",
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}&client_secret=${REST_SECRET}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}&client_secret=${REST_SECRET}`
    }).then((res) => {
      setAccessToken(res.data.access_token);
      console.log(res.data.access_token);
    });
  };
  // console.log(accessToken);
  const userInfo = () => {
    axios({
      method: "post",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      console.log(res.data.properties.nickname);
      console.log(res.data.properties.profile_image);
      console.log(res.data.properties.thumbnail_image);
    });
  };

  useEffect(() => {
    // if(!location.search) return;
    // getToken();
    // userInfo();
  }, []);
  // useEffect(() => {
  // userInfo();
  // }, [userInfo]);
  const axiosConfig = {
    headers:{
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

const hello = ()=>{
  axios.get(`/account/${AuthenticationService.getLoggedInUserName()}`)
  .then((response) => {
    console.log(response);} )
    .catch((error)=>{
      console.log(error);
    })
}
console.log(AuthenticationService.getLoggedInUserName());
const dispatch = useDispatch();
  const Submit = (value)=>{
    setUserId ({
      email: value.target.email.value,
      password: value.target.password.value,
    })  
    value.preventDefault();
    AuthenticationService
        .executeJwtAuthenticationService(userid.email, userid.password)
        .then((response) => {
          console.log(response);
        AuthenticationService.registerSuccessfulLoginForJwt(userid.email,response.data.accessToken);
        axios.get(`/account/${AuthenticationService.getLoggedInUserName()}`)
        .then((response) => {
          console.log(response);
          dispatch(loginUser(response.data));
        } )
          .catch((error)=>{
            console.log(error);
          })
        
    }).catch( (error) =>{
      console.log(error);
    })
    // axios.post(`/auth/login`, {...request})
    //   .then(response => {
    //   console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     return "이메일 혹은 비밀번호를 확인하세요.";
    //   });
  }
  const onSubmit = (value) => {
    console.log(value);
    // axios
    //   .post("/user/signUp", value)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));

    // setModalActive(true);
  };
  return (
    <div className="registPage">
      <div className="regist_inner">
      <div className="regist_title">
        <p className="title1">반갑습니다!</p>
        <p className="title2">이메일과 비밀번호를 입력해주세요!</p>
        </div>
        <div className="regist_input">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="writeTitle">
              <span>이메일</span>
            </div>
            <div className="writeAareaWrap">
              <input
                className="writeAarea"
                placeholder="example@diyDiary.com"
                {...register("user_email", {
                  required: "(*이메일은 필수 입력입니다.)",
                  // validate: idCheck,
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "(* 이메일 형식에 맞지 않습니다.)",
                  },
                })}
              />
              </div>
              <div className="writeTitle">
              <span>비밀번호</span>
            </div>
            <div className="writeAareaWrap">
              <input
                type="password"
                className="writeAarea"
                placeholder="*********"
                {...register("user_password", {
                  required: "(* 비밀번호는 필수 입력입니다.)",
                  // validate: password,
                })}
              />
              </div>
        </form>
        </div>
      </div>
        {/* <div className="login_inner">
        <p className="title1 text_center">Welcome!</p>
        <p className="title2 text_center">Please login to continue</p>
        <div className="login_input">
        <Form onSubmit={Submit} noValidate > 
        <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required />
      </Form.Group>
       
        <p className="forget text_center">
          혹시 아이디 혹은 비밀번호를 잊어버리셨나요?
        </p>
          <Button className="login_b" type="submit">Login</Button>
          </Form>
          </div>
        <div className="login_button">
          <div>
            <div className="line">Or Login With</div>
          </div> */}
          {/* <div id="naverIdLogin" /> */}
          {/* <button onClick={onKaKao}>
            <img
              width={222}
              alt="카카오 로그인 버튼"
              src="../../../build/static/resources/image/kakao_login_medium_narrow.png"
            ></img>
          </button> */}
         
          {/* <GoogleLogin/>
          <GoogleButton>efe</GoogleButton> */} 
         {/*  <Link to="/user/signUp">
            <button className="login_b login_diary">Sign Up With Site</button>
          </Link>
          <Link to="/auth/vi/user/check">확인</Link>
          <Link to="/auth/hello" onClick={hello}>시험확인</Link>
          
        </div>
      </div>*/}
    </div>
  );
};

export default Login;

// import  GoogleLogin  from "react-google-login";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GoogleButton= ()=>{
  // const [accessToken, setAccessToken] = useState("");
  // const clientId ="385866404278-vjjtkrdekth0ah60nap789n5kugf0ujj.apps.googleusercontent.com";
  // const clientSecret="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";

  // const onGoogle=()=>{
  //   window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&scope=https://www.googleapis.com/auth/userinfo.profile`;
  // }
  
  // const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  // console.log(AUTHORIZE_CODE);
  
  // const getToken = () => {
  //   axios({
  //     method: "post",
  //     url: `https://oauth2.googleapis.com/token?code=${AUTHORIZE_CODE}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=http://localhost:3000/&grant_type=authorization_code`,
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   })
  //   .then((res) => {
  //     setAccessToken(res.data.access_token);
  //     localStorage.setItem("access_token", accessToken);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // };
  // console.log(accessToken);
  // // const userAccessToken = () => {
  // //   window.location.href.includes("access_token") && userInfo();
  // // };

  // const userInfo = () => {
  //   axios({
  //     method: "get",
  //     url: `https://www.googleapis.com/oauth2/v2/userinfo`,
  //     headers: { Authorization: `Bearer ${accessToken}` },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   });
  // };

  // useEffect(() => {
  //   if(AUTHORIZE_CODE){
  //   getToken();
  //   }
  // }, []);
  // useEffect(() => {
  // if(accessToken){
  //   userInfo();
  //   console.log("e");
  // }  
  // }, [accessToken]);

    return (
        <div>
           {/* <div className="g-signin2" onClick={onGoogle} data-theme="dark">로그인</div> */}
        </div>
    );
} 

export default GoogleButton;
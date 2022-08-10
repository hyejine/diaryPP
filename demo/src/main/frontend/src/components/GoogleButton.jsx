// import  GoogleLogin  from "react-google-login";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GoogleButton= ()=>{
  
  const clientId ="385866404278-vjjtkrdekth0ah60nap789n5kugf0ujj.apps.googleusercontent.com";

  const onGoogle=()=>{
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/&scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly`;
  }
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  console.log(AUTHORIZE_CODE);
  const [accessToken, setAccessToken] = useState("");
  // const getToken = () => {
  //   axios({
  //     method: "post",
  //     url: `oauth2.googleapis.com`,
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     // body: `code=${AUTHORIZE_CODE}&client_id=${clientId}&client_secret=your_client_secret&redirect_uri=http://localhost:3000/&grant_type=authorization_code`
  //   }).then((res) => {
  //     setAccessToken(res.data.access_token);
  //     console.log(res.data.access_token);
  //   });
  // };

  // const CheckAuth =  () => {
  //   axios({
  //     method: "post",
  //     url: "https://www.googleapis.com/oauth2/v2/userinfo",
  //     // headers: { Authorization: `Bearer ${accessToken}` },
  //   }) 
  //   .then((res) => {
  //     alert(res.data.email);
  //   })
  //   .catch((err) => {
  //     alert("oAuth token expired");
  //     window.location.assign("http://localhost:3000");
  //   });
    
  // }

  useEffect(() => {
    // if(!location.search) return;
    // getToken();
    // userInfo();
  }, []);
  // useEffect(() => {
  // userInfo();
  // }, [userInfo]);
    return (
        <div>
           <div className="g-signin2" onClick={onGoogle} data-theme="dark">efef</div>
        </div>
    );
} 

export default GoogleButton;
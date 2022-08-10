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
  const getToken = () => {
    axios({
      method: "post",
      url: `https://oauth2.googleapis.com/token?code=${AUTHORIZE_CODE}&client_id=${clientId}&client_secret=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&redirect_uri=http://localhost:3000/&grant_type=authorization_code`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // body: `code=${AUTHORIZE_CODE}&client_id=${clientId}&client_secret=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&redirect_uri=http://localhost:3000/&grant_type=authorization_code`
    }).then((res) => {
      setAccessToken(res.data.access_token);
      localStorage.setItem("access_token", accessToken);
      console.log(res.data.access_token);
    })
    .catch((error)=>{
      console.log(error);
    });
    // CheckAuth();
  };
  // const userAccessToken = () => {
  //   window.location.href.includes("access_token") && userInfo();
  // };

  const userInfo = () => {
    axios({
      method: "get",
      url: `https://www.googleapis.com/drive/v2/files`,
      headers: { Authorization: `Bearer ${accessToken}` },
      
    }).then((res) => {
      console.log(res);
    })
    .catch((error)=>{
      console.log(error);
    });
  };

  useEffect(() => {
    // if(!location.search) return;
    getToken();
   
  }, []);
  useEffect(() => {
    userInfo();
  }, [userInfo]);
    return (
        <div>
           <div className="g-signin2" onClick={onGoogle} data-theme="dark">efef</div>
        </div>
    );
} 

export default GoogleButton;
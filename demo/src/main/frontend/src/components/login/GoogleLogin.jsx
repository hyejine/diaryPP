import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Main from '../../Main';
import {GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, OAUTH_REDIRECT_URI }from './authentication/Authentication';

const GoogleLogin =()=> {

    const [accessToken, setAccessToken] = useState();
    const [userInfo, setUserInfo] = useState([]);

    const onGoogle=()=>{
        window.location.href = GOOGLE_AUTH_URL;
    }

    const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");

    const getCode =()=>{
        axios({
            method: "post",
            url: `https://oauth2.googleapis.com/token?code=${AUTHORIZE_CODE}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${OAUTH_REDIRECT_URI}&grant_type=authorization_code`,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then((response)=>{
            setAccessToken(response.data.access_token);
            // localStorage.setItem("access_token", accessToken);
            console.log("성공",response.data.access_token);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    const getToken = ()=>{
        axios({
            method: "get",
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
            setUserInfo(response.data);
            console.log(response.data);
          })
          .catch((error)=>{
            console.log(error);
          });
    }

    
  const userAccessToken = () => {
    if(window.location.href.includes(accessToken)){
console.log("accessToken");
    }else{
    console.log("No accessToken");
    }
  };
  userAccessToken();
    useEffect(() => {
        if(AUTHORIZE_CODE){
            getCode();
        }
    }, [AUTHORIZE_CODE])

    useEffect(() => {
        if(accessToken){
          getToken();
        }  
    }, [accessToken]);

    useEffect(()=>{
        if(userInfo){
            axios.post('/user/safeUser',{
                user_email: userInfo.email,
                user_name: userInfo.name,
                user_image: userInfo.picture,
                sns_type: "google"
            })
            .then((response)=>console.log(response))
            .catch((error)=>console.log(error));
        }
    },[userInfo]);

        return (
            <>
            <button onClick={onGoogle}>drfe로그인</button> 
            </>
        );
}

export default GoogleLogin;
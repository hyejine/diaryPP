import axios from 'axios';
import React, { useEffect } from 'react';
import {GOOGLE_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_REDIRECT_URI}from './authentication/Authentication';

const GoogleLogin =(props)=> {
const {authorizeCode} = props;
    const onGoogle=()=>{
        window.location.href = GOOGLE_AUTH_URL;
    }
    const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");

    const getCode =()=>{
        // axios({
        //     method: "post",
        //     url: `https://oauth2.googleapis.com/token?code=${AUTHORIZE_CODE}&client_id=${GOOGLE_CLIENT_ID}&client_secret=${GOOGLE_CLIENT_SECRET}&redirect_uri=${GOOGLE_OAUTH_REDIRECT_URI}&grant_type=authorization_code`,
        //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
        // })
        // .then((response)=>{
        //     console.log(response);
        // })
        // .catch((error)=>{
        //     console.log(error);
        // });
    }

    useEffect(() => {
      
        getCode();
        
    }, [])

    console.log(AUTHORIZE_CODE);
        return (
            <>
            <button onClick={onGoogle}>로그인</button>
            </>
        );
}

export default GoogleLogin;
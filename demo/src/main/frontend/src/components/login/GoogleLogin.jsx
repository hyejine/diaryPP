import React, { Component } from 'react';
import {GOOGLE_AUTH_URL}from './authentication/Authentication';
const GoogleLogin =()=> {
console.log(GOOGLE_AUTH_URL);
    const onGoogle=()=>{
        window.location.href = GOOGLE_AUTH_URL
    }
        return (
            <>
            <button onClick={onGoogle}>로그인</button>
            </>
        );
}

export default GoogleLogin;
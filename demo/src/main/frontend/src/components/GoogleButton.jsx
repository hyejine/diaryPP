import React, { Component } from 'react';
// import  GoogleLogin  from "react-google-login";

const GoogleButton= ()=>{
    const onSuccess = (response) => {
        console.log(response);
        console.log("성공");
      };
    
      const onFailure = (res) => {
        console.log("err", res);
      };
    
    return (
        <div>
                      {/* <GoogleLogin
            clientId={"385866404278-vjjtkrdekth0ah60nap789n5kugf0ujj.apps.googleusercontent.com"}
            buttonText="Login with Google" 
            onSuccess={onSuccess}
            onFailure={onFailure}
            responseType="id_token"
            cookiePolicy={'single_host_origin'}
            uxMode= 'redirect'
          /> */}
        </div>
    );
} 

export default GoogleButton;
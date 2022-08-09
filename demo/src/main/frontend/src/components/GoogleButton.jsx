import React, { Component } from 'react';
import  GoogleLogin  from "react-google-login";

const GoogleButton= ()=>{
    const onSuccess = (response) => {
        console.log(response);
        console.log("성공");
      };
    
      const onFailure = (res) => {
        console.log("err", res);
      };
      const onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      }
    
    return (
        <div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
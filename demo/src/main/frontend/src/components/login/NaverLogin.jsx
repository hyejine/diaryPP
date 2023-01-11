import React, { useEffect, useState } from "react";

const NaverLogin = () => {
    const { naver } = window;
    const [userid, setUserId] = useState();
    
    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
            clientId: "o1yjLGVlc1wfFxCIIGHG",
            callbackUrl: "http://localhost:3000/user/login",
            isPopup: false, // popup 형식으로 띄울것인지 설정
            loginButton: { color: "green", type: 1, height: "47" }, //버튼의 스타일, 타입, 크기를 지정
            callbackHandle: true,
        });
        naverLogin.init();

        // back 으로 처리할 부분 
        // naverLogin.getLoginStatus(async function (status) {
        //     if (status) {
        //         setUserId(naverLogin.user);
        //     }
        // });
    };

    console.log(userid);

    const userAccessToken = () => {
        window.location.href.includes("access_token") && getNaverToken();
    };

    const getNaverToken = () => {
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
    };

    // const onLogin = ()=>{
    //     naverLogin.getLoginStatus(async function (status) {
    //         if (status) {
    //             setUserId(naverLogin.user);
    //             console.log(status);
    //         }
    //     });
    // }
    useEffect(() => {
        initializeNaverLogin();
        userAccessToken();
    }, []);

    return (
        <div>
            <div id="naverIdLogin" />
        </div>

    )

}
export default NaverLogin;
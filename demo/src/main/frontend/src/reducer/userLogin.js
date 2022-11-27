import { createSlice } from "@reduxjs/toolkit";


export const userLogin = createSlice({
    name: "userInfo",
    initialState: {
        id: "",
        email: "",
        name:"",
        phone:"",
        image:"",
        isLoading: false, // optional
        isLogin: null,
    },
    reducers: {
        // login 성공 시
        loginUser: (state, action) => {
            // name, id에 API 값 받아오기
            state.id = action.payload.id;
            state.email = action.payload.user_email;
            state.name = action.payload.user_name;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
            // state 변화를 알림
            return state;
        },
        // login 실패 시
        clearUser: (state) => {
            // name, id 값을 비워줌.
            state.id = "";
            state.email = "";
            state.name = "";
            state.phone = "";
            state.image = "";
            // state 변화를 알림
            return state;
        },
    },
});

export const { loginUser, clearUser } = userLogin.actions;
export default userLogin.reducer;
    

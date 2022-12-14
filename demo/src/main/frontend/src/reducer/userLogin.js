import { SatelliteAlt } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";


export const userLogin = createSlice({
    name: "userInfo",
    initialState: {
        id: undefined,
        email: undefined,
        name:undefined,
        phone:undefined,
        image:undefined,
        font:undefined,
        background:undefined
        // isLoading: false, // optional
        // isLogin: null,
    },
    reducers: {
        // login 성공 시
        loginUser: (state, action) => {
            // name, id에 API 값 받아오기
            console.log(action);
            state.id = action.payload.user_id;
            state.email = action.payload.user_email;
            state.name = action.payload.user_name;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
            state.font = action.payload.custom_font;
            state.background = action.payload.custom_background;
            // state 변화를 알림
            return state;
        },
        // login 실패 시
        clearUser: (state) => {
            // name, id 값을 비워줌.
            console.log(state);
            state.id = undefined;
            state.email = undefined;
            state.name = undefined;
            state.phone = undefined;
            state.image = undefined;
            state.font= undefined;
            state.background= undefined;
            // state 변화를 알림
            return state;
        },
    },
});

export const { loginUser, clearUser } = userLogin.actions;
export default userLogin.reducer;
    

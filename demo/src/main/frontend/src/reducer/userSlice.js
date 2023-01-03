import { createSlice } from "@reduxjs/toolkit";

export const userCustom = createSlice({
    name: "userCustom",
    initialState: {
        font: undefined,
        backColor: undefined,
        backImage: undefined
    },
    reducers: {
        // login 후 사용자 설정 
        setCustom: (state, action) => {
            // name, id에 API 값 받아오기
            state.font = action.payload.font;
            state.backColor = action.payload.backColor;
            state.backImage = action.payload.backImage;
            return state;
        },
        // logout 시 
        clearCutosm : (state) => {
            state.font = undefined;
            state.backColor = undefined;
            state.backImage = undefined;
            return state;
        },
    },
});

export const { setCustom, clearCutosm } = userCustom.actions;
export default userCustom.reducer;
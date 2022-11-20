import { configureStore } from "@reduxjs/toolkit";
import userLogin from "./userLogin";

// redux 스토어 
export default configureStore({
  reducer: {
    user: userLogin,
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
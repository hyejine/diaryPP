import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Naver from "./components/login/Naver";
import Main from "./Main";
import './main.scss';
import GoogleButton from "./components/GoogleButton";
import GoogleLogin from "./components/login/GoogleLogin";
function App() {
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  console.log(AUTHORIZE_CODE);
  return (
    <div>
      {/* <GoogleButton></GoogleButton> */}
    <BrowserRouter>
      <Routes>
        {/* <Route Route path="" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/naver" element={<Naver />}/> */}
        {/* <Route path="/" element={<GoogleButton />}/> */}
        <Route Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/login/googleLogin" element={<GoogleLogin/>}/> */}


      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

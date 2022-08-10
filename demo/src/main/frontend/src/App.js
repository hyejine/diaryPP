import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Naver from "./components/login/Naver";
import Main from "./Main";
import './main.scss';
import GoogleButton from "./components/GoogleButton";
function App() {
    
  return (
    <div>
      {/* <GoogleButton></GoogleButton> */}
    <BrowserRouter>
      <Routes>
        {/* <Route Route path="" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/naver" element={<Naver />}/> */}
        <Route path="/" element={<GoogleButton />}/>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

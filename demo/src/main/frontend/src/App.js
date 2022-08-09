import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Naver from "./components/login/Naver";
import Main from "./Main";
import './main.scss';
import GoogleButton from "./components/GoogleButton";
function App() {
    
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route Route path="" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/naver" element={<Naver />}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

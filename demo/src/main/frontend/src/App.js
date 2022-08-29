import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Main from "./Main";
import './main.scss';
import Regist from "./components/login/regist/Regist";

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route Route path="/" element={<Main />}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/login/regist" element={<Regist/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

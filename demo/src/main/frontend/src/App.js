import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Main from "./Main";
import './main.scss';
import Regist from "./components/login/regist/Regist";
import Write from "./components/Write";

function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route Route path="/" element={<Main />}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/login/regist" element={<Regist/>}/>  
        <Route path="/auth/vi/user/check" element={<Write/>}/>
     
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

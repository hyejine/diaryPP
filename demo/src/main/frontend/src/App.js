import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Main from "./Main";
import './main.scss';
import Regist from "./components/login/regist/Regist";
import Write from "./components/Write";
import { useSelector } from "react-redux";

function App(props) {
  const currnetUser = useSelector(state => state.user);
  console.log(props);
  console.log(currnetUser);
  return (
    <div>
    <BrowserRouter>
      <Routes>
      {/* {user.id !== "" ? <Main /> : <Login />} */}
        <Route Route path="/" element={<Main />} currentUser={props?.currnetUser}/>
        <Route path="/auth/login" element={<Login/>}/>
        <Route path="/login/regist" element={<Regist/>}/>  
        <Route path="/auth/vi/user/check" element={<Write/>}/>
     
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

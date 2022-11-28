import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Login from './components/login/Login';
import Main from "./Main";
import Regist from "./components/login/regist/Regist";
import Write from "./components/board/Write";
import Edit from "./components/board/Edit";
import { useSelector } from "react-redux";
import EmojiPurchase from "./components/emoji/EmojiPurchase";
import MainLayout from "./components/layout/MainLayout";
import BoardLayout from "./components/layout/BoardLayout";
import Read from "./components/board/Read";
import CalendarCom from "./components/calendar/CalendarCom";
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultBg from './resource/image/skyBg.jpg'
import ServiceCenter from "./components/serviceCenter/ServiceCenter";
import Test from "./test.jsx";
import LoginLayout from "./components/layout/LoginLayout";

function App(props) {
  // const [currnetUser, setCurrentUser]= useState(useSelector(state => state.user))
  const currentUser = useSelector(state => state.currentUser);
  const [backColor, setBackColor ] = useState();
  const [backImage, setBackImage ] = useState();
  const [fontChange, setFontChange ] = useState();
console.log("currnetUser", currentUser);
console.log(props);
  return (
    <div className="allPage " style={ backColor ? { background: `${backColor}`, fontFamily: `${fontChange}` } : backImage ? { background: `url(${backImage})`, fontFamily: `${fontChange}`, backgroundSize: '30%' } : { background: `url(${defaultBg})`, backgroundSize: '30%', fontFamily: `${fontChange}` }}>
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout setBackColor ={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange={fontChange} currentUser={currentUser}/>}>
      <Route path="/" element={<CalendarCom />} />
      <Route path="/board/write" element={<Write/>}/>
      <Route path="/emoji" element={<EmojiPurchase/>}/> 
     </Route>
     <Route element={<LoginLayout/>}>
     <Route path="/user/login" element={<Login/>}/>
      <Route path="/auth/signUp" element={<Regist/>}/>  
     </Route>
     <Route element={<BoardLayout />}>
      <Route path="/board/read/:diary_id" element={<Read/>}/> 
      <Route path="/board/edit/:diary_id" element={<Edit/>}/> 
      <Route path="/contactUs" element={<ServiceCenter currentUser={currentUser}/>}/> 
      <Route path="/test" element={<Test currentUser={currentUser}/>}/> 
      </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

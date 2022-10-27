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
import defaultBg from './resource/image/defaultBackground.jpg'
import ServiceCenter from "./components/serviceCenter/ServiceCenter";

function App(props) {
  const currnetUser = useSelector(state => state.user);
  const [backColor, setBackColor ] = useState();
  const [backImage, setBackImage ] = useState();
  const [fontChange, setFontChange ] = useState();

  return (
    <div className="allPage " style={ backColor ? { background: `${backColor}`, fontFamily: `${fontChange}` } : backImage ? { background: `url(${backImage})`, fontFamily: `${fontChange}`, backgroundSize: 'contain' } : { background: `url(${defaultBg})`, backgroundSize: 'contain', fontFamily: `${fontChange}` }}>
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout setBackColor ={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange={fontChange}/>}>
      <Route path="/" element={<CalendarCom />} currentUser={props?.currnetUser}/>
      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/login/regist" element={<Regist/>}/>  
      <Route path="/board/write" element={<Write/>}/>
      <Route path="/emoji" element={<EmojiPurchase/>}/> 
     </Route>
     <Route element={<BoardLayout />}>
      <Route path="/board/read/:diary_id" element={<Read/>}/> 
      <Route path="/board/edit/:diary_id" element={<Edit/>}/> 
      <Route path="/contactUs" element={<ServiceCenter/>}/> 
      </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

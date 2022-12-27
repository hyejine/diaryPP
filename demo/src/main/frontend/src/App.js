import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import Regist from "./components/login/regist/Regist";
import Write from "./components/board/Write";
import Edit from "./components/board/Edit";
import { useSelector } from "react-redux";
import MainLayout from "./components/layout/MainLayout";
import BoardLayout from "./components/layout/BoardLayout";
import Read from "./components/board/Read";
import CalendarCom from "./components/calendar/CalendarCom";
import defaultBg from './resource/image/skyBg.jpg'
import ServiceCenter from "./components/serviceCenter/ServiceCenter";
import LoginLayout from "./components/layout/LoginLayout";

function App() {
  const currentUser = useSelector(state => state.currentUser);
  const [backColor, setBackColor ] = useState();
  const [backImage, setBackImage ] = useState();
  const [fontChange, setFontChange ] = useState();

  console.log(currentUser);
  useEffect(()=>{
    if(currentUser){
      if(fontChange){
        setFontChange(fontChange);
      }else{
        if(currentUser.font){
        setFontChange(currentUser.font);
        } setFontChange('DungGeunMo');
      }
    }else{
      setFontChange('DungGeunMo');
    }
  },[currentUser, fontChange])

  return (
    <div className="allPage " style={{fontFamily: `${fontChange}`}}>
      {/* currentUser ? fontChange ? `${fontChange}` : currentUser.font ? `${currentUser.font}`:'DungGeunMo' :'DungGeunMo'}}> */}
      {/* style={ backColor ? { background: `${backColor}`, fontFamily: `${fontChange}` } : backImage ? { background: `url(${backImage})`, fontFamily: `${fontChange}`, backgroundSize: '30%' } : { background: '#fdd8ed', backgroundSize: '30%', fontFamily: `${fontChange}` }} */}
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout setBackColor ={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange={fontChange} currentUser={currentUser}/>}>
      <Route path="/" element={<CalendarCom />} />
     </Route>
     <Route element={<LoginLayout/>}>
     <Route path="/user/login" element={<Login/>}/>
      <Route path="/auth/signUp" element={<Regist/>}/>  
     </Route>
     <Route element={<BoardLayout setBackColor ={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange={fontChange} currentUser={currentUser}/>}>
      <Route path="/board/write" element={<Write currentUser={currentUser}/>}/>
      <Route path="/board/read/:diary_id" element={<Read currentUser={currentUser}/>}/> 
      <Route path="/board/edit/:diary_id" element={<Edit currentUser={currentUser}/>}/> 
      <Route path="/contactUs" element={<ServiceCenter currentUser={currentUser}/>}/> 
      </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

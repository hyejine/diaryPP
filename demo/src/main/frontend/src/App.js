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
import ServiceCenter from "./components/serviceCenter/ServiceCenter";
import LoginLayout from "./components/layout/LoginLayout";

function App() {
  const currentUser = useSelector(state => state.currentUser);
  const userCustom = useSelector(state => state.userCustom);
  const [backColor, setBackColor ] = useState('#FFE99D');
  const [backImage, setBackImage ] = useState();
  const [fontChange, setFontChange ] = useState();
  
  useEffect(()=>{
    if(currentUser?.email){
      // console.log("로그인 됨", currentUser.email);
      if(userCustom.font){
        // console.log(" 사용자가 폰트 바꿈", userCustom);
        setFontChange(userCustom.font);
      } 
      else if(currentUser.font !== undefined && currentUser.font !== null){
        // console.log("사용자 폰트 존재", currentUser.font);
        setFontChange(currentUser.font);
      } else {
        // console.log("사용자 폰트, 폰트 변경 안함");
        setFontChange('DungGeunMo');
      }
    } else {
      // console.log("로그인 안됨");
      setFontChange('DungGeunMo');
    }
  },[currentUser, userCustom]); 

  useEffect(()=>{
    if(currentUser?.email){
    if (userCustom.backColor !== undefined || userCustom.backImage !== undefined){
      setBackColor(userCustom.backColor);
      setBackImage(userCustom.backImage);
    } else if(currentUser.background !== undefined && currentUser.background !== null){
      if(currentUser.background.includes('#')){
        setBackColor(currentUser.background);
      }else{
        setBackImage(currentUser.background);
      }
    } else {
      setBackColor('#FFE99D');
      setBackImage(userCustom.backImage);
    }
   } else {
      setBackColor('#FFE99D');
      setBackImage(userCustom.backImage);
    }
  },[currentUser, userCustom, backColor, backImage])

  return (
    <div className="allPage " style={ backImage ? {background: `url(${backImage})`, fontFamily: `${fontChange}`} : { background: `${backColor}`, fontFamily: `${fontChange}` } }> 
    {/* backgroundSize: '30%'  */}
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout setBackColor={setBackColor} setBackImage={setBackImage} fontChange={fontChange} currentUser={currentUser} userCustom ={userCustom} />}>
      <Route path="/" element={<CalendarCom />} />
     </Route>
     <Route element={<LoginLayout/>}>
     <Route path="/user/login" element={<Login fontChange ={fontChange}/>}/>
      <Route path="/auth/signUp" element={<Regist fontChange={fontChange}/>}/>  
     </Route>
     <Route element={<BoardLayout setBackColor ={setBackColor} setBackImage={setBackImage} currentUser={currentUser} userCustom={userCustom}/>}>
      <Route path="/board/write" element={<Write currentUser={currentUser} fontChange={fontChange}/>}/>
      <Route path="/board/read/:diary_id" element={<Read currentUser={currentUser} fontChange={fontChange}/>}/> 
      <Route path="/board/edit/:diary_id" element={<Edit currentUser={currentUser} fontChange={fontChange}/>}/> 
      <Route path="/contactUs" element={<ServiceCenter currentUser={currentUser} fontChange={fontChange}/>}/> 
      </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

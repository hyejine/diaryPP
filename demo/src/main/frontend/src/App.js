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
import { useDispatch } from "react-redux";
import { setCustom } from "./reducer/userSlice";
function App() {
  const currentUser = useSelector(state => state.currentUser);
  const userCustom = useSelector(state => state.userCustom);
  const dispatch = useDispatch();
  const [backColor, setBackColor ] = useState('#FFE99D');
  const [backImage, setBackImage ] = useState();
  const [fontChange, setFontChange ] = useState();
  
  useEffect(()=>{
    if(currentUser?.email){
      console.log("로그인 됨", currentUser.email);
      if(userCustom.font){
        console.log("폰트변경", userCustom.font );
        setFontChange(userCustom.font);
      } 
      else if(currentUser.font !== undefined){
        console.log("사용자 폰트 존재", currentUser.font);
        setFontChange(currentUser.font);
      } else {
        console.log("사용자 폰트, 폰트 변경 안함");
        setFontChange('DungGeunMo');
      }
    } else {
      console.log("로그인 안됨");
      setFontChange('DungGeunMo');
    }
  },[currentUser, userCustom, backColor, backImage]); 
console.log(backColor, backImage);
  // useEffect(()=>{
  //   if(currentUser?.email){
  //     console.log("로그인 됨", currentUser.email);
  //   if (userCustom.backColor !== undefined || userCustom.backImage !== undefined){
  //     console.log(" 배경변경", userCustom.background);
  //     setBackColor(userCustom.backColor);
  //     setBackImage(userCustom.backImage);
  //   }       else if(currentUser.background !== undefined ){
  //     console.log("사용자 배경 존재", currentUser.background);
  //     // setFontChange(currentUser.font);
  //   } else {
  //     console.log("사용자 배경, 배경 변경 안함");
  //     setBackColor('#FFE99D');
  //   }
  //  } else {
  //     console.log("로그인 안됨");
  //     setBackColor('#FFE99D');
  //   }
  // },[currentUser, userCustom])

  return (
    <div className="allPage " style={ backImage ? {background: `url(${backImage})`, fontFamily: `${fontChange}`} : { background: `${backColor}`, fontFamily: `${fontChange}` } }>
      {/* style={ backColor ? { background: `${backColor}`, fontFamily: `${fontChange}` } : backImage ? { background: `url(${backImage})`, fontFamily: `${fontChange}`, backgroundSize: '30%' } : { background: '#fdd8ed', backgroundSize: '30%', fontFamily: `${fontChange}` }} */}
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout fontChange={fontChange} currentUser={currentUser} userCustom ={userCustom} />}>
      <Route path="/" element={<CalendarCom />} />
     </Route>
     <Route element={<LoginLayout/>}>
     <Route path="/user/login" element={<Login fontChange ={fontChange}/>}/>
      <Route path="/auth/signUp" element={<Regist fontChange={fontChange}/>}/>  
     </Route>
     <Route element={<BoardLayout setBackColor ={setBackColor} setBackImage={setBackImage} setFontChange={setFontChange} fontChange={fontChange} />}>
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

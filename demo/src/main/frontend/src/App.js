import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Main from "./Main";
import Regist from "./components/login/regist/Regist";
import Write from "./components/board/Write";
import { useSelector } from "react-redux";
import EmojiPurchase from "./components/emoji/EmojiPurchase";
import MainLayout from "./components/layout/MainLayout";
import BoardLayout from "./components/layout/BoardLayout";
import Edit from "./components/board/Edit";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';

function App(props) {
  const currnetUser = useSelector(state => state.user);

  return (
    <div className="allPage">
    <BrowserRouter>
      <Routes>
      <Route element={<MainLayout />}>
      <Route path="/" element={<Main />} currentUser={props?.currnetUser}/>
      <Route path="/auth/login" element={<Login/>}/>
      <Route path="/login/regist" element={<Regist/>}/>  
      <Route path="/board/write" element={<Write/>}/>
      <Route path="/emoji" element={<EmojiPurchase/>}/> 
     </Route>
     <Route element={<BoardLayout />}>
      <Route path="/board/edit" element={<Edit/>}/> 
      </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

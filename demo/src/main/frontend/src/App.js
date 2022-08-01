import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Main from "./Main";
import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

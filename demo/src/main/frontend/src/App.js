import { BrowserRouter, Route, Routes } from "react-router-dom";
import Write from "./components/Write";
import Main from "./Main";
// import './main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Route path="/" element={<Main />}></Route>
        {/* <Route path="/write" element={<Write />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

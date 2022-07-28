import { BrowserRouter, Route, Routes } from "react-router-dom";
import Write from "./components/Write";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Business from "./Pages/Business";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bussiness" element={<Business />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;

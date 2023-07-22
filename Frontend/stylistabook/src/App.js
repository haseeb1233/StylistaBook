import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Business from "./Pages/Business";
import Details from "./Components/Details/Details";
import Categories from "./Components/Categories/Categories";
import Stylist from "./Components/Signup/Stylist"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bussiness" element={<Business />} /> 
        <Route path="/details" element={<Details/>} /> 
        <Route path="/cat" element={<Categories/>} /> 
        <Route path="/sign" element={<Stylist/>} /> 

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Business from "./Pages/Business";
import Client from "./Components/Signup/Client"
import Login from "./Components/Login"
import Stylist from "./Components/Signup/Stylist"


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Client/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/styl" element={<Stylist/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
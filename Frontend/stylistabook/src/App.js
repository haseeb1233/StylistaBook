import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Business from "./Pages/Business";
import BusinessApointments from "./Pages/BusinessApointments";
import Requests from "./Pages/Requests";
import BSprofile from "./Pages/BSprofile";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/business" element={<Business />} />
        <Route exact path="/appointments" element={<BusinessApointments />} />
        <Route exact path="/requests" element={<Requests />} />
        <Route exact path="/business/bsprofile" element={<BSprofile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

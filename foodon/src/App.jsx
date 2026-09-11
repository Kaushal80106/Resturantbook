import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Home from "./pages/Home.jsx"
import NotFound from "./pages/NotFound.jsx"
import Success from "./pages/Success.jsx"
import Admin from "./pages/Admin.jsx"


function App() {
  return <Router>
  <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="*" element={<NotFound />}/>

    </Routes>
  </Router>
};

export default App
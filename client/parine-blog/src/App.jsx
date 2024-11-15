import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';

import Login from "./assets/pages/Auth/Login";
import Register from "./assets/pages/Auth/Register";  // Keep only one import for Register
import Home from "./assets/pages/Home/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/home";
import Operators from "./pages/operators/operators";
import { NavBar } from "./components";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operators" element={<Operators />} />
      </Routes>
    </Router>
  );
}

export default App;

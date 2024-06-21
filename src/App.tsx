import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Operators from "./pages/operators";
import { NavBar } from "./components";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/operators" element={<Operators />} />
      </Routes>
    </>
  );
}

export default App;

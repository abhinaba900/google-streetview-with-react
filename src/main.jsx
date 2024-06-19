import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React360Vue from "./React360Vue.jsx";
import Three from "./Three.jsx";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<React360Vue />} />
      <Route path="/three" element={<Three />} />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AllRoutes />
  </BrowserRouter>
);

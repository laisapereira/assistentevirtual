import Footer from "../Footer/index.tsx";
import "../../../src/index.css";
import Chatbot from "../../pages/Chatbot/index.tsx";
import React from "react";

import Home from "../../pages/Home/index.tsx";

import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="body-page">
      <section className="main-section">
        <h1>Pagina inicial</h1>
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

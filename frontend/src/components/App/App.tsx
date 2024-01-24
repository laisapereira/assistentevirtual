import Footer from "../Footer/index.tsx";
import "../../../src/index.css";
import Chatbot from "../../pages/Chatbot/index.tsx";
import React from "react";

import Home from "../../pages/Home/index.tsx";

import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "../../contexts/Auth/RequireAuth.tsx";

export default function App() {
  return (
    <div className="body-page">
      <section className="main-section">
        <h1>Pagina inicial</h1>
        <nav>
          <a href="/" style={{ margin: "15px" }}>
            Home
          </a>
          <a href="/private">Chatbot</a>
        </nav>
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<RequireAuth><Chatbot/></RequireAuth>} />
      </Routes>
    </div>
  );
}

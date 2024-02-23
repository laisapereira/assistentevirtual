import "../../../src/index.css";
import Chatbot from "../../pages/Chatbot/index.tsx";
import React, { useContext, useState } from "react";

import Home from "../../pages/Home/index.tsx";

import { Link, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../../contexts/Auth/RequireAuth.tsx";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";
import Register from "../../pages/Register/index.tsx";
import { Header } from "../Header/index.tsx";
import { Footer } from "../Footer/index.tsx";

export default function App() {
  const auth = useContext(AuthContext);

  return (
    <div>
      <Header />

      {auth.user && <button onClick={auth.signOut}>Sair</button>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/private"
          element={
            <RequireAuth>
              <Chatbot />
            </RequireAuth>
          }
        />

        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

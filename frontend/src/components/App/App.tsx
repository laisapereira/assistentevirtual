import Footer from "../Footer/index.tsx";
import "../../../src/index.css";
import Chatbot from "../../pages/Chatbot/index.tsx";
import React, { useContext, useState } from "react";

import { Link, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Chatbot />
    </div>
  );
}
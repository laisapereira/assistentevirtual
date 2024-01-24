import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./components/App/App.tsx";
import "../src/index.css";
import { AuthProvider } from "./contexts/Auth/AuthProvider.tsx";

const rootElement =
  document.getElementById("root") || document.createElement("div");
  ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

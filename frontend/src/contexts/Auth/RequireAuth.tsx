import { useContext } from "react";
import { AuthContext } from "./AuthContext.tsx";
import { Login } from "../../pages/Login/index.tsx";
import React from "react";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {

  const auth = useContext(AuthContext)

  if (!auth.user) {
    return <Login />;
  }
  return children;
}
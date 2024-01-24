//usar o contexto para o resto da aplicação

import { useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const signIn = async (email: string, password: string) => {
    
  };
  const signOut = async () => {};

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

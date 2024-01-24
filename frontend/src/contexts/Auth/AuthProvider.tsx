//usar o contexto para o resto da aplicação

import { useState } from "react";
import React from "react";
import { AuthContext } from "./AuthContext.tsx";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi.ts";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  const signIn = async (email: string, password: string) => {
    const data = await api.signIn(email, password);

    if (data.user && data.success) {
      setUser(data.user);
     
      return true;
    }
    return false;
  };
  const signOut = async () => {
    await api.logout()
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

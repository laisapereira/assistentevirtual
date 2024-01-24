import { createContext } from "react";
import { User } from "../../types/User.ts";

export type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(null!);

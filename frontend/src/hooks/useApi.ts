import axios from "axios";
import mockUsers from "../types/User.ts";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const user = mockUsers.find((u) => u.id === +token); // Simula que o token é o ID do usuário
    if (user) {
      return { success: true, user, token };
    } else {
      return { success: false, message: 'Token inválido' };
    }
    
    /* const response = await api.post("/validateToken", { token }); 
    return response.data; */
  },

  signIn: async (email: string, password: string) => {
   
    const user = mockUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        return { success: true, user };
    } else {
      return { success: false, message: 'Usuário ou senha incorretos' };
    }
   
    /*  const response = await api.post("/signIn", { email, password }); 
    
 /*    return response.data; */
  },

  logout: async () => {

    return { success: true };
   /*  const response = await api.post("/logout");
    return response.data; */
  },
});

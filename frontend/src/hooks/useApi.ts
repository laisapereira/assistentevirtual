import axios from "axios";
import mockUsers from "../types/User.ts";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    
 /*  const response = await api.post("/validateToken", { token }); 
  return response.data; 
 */
  const user = mockUsers.find((user) => user.id === +token); // simulando que o token é o ID do usuário
    if (user) {
      return { success: true, user, token };
    } else {
      return { success: false, message: "Token inválido" };
    }
  },

  signIn: async (email: string, password: string) => {
    
 try {
      const response = await api.post("/signIn", { email, password });
      console.log(response.data);

      const token = response.data.token;
      Cookies.set("authToken", token)
      return response.data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Re-throw the error so it can be handled by the caller
    }
 
   const user = mockUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      return {
        user,
        token: user?.id
      };
    } else {
      return { success: false, message: "Usuário ou senha incorretos" };
    }

  },

  logout: async () => {
    
    const response = await api.post("/logout");
    return response.data; 

    return { success: true };
  },
});

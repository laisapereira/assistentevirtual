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

      const token = response.data.token as string;
      Cookies.set("authToken", token);
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  logout: async () => {
    Cookies.remove("authToken");
    window.location.reload()
    return { success: true };
  },
});

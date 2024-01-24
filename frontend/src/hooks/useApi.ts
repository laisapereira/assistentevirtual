import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/validateToken", { token });
    return response.data;
  },

  signIn: async (email: string, password: string) => {
    const response = await api.post("/signIn", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});

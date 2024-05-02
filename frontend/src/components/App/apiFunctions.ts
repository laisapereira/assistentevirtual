import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "http://172.16.1.66:8000",
});

/* // interceptador de solicitação adicionado à instância do axios:
// unção que é chamada antes de cada solicitação ser enviada.
//A função obtém o token do cookie e o adiciona ao cabeçalho Authorization da solicitação

API.interceptors.request.use((config) => {
  const token = Cookies.get("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Token:", token);
  console.log("Request headers:", config.headers);
  return config;
});
*/

export const sendMessage = async (message: string) => {
  const token = Cookies.get("authToken");
  const response = await API.post(
    "/",
    { chats: message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.output;
};

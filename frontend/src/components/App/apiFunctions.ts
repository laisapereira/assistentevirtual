import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://172.16.1.66:9000/";

const API = axios.create({
  baseURL,
});

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

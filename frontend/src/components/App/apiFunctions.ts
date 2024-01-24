import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

export const sendMessage = async (message: string) => {
  const response = await API.post('/', { chats: message });
  return response.data.output;
};

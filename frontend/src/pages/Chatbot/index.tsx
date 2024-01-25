import { useContext, useState } from "react";
import ChatForm from "../../components/Form/index.tsx";
import { sendMessage } from "../../components/App/apiFunctions.ts";

import "./chatbot.css";
import React from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";

const Chatbot = () => {
  const [chatLog, setChatLog] = useState([]);
  const auth = useContext(AuthContext);

  const handleSubmit = async (userMessage: string) => {
    const botResponse = await sendMessage(userMessage);

    setChatLog(
      (prevChatLog: { type: string; message: any; profilePic: string }[]) => [
        ...prevChatLog,
        {
          type: "user",
          message: userMessage,
          profilePic: "../../assets/user.svg",
        },
        {
          type: "bot",
          message: botResponse.text,
          profilePic: "../../assets/logo.svg",
        },
      ]
    );
  };

  return (
    <div className="chatbot">
      <h1>Assistente Virtual FJS</h1>
      <h3> Olá, {auth.user?.name}! Tudo bem? </h3>
      <div className="chat-box">
        <div className="chat-log" id="chat-log">
          {chatLog.map((entry, index) => (
            <div key={index} className="message-container">
              <img
                className="profile-pic"
                src={entry.profilePic}
                alt={entry.type === "user" ? "Foto do Usuário" : "Foto do Bot"}
              />
              <div className={`${entry.type}-message message-content`}>
                <p>{entry.message}</p>
              </div>
            </div>
          ))}
        </div>
        <ChatForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Chatbot;

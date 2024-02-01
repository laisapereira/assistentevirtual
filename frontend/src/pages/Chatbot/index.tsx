import { useState } from "react";
import ChatForm from "../../components/Form/index.tsx";
import { sendMessage } from "../../components/App/apiFunctions.ts";

import "./chatbot.css";
import React from "react";
import { Link } from "react-router-dom";

import logoFjs from "../../assets/logo.svg";
import bannerFjs from "../../assets/banner-fjs.svg";
import iconUser from "../../assets/user.svg";
import { GearFine } from "@phosphor-icons/react";
import { ChatEntry } from "../../types/types.ts";

const Chatbot = () => {
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);

  const handleSubmit = async (userMessage: string) => {
    const botResponse = await sendMessage(userMessage);

    setChatLog((prevChatLog: ChatEntry[]) => [
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
    ]);
  };

  return (
    <div className="main-chat">
      <aside className="aside-header">
        <img src={logoFjs} alt="Logo" className="img-logo" />
        <section className="banner-aside">
          <button>
            <Link to="/">voltar à Home</Link>
          </button>
          <img src={bannerFjs} alt="Banner-Fjs" />
        </section>

        <div className="footer-aside">
          <img src={iconUser} alt="user" />
          <section>
            <p>Paula</p>
            <p>Ascom</p>
          </section>
          <GearFine size={60} color="white" />
        </div>
      </aside>

      <section className="chat-box">
        <div className="chat-log">
          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center ${
                entry.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <img
                className="w-6 h-6 rounded-full mr-2"
                src={entry.profilePic}
                alt={entry.type === "user" ? "Foto do Usuário" : "Foto do Bot"}
              />
              <div
                className={`flex max-w-xs mx-16 my-10 p-3 rounded-lg shadow-lg ${
                  entry.type === "user"
                    ? "bg-main-white text-black"
                    : "bg-main-purple text-main-white"
                }`}
              >
                <div className="flex items-center">
                  <p>{entry.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ChatForm onSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export default Chatbot;

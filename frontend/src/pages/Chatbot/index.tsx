import { useState } from "react";
import ChatForm from "../../components/Form/index.tsx";
import { sendMessage } from "../../components/App/apiFunctions.ts";

import Swal from "sweetalert2";

import "./chatbot.css";
import React from "react";
import { Link } from "react-router-dom";

import logoChat from "../../public/logo-chat.svg";

import logoFjs from "../../public/logo.svg";
import bannerFjs from "../../public/banner-fjs.svg";
import iconUser from "../../public/generic-user.svg";
import { ArrowLeft, DotsThreeVertical, GearFine } from "@phosphor-icons/react";
import { ChatEntry } from "../../types/types.ts";

const Chatbot = () => {
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (userMessage: string) => {
    setChatLog((prevChatLog: ChatEntry[]) => [
      ...prevChatLog,
      {
        type: "user",
        message: userMessage,
      },
      {
        type: "bot",
        message: "...",
      },
    ]);

    setIsProcessing(true);
    const botResponse = await sendMessage(userMessage);
    setIsProcessing(false);

    setChatLog((prevChatLog: ChatEntry[]) => {
      const newChatLog = [...prevChatLog];
      newChatLog[newChatLog.length - 1] = {
        type: "bot",
        message: botResponse.text,
      };
      return newChatLog;
    });
  };

  const handleAlert = () => {
    Swal.fire({
      title: "Olá, obrigada por testar!",
      text: "Essa é uma versão de demonstração da Jô, em breve teremos mais funcionalidades.",
      icon: "info",
      showCancelButton: false,
      confirmButtonColor: "#5252F1",
      confirmButtonText: "Voltar ao Chat",
    }).then((result) => {
      /*  if (result.isConfirmed) {
        console.log("Voltar ao Chat");
      } */
    });
  };

  return (
    <div className="main-chat">
      <aside className="aside-header">
        <img src={logoFjs} alt="Logo" className="img-logo" />
        <section className="banner-aside">
          <img src={bannerFjs} alt="Banner-Fjs" />
        </section>

        <div className="footer-aside">
          <img className="w-[50px]" src={iconUser} alt="user" />
          <section>
            <p>Usuário</p>
            <p>Setor</p>
          </section>
          <div onClick={handleAlert}>
            <GearFine size={40} color="white" />
          </div>
        </div>
      </aside>

      <section className="chat-box">
        <div className="chat-log">
          <div className="flex justify-between items-center max-w-full p-4 pt-10 px-12">
            <ArrowLeft size={50} />

            <button onClick={handleAlert}>
              <DotsThreeVertical size={50} color="black" />
            </button>
          </div>
          {chatLog.map((entry, index) => (
            <div
              key={index}
              className={`flex pl-6 items-start ${
                entry.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <img
                className="w-[110px] h-auto"
                src={entry.type === "user" ? iconUser : logoChat}
                alt={entry.type === "user" ? "Foto do Usuário" : "Foto do Bot"}
              />
              <div
                className={`flex w-[50%] max-w-[55%] mx-16 my-10 p-3 rounded-lg shadow-lg ${
                  entry.type === "user"
                    ? "bg-main-white text-black"
                    : "bg-main-purple text-main-white ml-[0rem] mt-[4rem]"
                }`}
              >
                <div className="p-5 font-inter text-justify">
                  <p className="text-[1.5rem] leading-[3rem]">
                    {entry.message}
                  </p>
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
import { useState } from 'react';
import ChatForm from '../Form/index';
import { sendMessage } from '../App/apiFunctions';

import './chatbot.css';
import React from 'react';

const Chatbot = () => {
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (userMessage: string) => {
    const botResponse = await sendMessage(userMessage);

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: userMessage, profilePic: '../../assets/user.svg' },
      { type: 'bot', message: botResponse.text, profilePic: '../../assets/logo.svg' },
    ]);
  };

  return (
    <div className="chatbot">
      <h1>Assistente Virtual FJS</h1>
      <div className="chat-box">
        <div className="chat-log" id="chat-log">
          {chatLog.map((entry, index) => (
            <div key={index} className="message-container">
              <img
                className="profile-pic"
                src={entry.profilePic}
                alt={entry.type === 'user' ? 'Foto do Usuário' : 'Foto do Bot'}
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

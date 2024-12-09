import React, { useState, FormEvent } from "react";
import PropTypes from "prop-types";
import "./chatform.css";

interface ChatFormProps {
  onSubmit: (input: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-submit">
  <div className="input-wrapper">
    <textarea
      id="user-input"
      name="user-input"
      placeholder="Digite sua dúvida..."
      value={input}
      onChange={handleInputChange}
      rows={1}
    />
    <button type="submit">Enviar</button>
  </div>
</form>

  );
};

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatForm;

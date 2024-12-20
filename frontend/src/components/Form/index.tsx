import React, { useState, FormEvent } from "react";
import PropTypes from "prop-types";
import "./chatform.css";

interface ChatFormProps {
  onSubmit: (input: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputField = e.target as HTMLTextAreaElement;
    inputField.style.height = "auto"; // Reseta a altura para ajustar novamente
    inputField.style.height = `${inputField.scrollHeight}px`; // Ajusta a altura dinamicamente
    setInput(inputField.value); // Atualiza o estado com o valor digitado
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() !== "") {
      onSubmit(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-submit">
      <textarea
        id="user-input"
        name="user-input"
        placeholder="Digite sua dúvida..."
        value={input}
        onChange={handleInputChange}
        rows={1} // Altura inicial do campo de texto
        style={{ overflow: "hidden", resize: "none" }} // Evita redimensionamento manual
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatForm;

import React, { useState, FormEvent } from "react";
import PropTypes from "prop-types";
import "./chatform.css";

interface ChatFormProps {
  onSubmit: (input: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit }) => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  // Verifica se o navegador suporta SpeechRecognition
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Seu navegador não suporta Web Speech API");
  }

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.lang = "pt-BR"; // Configura para português

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Erro de reconhecimento de voz:", event.error);
    };
  }

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setListening(false);
      recognition.stop();
    }
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
        onChange={(e) => setInput(e.target.value)}
        rows={3} // Número de linhas iniciais
      />
      <div className="button-group">
        <button type="submit">Enviar</button>
        <button
          type="button"
          onMouseDown={startListening}
          onMouseUp={stopListening}
          onTouchStart={startListening} // Suporte para toque móvel
          onTouchEnd={stopListening} // Suporte para toque móvel
          className={listening ? "listening" : ""}
        >
          {listening ? "Gravando..." : "🎤"}
        </button>
      </div>
    </form>
  );
};

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ChatForm;
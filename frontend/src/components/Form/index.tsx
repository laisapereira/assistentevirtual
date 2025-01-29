import React, { useState, useRef, FormEvent } from "react";
import PropTypes from "prop-types";
import "./chatform.css";

interface ChatFormProps {
  onSubmit: (input: string) => void;
  onAudioRecorded?: (audioBlob: Blob) => void; // Callback para enviar o áudio
}

const ChatForm: React.FC<ChatFormProps> = ({ onSubmit, onAudioRecorded }) => {
  const [input, setInput] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);

  // Iniciar a gravação de áudio
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("O navegador não suporta captura de áudio.");
      alert("Seu navegador não suporta a gravação de áudio.");
      return;
    }
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
  
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
  
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = []; // Resetar os chunks
        if (onAudioRecorded) {
          onAudioRecorded(audioBlob); // Enviar o áudio para processamento
        }
      };
  
      mediaRecorder.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error);
      alert("Não foi possível acessar o microfone. Verifique as permissões do navegador.");
    }
  };
  

  // Parar a gravação de áudio
  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
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
          onMouseDown={startRecording} // Começa a gravação ao pressionar
          onMouseUp={stopRecording} // Para a gravação ao soltar
          onTouchStart={startRecording} // Suporte para toque móvel
          onTouchEnd={stopRecording} // Suporte para toque móvel
          className={recording ? "recording" : ""}
        >
          {recording ? "Gravando..." : "🎤"}
        </button>
      </div>
    </form>
  );
};

ChatForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onAudioRecorded: PropTypes.func, // Callback opcional
};

export default ChatForm;

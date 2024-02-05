import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (email && password) {
      const isLogged = await auth.signIn(email, password); // chamando função require (auth) [que vem do AuthContext], que chama o customhook api pra fazer a requisição no db
      if (isLogged) {
        navigate("/private");
      } else {
        alert("Email ou senha incorretos");
      }
    }
  };
  return (
    <div>
      <h1>Login</h1>

      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

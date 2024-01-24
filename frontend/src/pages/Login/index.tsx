import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div>
      <h1>Página Fechada - Login</h1>

      <form>
        <input type="text" placeholder="Email" value={email} />
        <input type="password" placeholder="Senha" value={password} />
        <button type="submit">Entrar</button>
      </form>

      <button onClick={handleLogin}>Logar</button>
    </div>
  );
};

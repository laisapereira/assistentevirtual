import React from 'react';
import Login from '../Login/LoginDiv.tsx';
import Cadastro from '../cadastro/Cadastro.tsx';

export default function App() {
  return (
    <div className="body-page">
      <section className="main-section">
        <Cadastro/>
      </section>
    </div>
  );
}

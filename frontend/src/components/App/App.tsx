import Footer from '../Footer/index.tsx'
import '../../../src/index.css';
import Chatbot from '../Chatbot/index.tsx';
import React from 'react';

export default function App() {
  return (
    <div className="body-page">
      <section className="main-section">
        <Chatbot />
        <Footer />
      </section>
    </div>
  );
}

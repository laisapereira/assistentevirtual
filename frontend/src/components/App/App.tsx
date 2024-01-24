import Footer from '../Footer/index';
import '../../../src/index.css';
import Chatbot from '../Chatbot/index';
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

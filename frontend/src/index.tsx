import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "../src/components/App/App.tsx"
import '../src/index.css';

const rootElement = document.getElementById('root') || document.createElement('div');
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


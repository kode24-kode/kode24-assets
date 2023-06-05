import React from 'react';
import ReactDOM from 'react-dom/client';
import '../scss/main.scss';
import App from './App.tsx';

ReactDOM.createRoot(
  document.getElementById(
    'articles-above-first-banner'
  ) as HTMLElement
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

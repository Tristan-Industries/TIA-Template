import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TiaProvider } from './tia-sdk';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TiaProvider>
      <App />
    </TiaProvider>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WindowsProvider } from './store/WindowsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowsProvider>
      <App />
    </WindowsProvider>
  </React.StrictMode>
);

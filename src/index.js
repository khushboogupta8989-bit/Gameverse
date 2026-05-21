import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
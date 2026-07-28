import React from 'react';
import ReactDOM from 'react-dom/client';
import './legacy/app.css';
import { ErrorBoundary, App } from './legacy/app.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.jsx';
import { markReady } from './update.js';

markReady(); // 새 화면이 정상으로 켜졌다고 바로 알림(안 하면 이전 화면으로 자동 되돌림)

createRoot(document.getElementById('root')).render(<App />);

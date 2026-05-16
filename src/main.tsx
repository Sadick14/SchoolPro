import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initOfflineDB } from '@/shared/lib/offlineSync';
import { initAuth } from '@/shared/lib/auth';
import registerSW from './registerSW';

// Initialize offline database and auth
Promise.all([initOfflineDB(), initAuth(), registerSW()])
  .then(() => {
    console.log('App initialized successfully');
  })
  .catch((error) => {
    console.error('Error initializing app:', error);
  });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
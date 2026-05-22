import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { StrictMode } from 'react'
import { CartProvider } from './context/CartContext';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
     <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
    </CartProvider>
  </StrictMode>,
)

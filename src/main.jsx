import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LogoProvider } from './context/LogoContext'
import { LoadingProvider } from './context/LoadingContext'
import './index.css'
import App from './App.jsx'

// Disable automatic scroll restoration
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <LoadingProvider>
        <LogoProvider>
          <App />
        </LogoProvider>
      </LoadingProvider>
    </BrowserRouter>
)

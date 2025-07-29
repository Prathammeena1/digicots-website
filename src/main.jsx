import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LogoProvider } from './context/LogoContext'
import { LoadingProvider } from './context/LoadingContext'
import { ApproachAnimationProvider } from './context/ApprachAnimationContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <LogoProvider>
          <ApproachAnimationProvider>
            <App />
          </ApproachAnimationProvider>
        </LogoProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
)

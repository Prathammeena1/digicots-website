import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LogoProvider } from './context/LogoContext'
import { LoadingProvider } from './context/LoadingContext'
import './index.css'
import App from './App.jsx'
import HomeThirdSection from './sections/HomeThirdSection.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <LogoProvider>
            <App />
        </LogoProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
  // <HomeThirdSection />
)

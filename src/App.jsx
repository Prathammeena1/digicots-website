import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { useLenis } from './hooks/useLenis'

const App = () => {
  // Initialize Lenis smooth scroll
  useLenis()

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/branding" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Branding</h1></div>} />
          <Route path="/marketing" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Marketing</h1></div>} />
          <Route path="/web-digital" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Web & Digital</h1></div>} />
          <Route path="/graphics" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Graphics</h1></div>} />
          <Route path="/content" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Content</h1></div>} />
          <Route path="/production" element={<div className="p-8 pt-24"><h1 className="text-3xl font-gilroy-bold">Production</h1></div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
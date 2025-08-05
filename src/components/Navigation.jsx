import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogo } from '../context/LogoContext.jsx'

const Navigation = () => {
  const location = useLocation()
  const navRef = useRef()
  
  // Get the shared logo ref from context
  const { navigationLogoRef } = useLogo()

  const navItems = [
    { path: '/branding', label: 'Branding' },
    { path: '/marketing', label: 'Marketing' },
    { path: '/web-digital', label: 'Web & Digital' },
    // { path: '/graphics', label: 'Graphics' },
    { path: '/about', label: 'About' },
    { path: '/content', label: 'Content' },
    { path: '/production', label: 'Production' }
  ]

  gsap.registerPlugin(ScrollTrigger)

  return (
    <nav ref={navRef} className="fixed bg-transparent backdrop-blur top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-center gap-18 items-center h-20">
          {/* Left side navigation */}
          <div className="flex items-center space-x-18">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white font-gilroy-semibold text-sm tracking-wide hover:text-pink-300 transition-colors duration-300 navigation-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Center logo */}
          <div ref={navigationLogoRef} className="flex items-center">
            <Link to="/" className="logo-container">
              <img src="/images/logo-1.svg" className='w-30' alt="" />
            </Link>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center space-x-18">
            {navItems.slice(3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-white font-gilroy-semibold text-sm tracking-wide hover:text-pink-300 transition-colors duration-300 navigation-item"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogo } from "../context/LogoContext.jsx";

const Navigation = () => {
  const location = useLocation();
  const navRef = useRef();

  // Get the shared logo ref from context
  const { navigationLogoRef } = useLogo();

  const navItems = [
    { path: "/branding", label: "Branding" },
    { path: "/marketing", label: "Marketing" },
    { path: "/web-digital", label: "Web & Digital" },
    // { path: '/graphics', label: 'Graphics' },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  gsap.registerPlugin(ScrollTrigger);

  return (
    <nav
      ref={navRef}
      className="fixed bg-white/50 backdrop-blur-md top-0 left-0 right-0 z-50 flex items-center justify-center"
    >
        <div className="flex justify-center gap-18 items-center h-20">
          {/* Left side navigation */}
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="dark:text-white font-gilroy-semibold w-30 text-center text-[17px] tracking-wide hover:text-pink-300 transition-colors duration-300 navigation-item"
            >
              {item.label}
            </Link>
          ))}

          {/* Preload logo for optimization */}
          <link rel="preload" as="image" href="/images/logo-1.svg" />

          <Link to="/" className="logo-container ml-7">
            {/* <img src="/images/logo-1.svg" className='w-30' alt="" /> */}
            <img src="/images/logo-black.svg" className="w-30" alt="" />
          </Link>

          {navItems.slice(3).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="dark:text-white font-gilroy-semibold w-30 text-center text-[17px] tracking-wide hover:text-pink-300 transition-colors duration-300 navigation-item"
            >
              {item.label}
            </Link>
          ))}
        </div>
    </nav>
  );
};

export default Navigation;

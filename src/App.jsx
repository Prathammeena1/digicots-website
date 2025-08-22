import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import { useLenis } from "./hooks/useLenis.js";
import { useLoading } from "./context/LoadingContext.jsx";
// import { resetScrollState } from "./utils/scrollUtils.js";
import Approach from "./pages/Approach.jsx";
import Footer from "./components/Footer.jsx";
import ThankyouPopUp from "./sections/ThankyouPopup.jsx";
import ServicesDetail from "./pages/ServicesDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Branding from "./pages/Branding.jsx";
import WebAndDigital from "./pages/WebAndDigital.jsx";

// Lazy load heavy components
const FluidCanvas = React.lazy(() => import("./components/FluidCanvas.jsx"));
const WolfMaskSVG = React.lazy(() => import("./components/WolfMaskSVG.jsx"));

const App = () => {
  // Initialize Lenis smooth scroll
  // useLenis();

  // Get current location for route changes
  const location = useLocation();

  // Get loading state
  const { isLoading } = useLoading();

  const [popActive, setPopActive] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IMMEDIATE scroll reset on route change - useLayoutEffect runs before useEffect
  useLayoutEffect(() => {
    // This runs synchronously before the browser paints
    // Disable scroll restoration
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    // Immediate reset - runs before any other effects
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Stop Lenis immediately
    if (window.lenis) {
      window.lenis.stop();
      window.lenis.scrollTo(0, { immediate: true });
    }
    
    // Block animations
    window.isRouteChanging = true;
    
  }, [location.pathname]);

  // Re-enable scroll after layout
  useEffect(() => {
    const enableTimeout = setTimeout(() => {
      if (window.lenis) {
        window.lenis.start();
      }
      window.isRouteChanging = false;
    }, 100);
    
    return () => clearTimeout(enableTimeout);
  }, [location.pathname]);

  // Handle scroll to top with proper reset
  const handleScrollToTop = () => {
    // IMMEDIATELY reset scroll state before scrolling
    // resetScrollState();

    // Use Lenis smooth scroll to top if available
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        immediate: false,
        duration: 1.8, // Increased duration for smoother effect
        easing: (t) => {
          // Enhanced easing for ultra-smooth scroll
          return 1 - Math.pow(1 - t, 3); // Cubic ease-out
        },
        force: true, // Ensure scroll happens even if already at top
        onComplete: () => {
          // Double reset to ensure clean state
          // resetScrollState();

          // Ensure we're truly at the top
          if (window.lenis) {
            window.lenis.resize();
          }
        },
      });
    } else {
      // Enhanced fallback with smoother native scroll
      document.documentElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Reset state for fallback too
      setTimeout(() => {
        // resetScrollState();
      }, 100);
    }
  };

  // console.log(window.innerWidth);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Main App Content */}
      <div
        className={`h-full transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navigation />

        <div className="h-full w-full overflow-hidden fixed top-0 left-0 bg-white dark:bg-black">
          <ErrorBoundary>
            <Suspense fallback={<div className="w-full h-full bg-white" />}>
              {/* <FluidCanvas /> */}
              {/* <WolfMaskSVG /> */}

              {/* <div className="h-full w-full absolute top-0 left-0 z-10 backdrop-blur-2xl pointer-events-none">

              </div> */}
            </Suspense>
          </ErrorBoundary>
        </div>

        <div
          onClick={handleScrollToTop}
          className={`fixed z-30 scroll-to-top dark:bg-amber-50 bg-zinc-800 h-[70px] w-[70px] right-10 bottom-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer ${
            showScrollTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="text-2xl font-semibold dark:text-zinc-600 text-zinc-100">↑</div>
        </div>

       

        <main className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/approach/:id" element={<Approach />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServicesDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/marketing" element={<Branding />} />
            <Route path="/web-digital" element={<WebAndDigital />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer setPopActive={setPopActive} />

          {/* your main content here */}
          <ThankyouPopUp
            popActive={popActive}
            onClose={() => setPopActive(false)}
          />
        </main>
      </div>
    </>
  );
};

export default App;


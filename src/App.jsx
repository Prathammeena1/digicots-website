import React, { Suspense, useEffect, useState } from "react";
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
import Approach from "./pages/Approach.jsx";
import Footer from "./sections/Footer.jsx";
import ThankyouPopUp from "./sections/ThankyouPopup.jsx";

// Lazy load heavy components
const FluidCanvas = React.lazy(() => import("./components/FluidCanvas.jsx"));
const WolfMaskSVG = React.lazy(() => import("./components/WolfMaskSVG.jsx"));

const App = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  // Get current location for route changes
  const location = useLocation();

  // Get loading state
  const { isLoading } = useLoading();

  const [popActive, setPopActive] = useState(false);

  // Scroll to top when route changes
  useEffect(() => {
    // Use enhanced route reset function if available
    if (window.lenisRouteReset) {
      window.lenisRouteReset();
    } else if (window.lenisReset) {
      // Fallback to regular reset
      window.lenisReset();
    }

    // Also reset native scroll position as fallback
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // Use 'auto' for instant scroll
    });

    // Additional safety reset with delay
    const timeoutId = setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true, force: true });
        window.lenis.resize(); // Recalculate scroll bounds
      }

      // Reset any remaining scroll state
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [location.pathname]); // Trigger when pathname changes

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

        <div className="h-full w-full overflow-hidden fixed top-0 left-0 bg-black">
          <ErrorBoundary>
            <Suspense fallback={<div className="w-full h-full bg-black" />}>
              <FluidCanvas />
              <WolfMaskSVG />
            </Suspense>
          </ErrorBoundary>
        </div>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/approach/:id" element={<Approach />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/branding"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Branding</h1>
                </div>
              }
            />
            <Route
              path="/marketing"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Marketing</h1>
                </div>
              }
            />
            <Route
              path="/web-digital"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Web & Digital</h1>
                </div>
              }
            />
            <Route
              path="/graphics"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Graphics</h1>
                </div>
              }
            />
            <Route
              path="/content"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Content</h1>
                </div>
              }
            />
            <Route
              path="/production"
              element={
                <div className="p-8 pt-24">
                  <h1 className="text-3xl font-gilroy-bold">Production</h1>
                </div>
              }
            />
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

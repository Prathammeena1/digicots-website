import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import { useLenis } from "./hooks/useLenis";
import { useLoading } from "./context/LoadingContext";

// Lazy load heavy components
const FluidCanvas = React.lazy(() => import("./components/FluidCanvas"));
const WolfMaskSVG = React.lazy(() => import("./components/WolfMaskSVG"));

const App = () => {
  // Initialize Lenis smooth scroll
  useLenis();
  
  // Get loading state
  const { isLoading, setIsLoading } = useLoading();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={handleLoadingComplete} 
      />

      {/* Main App Content */}
      <div className={`h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />

        <div className="h-full w-full overflow-hidden fixed top-0 left-0">
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
      </main>
      </div>
    </>
  );
};

export default App;

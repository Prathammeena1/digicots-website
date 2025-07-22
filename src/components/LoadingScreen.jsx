import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('LOADING');
  const [isExiting, setIsExiting] = useState(false);

  const loadingTexts = ['LOADING', 'LOADING.', 'LOADING..', 'LOADING...'];

  useEffect(() => {
    if (isLoading) {
      // Animate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                onLoadingComplete?.();
              }, 800);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Animate loading text
      const textInterval = setInterval(() => {
        setLoadingText(prev => {
          const currentIndex = loadingTexts.indexOf(prev);
          return loadingTexts[(currentIndex + 1) % loadingTexts.length];
        });
      }, 500);

      return () => {
        clearInterval(progressInterval);
        clearInterval(textInterval);
      };
    }
  }, [isLoading, onLoadingComplete]);

  useEffect(() => {
    if (isExiting) {
      // Exit animation
      gsap.to('.loading-screen', {
        opacity: 0,
        y: -100,
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isExiting]);

  if (!isLoading && !isExiting) return null;

  return (
    <div className="loading-screen fixed inset-0 z-[999999] bg-black flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo */}
        <div className="mb-12 loading-float">
          <img 
            src="/images/logo-2.svg" 
            alt="Digicots Logo" 
            className="h-16 w-auto mx-auto filter invert brightness-0 loading-pulse"
          />
        </div>

        {/* Loading text */}
        <div className="mb-8">
          <h1 className="font-palette-black text-4xl md:text-6xl text-white tracking-wider loading-shimmer">
            {loadingText}
          </h1>
          <p className="font-gilroy-light text-white/60 mt-4 text-lg loading-pulse">
            PREPARING YOUR EXPERIENCE
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="bg-white/10 h-1 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-gilroy-regular text-white/40 text-sm">
              {Math.floor(Math.min(progress, 100))}%
            </span>
            <span className="font-gilroy-regular text-white/40 text-sm">
              ALMOST READY
            </span>
          </div>
        </div>

        {/* Loading spinner */}
        <div className="mt-12 flex justify-center">
          <div className="relative">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 border-2 border-transparent border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
    </div>
  );
};

export default LoadingScreen;

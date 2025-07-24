import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate loading of resources
  useEffect(() => {
    const checkResourcesLoaded = () => {
      // Check if fonts are loaded
      const fontsLoaded = document.fonts.ready;
      
      // Check if images are loaded
      const images = document.querySelectorAll('img');
      const videos = document.querySelectorAll('video');
      
      Promise.all([
        fontsLoaded,
        ...Array.from(images).map(img => {
          return new Promise(resolve => {
            if (img.complete) {
              resolve();
            } else {
              img.addEventListener('load', resolve);
              img.addEventListener('error', resolve);
            }
          });
        }),
        ...Array.from(videos).map(video => {
          return new Promise(resolve => {
            if (video.readyState >= 3) {
              resolve();
            } else {
              video.addEventListener('canplaythrough', resolve);
              video.addEventListener('error', resolve);
            }
          });
        })
      ]).then(() => {
        // Add a minimum loading time for better UX
        // setTimeout(() => {
          setIsLoading(false);
        // }, 200);
      });
    };

    // Start checking after a short delay
    const timeoutId = setTimeout(checkResourcesLoaded, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    loadingProgress,
    setLoadingProgress
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

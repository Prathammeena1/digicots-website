import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      // Very fast progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            // Immediate completion
            onLoadingComplete?.();
            return 100;
          }
          return prev + Math.random() * 25;
        });
      }, 50);

      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black flex items-center justify-center">
      {/* Main loading content */}
      <div className="text-center">
        {/* Simple text logo */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'system-ui, sans-serif' }}>
            DIGICOTS
          </h1>
        </div>

        {/* Simple progress bar */}
        <div className="w-48 mx-auto">
          <div className="bg-gray-700 h-1 rounded-full">
            <div 
              className="h-full bg-white transition-all duration-100"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

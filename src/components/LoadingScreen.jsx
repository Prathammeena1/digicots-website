import React, { useEffect, useState } from 'react';

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Optimize initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading && mounted) {
      // Use requestAnimationFrame for smoother animation with less CPU usage
      let start = null;
      let rafId = null;
      
      const animateProgress = (timestamp) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        
        // Complete in 800ms max (faster than typical perceived loading time)
        const newProgress = Math.min(100, (elapsed / 800) * 100);
        setProgress(newProgress);
        
        if (newProgress < 100) {
          rafId = requestAnimationFrame(animateProgress);
        } else {
          // Callback with slight delay to ensure UI renders
          setTimeout(() => {
            onLoadingComplete?.();
          }, 50);
        }
      };
      
      rafId = requestAnimationFrame(animateProgress);
      
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, [isLoading, onLoadingComplete, mounted]);

  // Exit early if not loading or not mounted yet
  if (!isLoading || !mounted) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-white dark:bg-black flex items-center justify-center will-change-auto">
      {/* Main loading content - simplified for performance */}
      <div className="text-center">
        {/* Simple text logo - no images to load */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            DIGICOTS
          </h1>
        </div>

        {/* Optimized progress bar with hardware acceleration */}
        <div className="w-32 mx-auto">
          <div className="bg-zinc-300 h-px dark:bg-zinc-700 ">
            <div 
              className="h-full bg-black dark:bg-white"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

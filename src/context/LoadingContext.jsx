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

  // Comprehensive resource loading check
  useEffect(() => {
    const checkAllResourcesLoaded = async () => {
      try {
        const loadingSteps = [];
        let completedSteps = 0;

        const updateProgress = () => {
          completedSteps++;
          const progress = (completedSteps / loadingSteps.length) * 100;
          setLoadingProgress(Math.min(progress, 95)); // Keep 5% for final checks
        };

        // 1. Check if fonts are loaded
        loadingSteps.push(
          document.fonts.ready.then(() => {
            console.log('✅ Fonts loaded');
            updateProgress();
          })
        );

        // 2. Check all images (including background images)
        const images = document.querySelectorAll('img');
        const backgroundImages = [];
        
        // Find elements with background images
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
          const style = window.getComputedStyle(el);
          const bgImage = style.backgroundImage;
          if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
            const url = bgImage.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
            if (url && !url.startsWith('data:')) {
              backgroundImages.push(url);
            }
          }
        });

        // Load regular images
        images.forEach((img, index) => {
          loadingSteps.push(
            new Promise(resolve => {
              if (img.complete && img.naturalWidth > 0) {
                console.log(`✅ Image ${index + 1} already loaded`);
                updateProgress();
                resolve();
              } else {
                img.addEventListener('load', () => {
                  console.log(`✅ Image ${index + 1} loaded`);
                  updateProgress();
                  resolve();
                });
                img.addEventListener('error', () => {
                  console.log(`⚠️ Image ${index + 1} failed to load`);
                  updateProgress();
                  resolve();
                });
              }
            })
          );
        });

        // Load background images
        backgroundImages.forEach((url, index) => {
          loadingSteps.push(
            new Promise(resolve => {
              const img = new Image();
              img.onload = () => {
                console.log(`✅ Background image ${index + 1} loaded`);
                updateProgress();
                resolve();
              };
              img.onerror = () => {
                console.log(`⚠️ Background image ${index + 1} failed to load`);
                updateProgress();
                resolve();
              };
              img.src = url;
            })
          );
        });

        // 3. Check all videos
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
          loadingSteps.push(
            new Promise(resolve => {
              if (video.readyState >= 3) {
                console.log(`✅ Video ${index + 1} already loaded`);
                updateProgress();
                resolve();
              } else {
                video.addEventListener('canplaythrough', () => {
                  console.log(`✅ Video ${index + 1} loaded`);
                  updateProgress();
                  resolve();
                });
                video.addEventListener('error', () => {
                  console.log(`⚠️ Video ${index + 1} failed to load`);
                  updateProgress();
                  resolve();
                });
              }
            })
          );
        });

        // 4. Check for canvas elements and their contexts
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach((canvas, index) => {
          loadingSteps.push(
            new Promise(resolve => {
              // Check if canvas has been initialized
              const checkCanvas = () => {
                const ctx = canvas.getContext('2d') || canvas.getContext('webgl') || canvas.getContext('webgl2');
                if (ctx) {
                  console.log(`✅ Canvas ${index + 1} initialized`);
                } else {
                  console.log(`⚠️ Canvas ${index + 1} not initialized`);
                }
                updateProgress();
                resolve();
              };

              // Wait a bit for canvas to initialize
              setTimeout(checkCanvas, 500);
            })
          );
        });

        // 5. Check for CSS files
        loadingSteps.push(
          new Promise(resolve => {
            const styleSheets = document.styleSheets;
            let cssLoaded = 0;
            const totalCSS = styleSheets.length;

            if (totalCSS === 0) {
              console.log('✅ No CSS files to load');
              updateProgress();
              resolve();
              return;
            }

            for (let i = 0; i < totalCSS; i++) {
              try {
                const sheet = styleSheets[i];
                if (sheet.cssRules || sheet.rules) {
                  cssLoaded++;
                }
              } catch (e) {
                cssLoaded++; // Count as loaded even if we can't access rules
              }
            }

            if (cssLoaded === totalCSS) {
              console.log('✅ All CSS loaded');
              updateProgress();
              resolve();
            } else {
              setTimeout(() => {
                console.log('✅ CSS loading timeout reached');
                updateProgress();
                resolve();
              }, 1000);
            }
          })
        );

        // 6. Wait for DOM to be fully ready
        loadingSteps.push(
          new Promise(resolve => {
            if (document.readyState === 'complete') {
              console.log('✅ DOM already complete');
              updateProgress();
              resolve();
            } else {
              window.addEventListener('load', () => {
                console.log('✅ DOM loaded');
                updateProgress();
                resolve();
              });
            }
          })
        );

        // Wait for all resources to load
        await Promise.all(loadingSteps);

        // Final progress update
        setLoadingProgress(100);
        
        // Add a small delay to show 100% progress
        setTimeout(() => {
          console.log('🎉 All resources loaded successfully');
          setIsLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error loading resources:', error);
        // Even if there's an error, hide loading after timeout
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    };

    // Start resource checking after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAllResourcesLoaded, 100);

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

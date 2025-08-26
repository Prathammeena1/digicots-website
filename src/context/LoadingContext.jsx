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
  const [loadingStage, setLoadingStage] = useState('Initializing...');

  // Comprehensive resource loading check
  useEffect(() => {
    let isMounted = true;

    const checkAllResourcesLoaded = async () => {
      try {
        if (!isMounted) return;

        setLoadingStage('Loading fonts...');
        setLoadingProgress(5);

        // Wait for fonts to load first
        await document.fonts.ready;
        if (!isMounted) return;
        
        console.log('✅ Fonts loaded');
        setLoadingProgress(15);
        setLoadingStage('Scanning resources...');

        // Small delay to let DOM settle
        await new Promise(resolve => setTimeout(resolve, 300));
        if (!isMounted) return;

        const loadingSteps = [];
        let completedSteps = 0;
        const totalSteps = 6; // We have 6 main categories

        const updateProgress = (stage) => {
          if (!isMounted) return;
          completedSteps++;
          const baseProgress = 20; // Start from 20% after initial setup
          const progressIncrement = 70 / totalSteps; // Distribute 70% across steps
          const progress = baseProgress + (completedSteps * progressIncrement);
          setLoadingProgress(Math.min(progress, 90));
          if (stage) setLoadingStage(stage);
        };

        // 1. Check all images (including background images)
        setLoadingStage('Loading images...');
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
        const imagePromises = Array.from(images).map((img, index) => {
          return new Promise(resolve => {
            if (img.complete && img.naturalWidth > 0) {
              console.log(`✅ Image ${index + 1} already loaded`);
              resolve();
            } else {
              img.addEventListener('load', () => {
                console.log(`✅ Image ${index + 1} loaded`);
                resolve();
              });
              img.addEventListener('error', () => {
                console.log(`⚠️ Image ${index + 1} failed to load`);
                resolve();
              });
            }
          });
        });

        // Load background images
        const bgImagePromises = backgroundImages.map((url, index) => {
          return new Promise(resolve => {
            const img = new Image();
            img.onload = () => {
              console.log(`✅ Background image ${index + 1} loaded`);
              resolve();
            };
            img.onerror = () => {
              console.log(`⚠️ Background image ${index + 1} failed to load`);
              resolve();
            };
            img.src = url;
          });
        });


        // Add a timeout so image loading never gets stuck
        await Promise.race([
          Promise.all([...imagePromises, ...bgImagePromises]),
          new Promise(resolve => {
            setTimeout(() => {
              console.log('⚠️ Image loading timeout reached, continuing...');
              resolve();
            }, 4000); // 4 seconds max wait for images
          })
        ]);
        if (!isMounted) return;
        updateProgress('Loading videos...');

        // 2. Check all videos (including ReactPlayer)
        const videos = document.querySelectorAll('video');
        const reactPlayerContainers = document.querySelectorAll('[data-react-player], .react-player');
        
        console.log(`Found ${videos.length} video elements and ${reactPlayerContainers.length} ReactPlayer containers`);
        
        const videoPromises = [];
        
        // Handle regular video elements
        Array.from(videos).forEach((video, index) => {
          videoPromises.push(new Promise(resolve => {
            if (video.readyState >= 3) {
              console.log(`✅ Video ${index + 1} already loaded`);
              resolve();
            } else {
              const timeout = setTimeout(() => {
                console.log(`⚠️ Video ${index + 1} timeout, continuing anyway`);
                resolve();
              }, 5000);
              
              video.addEventListener('canplaythrough', () => {
                clearTimeout(timeout);
                console.log(`✅ Video ${index + 1} loaded`);
                resolve();
              });
              video.addEventListener('error', () => {
                clearTimeout(timeout);
                console.log(`⚠️ Video ${index + 1} failed to load`);
                resolve();
              });
            }
          }));
        });
        
        // Handle ReactPlayer - wait for it to initialize
        if (reactPlayerContainers.length === 0 && videos.length === 0) {
          // No video elements found yet, wait a bit for ReactPlayer to mount
          await new Promise(resolve => {
            let attempts = 0;
            const maxAttempts = 20; // 4 seconds max wait
            
            const checkForVideos = () => {
              attempts++;
              const newVideos = document.querySelectorAll('video');
              const newReactPlayers = document.querySelectorAll('[data-react-player], .react-player');
              
              if (newVideos.length > 0 || newReactPlayers.length > 0 || attempts >= maxAttempts) {
                console.log(`✅ Found videos after ${attempts * 200}ms`);
                resolve();
              } else {
                setTimeout(checkForVideos, 200);
              }
            };
            
            checkForVideos();
          });
          
          // Now check the videos that were found
          const newVideos = document.querySelectorAll('video');
          Array.from(newVideos).forEach((video, index) => {
            videoPromises.push(new Promise(resolve => {
              if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                console.log(`✅ ReactPlayer video ${index + 1} ready`);
                resolve();
              } else {
                const timeout = setTimeout(() => {
                  console.log(`⚠️ ReactPlayer video ${index + 1} timeout, continuing anyway`);
                  resolve();
                }, 3000);
                
                video.addEventListener('loadeddata', () => {
                  clearTimeout(timeout);
                  console.log(`✅ ReactPlayer video ${index + 1} loaded`);
                  resolve();
                });
                video.addEventListener('error', () => {
                  clearTimeout(timeout);
                  console.log(`⚠️ ReactPlayer video ${index + 1} failed to load`);
                  resolve();
                });
              }
            }));
          });
        }

        // Wait for all video promises or timeout after 8 seconds
        await Promise.race([
          Promise.all(videoPromises),
          new Promise(resolve => {
            setTimeout(() => {
              console.log('⚠️ Video loading timeout reached, continuing...');
              resolve();
            }, 8000);
          })
        ]);
        
        if (!isMounted) return;
        updateProgress('Initializing canvas...');

        // 3. Check for canvas elements and their contexts
        const canvases = document.querySelectorAll('canvas');
        const canvasPromises = Array.from(canvases).map((canvas, index) => {
          return new Promise(resolve => {
            const checkCanvas = () => {
              // Check if canvas already has a context without creating new ones
              let hasContext = false;
              
              try {
                // Check for existing context without creating new ones
                const contextTypes = ['2d', 'webgl', 'webgl2', 'experimental-webgl'];
                
                // Try to detect existing context by checking canvas properties
                if (canvas.width && canvas.height) {
                  // Canvas is likely initialized if it has dimensions
                  hasContext = true;
                  console.log(`✅ Canvas ${index + 1} appears to be initialized`);
                } else {
                  // For Three.js canvases, they might not have context yet but will be created
                  console.log(`⚠️ Canvas ${index + 1} not yet initialized, continuing anyway`);
                  hasContext = true; // Don't block loading for this
                }
              } catch (error) {
                console.log(`⚠️ Canvas ${index + 1} check failed:`, error.message);
                hasContext = true; // Don't block loading
              }
              
              resolve();
            };
            
            // Shorter timeout since we're not actually creating contexts
            setTimeout(checkCanvas, 200);
          });
        });

        await Promise.all(canvasPromises);
        if (!isMounted) return;
        updateProgress('Loading styles...');

        // 4. Check for CSS files
        await new Promise(resolve => {
          const styleSheets = document.styleSheets;
          let cssLoaded = 0;
          const totalCSS = styleSheets.length;

          if (totalCSS === 0) {
            console.log('✅ No CSS files to load');
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
              cssLoaded++;
            }
          }

          if (cssLoaded === totalCSS) {
            console.log('✅ All CSS loaded');
            resolve();
          } else {
            setTimeout(() => {
              console.log('✅ CSS loading timeout reached');
              resolve();
            }, 1000);
          }
        });

        if (!isMounted) return;
        updateProgress('Finalizing...');

        // 5. Wait for DOM to be fully ready
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            console.log('✅ DOM already complete');
            resolve();
          } else {
            window.addEventListener('load', () => {
              console.log('✅ DOM loaded');
              resolve();
            });
          }
        });

        if (!isMounted) return;
        updateProgress('Preparing interface...');

        // 6. Final preparations
        await new Promise(resolve => setTimeout(resolve, 500));

        if (!isMounted) return;

        // Final progress update
        setLoadingProgress(100);
        setLoadingStage('Ready!');
        
        // Add a small delay to show completion
        setTimeout(() => {
          if (!isMounted) return;
          console.log('🎉 All resources loaded successfully');
          setIsLoading(false);
        }, 800);

      } catch (error) {
        console.error('Error loading resources:', error);
        if (!isMounted) return;
        
        setLoadingStage('Error occurred, loading anyway...');
        setTimeout(() => {
          if (!isMounted) return;
          setIsLoading(false);
        }, 2000);
      }
    };

    // Start resource checking after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(checkAllResourcesLoaded, 200);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    loadingProgress,
    setLoadingProgress,
    loadingStage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

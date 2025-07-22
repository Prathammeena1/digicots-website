// Utility functions for Lenis smooth scroll with controlled scroll distances

let lastScrollTime = 0;
let scrollAccumulator = 0;
let isScrolling = false;
const SCROLL_DEBOUNCE = 100; // Reduced debounce for better responsiveness
const MIN_SCROLL_DISTANCE = window.innerHeight * 0.5; // 50vh
const MAX_SCROLL_DISTANCE = window.innerHeight * 1.0; // 100vh

// Controlled scroll handler with improved smoothness
export const handleControlledScroll = (deltaY) => {
  const currentTime = Date.now();
  
  // Prevent new scroll while animating
  if (isScrolling) return;
  
  // Accumulate scroll delta during debounce period
  if (currentTime - lastScrollTime < SCROLL_DEBOUNCE) {
    scrollAccumulator += Math.abs(deltaY);
    return;
  }
  
  // Calculate scroll distance based on accumulated delta
  const totalDelta = scrollAccumulator + Math.abs(deltaY);
  let scrollDistance;
  
  // Improved mapping for smoother transitions
  if (totalDelta < 50) {
    scrollDistance = MIN_SCROLL_DISTANCE;
  } else {
    // Smooth curve interpolation for better feel
    const intensity = Math.min(totalDelta / 300, 1); // Adjusted threshold
    const curve = 1 - Math.pow(1 - intensity, 2); // Ease-out curve
    scrollDistance = MIN_SCROLL_DISTANCE + (curve * (MAX_SCROLL_DISTANCE - MIN_SCROLL_DISTANCE));
  }
  
  // Determine scroll direction
  const direction = deltaY > 0 ? 1 : -1;
  const currentScroll = window.lenis?.scroll || window.pageYOffset || 0;
  const targetScroll = currentScroll + (scrollDistance * direction);
  
  // Set scrolling flag
  isScrolling = true;
  
  // Execute controlled scroll with optimized settings
  if (window.lenis) {
    window.lenis.scrollTo(targetScroll, {
      duration: 1.4, // Reduced duration for smoother feel
      easing: (t) => {
        // Smoother cubic bezier easing
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
      onComplete: () => {
        isScrolling = false; // Reset flag when animation completes
      }
    });
    
    // Fallback reset in case onComplete doesn't fire
    setTimeout(() => {
      isScrolling = false;
    }, 1400);
  }
  
  // Reset accumulator and update time
  scrollAccumulator = 0;
  lastScrollTime = currentTime;
};

// Initialize controlled scrolling with better event handling
export const initControlledScroll = () => {
  const handleWheel = (e) => {
    // Only prevent default, don't block the handler
    e.preventDefault();
    handleControlledScroll(e.deltaY);
  };
  
  // Add wheel event listener with passive false for preventDefault
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  // Cleanup function
  return () => {
    window.removeEventListener('wheel', handleWheel);
  };
};

export const scrollTo = (target, options = {}) => {
  if (window.lenis) {
    window.lenis.scrollTo(target, {
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      ...options
    })
  }
}

export const scrollToTop = (options = {}) => {
  scrollTo(0, options)
}

export const scrollToElement = (selector, options = {}) => {
  const element = document.querySelector(selector)
  if (element) {
    scrollTo(element, options)
  }
}

// Hook for accessing Lenis instance
export const useLenisInstance = () => {
  return window.lenis
}

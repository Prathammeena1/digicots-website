// Utility functions for Lenis smooth scroll with fixed viewport sections

let lastScrollTime = 0;
let isScrolling = false;
let currentSection = 0; // Track current viewport section
const SCROLL_DEBOUNCE = 50; // Short debounce to prevent multiple triggers
const SECTION_HEIGHT = window.innerHeight; // Each section is 100vh

// Fixed section scroll handler - always scrolls to next/previous 100vh section
export const handleControlledScroll = (deltaY) => {
  const currentTime = Date.now();
  
  // Prevent new scroll while animating
  if (isScrolling) return;
  
  // Simple debounce to prevent rapid firing
  if (currentTime - lastScrollTime < SCROLL_DEBOUNCE) {
    return;
  }
  
  // Determine scroll direction and calculate target section
  const direction = deltaY > 0 ? 1 : -1;
  const targetSection = Math.max(0, currentSection + direction);
  
  // Calculate exact target scroll position (section * 100vh)
  const targetScroll = targetSection * SECTION_HEIGHT;
  
  // Update current section
  currentSection = targetSection;
  
  // Set scrolling flag
  isScrolling = true;
  
  // Execute scroll to exact section position
  if (window.lenis) {
    window.lenis.scrollTo(targetScroll, {
      duration: 1.2, // Consistent duration for section jumps
      easing: (t) => {
        // Smooth easing for consistent feel
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
    }, 1200);
  }
  
  // Update time
  lastScrollTime = currentTime;
};

// Initialize current section based on scroll position
export const initCurrentSection = () => {
  const currentScroll = window.lenis?.scroll || window.pageYOffset || 0;
  currentSection = Math.round(currentScroll / SECTION_HEIGHT);
};

// Initialize controlled scrolling with section-based handling
export const initControlledScroll = () => {
  // Initialize current section on setup
  initCurrentSection();
  
  const handleWheel = (e) => {
    // Prevent default scroll behavior
    e.preventDefault();
    handleControlledScroll(e.deltaY);
  };
  
  // Add wheel event listener with passive false for preventDefault
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  // Update current section when page loads or resizes
  const updateSection = () => {
    if (!isScrolling) {
      initCurrentSection();
    }
  };
  
  window.addEventListener('resize', updateSection);
  window.addEventListener('load', updateSection);
  
  // Cleanup function
  return () => {
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('resize', updateSection);
    window.removeEventListener('load', updateSection);
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

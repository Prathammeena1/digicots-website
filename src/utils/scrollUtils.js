// Utility functions for Lenis smooth scroll with fixed viewport sections

let lastScrollTime = 0;
let isScrolling = false;
let currentSection = 0; // Track current viewport section
const SCROLL_DEBOUNCE = 50; // Short debounce to prevent multiple triggers
const SECTION_HEIGHT = window.innerHeight; // Each section is 100vh

// Reset scroll state for route changes
export const resetScrollState = () => {
  currentSection = 0;
  isScrolling = false;
  lastScrollTime = 0;
  
  // Reset scroll position to top
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};

// Fixed section scroll handler - always scrolls to next/previous 100vh section
export const handleControlledScroll = (deltaY) => {
  const currentTime = Date.now();
  
  // Prevent new scroll while animating
  if (isScrolling) return;
  
  // Simple debounce to prevent rapid firing
  if (currentTime - lastScrollTime < SCROLL_DEBOUNCE) {
    return;
  }
  
  // Get total number of sections based on document height
  const documentHeight = document.documentElement.scrollHeight;
  const maxSections = Math.ceil(documentHeight / SECTION_HEIGHT) - 1;
  
  // Determine scroll direction and calculate target section
  const direction = deltaY > 0 ? 1 : -1;
  const targetSection = currentSection + direction;
  
  // Strict boundary checks - don't allow scrolling beyond valid range
  if (targetSection < 0) {
    // Already at top, ignore further up scrolls
    lastScrollTime = currentTime;
    return;
  }
  
  if (targetSection > maxSections) {
    // Already at bottom, ignore further down scrolls
    lastScrollTime = currentTime;
    return;
  }
  
  // Calculate exact target scroll position (section * 100vh)
  const targetScroll = targetSection * SECTION_HEIGHT;
  
  // Update current section only after validation
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
  const documentHeight = document.documentElement.scrollHeight;
  const maxSections = Math.ceil(documentHeight / SECTION_HEIGHT) - 1;
  
  // Calculate current section with proper boundaries
  const calculatedSection = Math.round(currentScroll / SECTION_HEIGHT);
  currentSection = Math.max(0, Math.min(calculatedSection, maxSections));
};

// Initialize controlled scrolling with section-based handling
export const initControlledScroll = () => {
  // Reset scroll state on initialization
  resetScrollState();
  
  const handleWheel = (e) => {
    // Prevent default scroll behavior
    e.preventDefault();
    handleControlledScroll(e.deltaY);
  };
  
  // Add wheel event listener with passive false for preventDefault
  window.addEventListener('wheel', handleWheel, { passive: false });
  
  // Listen for route changes (works with React Router)
  const handleRouteChange = () => {
    // Small delay to ensure route has changed
    setTimeout(() => {
      resetScrollState();
    }, 100);
  };
  
  // Listen for popstate (browser back/forward)
  window.addEventListener('popstate', handleRouteChange);
  
  // Listen for pushstate/replacestate (programmatic navigation)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    handleRouteChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    handleRouteChange();
  };
  
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
    window.removeEventListener('popstate', handleRouteChange);
    
    // Restore original history methods
    history.pushState = originalPushState;
    history.replaceState = originalReplaceState;
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

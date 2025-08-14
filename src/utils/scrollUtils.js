// Utility functions for Lenis smooth scroll with fixed viewport sections

let lastScrollTime = 0;
let isScrolling = false;
let currentSection = 0; // Track current viewport section
const SCROLL_DEBOUNCE = 800; // Reduced debounce for more responsive feel
const SECTION_HEIGHT = window.innerHeight; // Each section is 100vh
let accumulatedDelta = 0; // Accumulate small touchpad deltas
const DELTA_THRESHOLD = 10; // Lower threshold for more sensitive detection
const TARGET_SECTION_ID = 'HomeHero'; // The specific section where controlled scroll applies

// Check if user is currently within the target section
const isInTargetSection = () => {
  const targetElement = document.getElementById(TARGET_SECTION_ID);
  if (!targetElement) return false;
  
  const rect = targetElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  
  // Check if the target section is currently in viewport
  return rect.top <= 0 && rect.bottom >= viewportHeight;
};

// Reset scroll state for route changes
export const resetScrollState = () => {
  currentSection = 0;
  isScrolling = false;
  lastScrollTime = 0;
  accumulatedDelta = 0; // Reset accumulated delta
  
  // Make sure global variables are also reset
  window.currentSection = 0;
  window.isScrolling = false;
  
  // Reset scroll position to top
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }
};

// Fixed section scroll handler - only works within the target section
export const handleControlledScroll = (deltaY) => {
  // First check if we're in the target section
  if (!isInTargetSection()) {
    return false; // Return false to indicate normal scroll should be used
  }
  
  const currentTime = Date.now();
  
  // COMPLETELY BLOCK any scroll while animation is happening
  if (isScrolling) {
    accumulatedDelta = 0; // Reset accumulated delta while scrolling
    return true; // Return true to indicate we handled the scroll (prevent default)
  }
  
  // STRICT debounce - absolutely no scroll during this period
  if (currentTime - lastScrollTime < SCROLL_DEBOUNCE) {
    accumulatedDelta = 0; // Reset accumulated delta during debounce
    return true; // Return true to indicate we handled the scroll (prevent default)
  }
  
  // Accumulate delta for touchpad handling
  accumulatedDelta += deltaY;
  
  // Only proceed if accumulated delta exceeds threshold
  if (Math.abs(accumulatedDelta) < DELTA_THRESHOLD) {
    return true; // Return true to indicate we're handling it (prevent default)
  }
  
  // Determine direction from accumulated delta (simplified - just check sign)
  const direction = accumulatedDelta > 0 ? 1 : -1;
  
  // IMMEDIATELY reset accumulated delta to prevent further accumulation
  accumulatedDelta = 0;
  
  // Get the target section element
  const targetElement = document.getElementById(TARGET_SECTION_ID);
  if (!targetElement) return false;
  
  // Calculate current section based on scroll position
  const targetElementRect = targetElement.getBoundingClientRect();
  const targetElementTop = window.lenis?.scroll + targetElementRect.top || window.pageYOffset + targetElementRect.top;
  const currentScroll = window.lenis?.scroll || window.pageYOffset || 0;
  const relativeScroll = currentScroll - targetElementTop;
  
  // Determine current section (0, 1, 2, 3)
  const calculatedCurrentSection = Math.round(relativeScroll / window.innerHeight);
  currentSection = Math.max(0, Math.min(calculatedCurrentSection, 3));
  
  // Calculate target section - ALWAYS move exactly 1 section (100vh)
  const targetSection = currentSection + direction;
  
  // Strict boundary checks - don't allow scrolling beyond valid range
  if (targetSection < 0) {
    // At top of target section, allow normal scroll to continue above
    currentSection = 0;
    return false; // Allow normal scroll
  }
  
  if (targetSection > 3) {
    // At bottom of target section, allow normal scroll to continue below
    currentSection = 3;
    return false; // Allow normal scroll
  }
  
  // Calculate exact target scroll position (always exactly 100vh steps)
  const targetScroll = targetElementTop + (targetSection * window.innerHeight);
  
  // Update current section only after validation
  currentSection = targetSection;
  
  // Set scrolling flag IMMEDIATELY to block further scrolls
  isScrolling = true;
  window.isScrolling = true;
  lastScrollTime = currentTime;
  
  // Execute scroll to exact 100vh section position
  if (window.lenis) {
    window.lenis.scrollTo(targetScroll, {
      duration: 1.0, // Slightly faster for better responsiveness
      easing: (t) => {
        // Smooth easing for 100vh jumps
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
      onComplete: () => {
        isScrolling = false;
        window.isScrolling = false;
      }
    });
    
    // Fallback reset
    setTimeout(() => {
      isScrolling = false;
      window.isScrolling = false;
    }, 1000);
  }
  
  return true; // Return true to indicate we handled the scroll
};

// Initialize current section based on position within target section
export const initCurrentSection = () => {
  const targetElement = document.getElementById(TARGET_SECTION_ID);
  if (!targetElement || !isInTargetSection()) {
    currentSection = 0;
    return;
  }
  
  // Calculate current section based on scroll position within the 400vh container
  const targetElementRect = targetElement.getBoundingClientRect();
  const targetElementTop = window.lenis?.scroll + targetElementRect.top || window.pageYOffset + targetElementRect.top;
  const currentScroll = window.lenis?.scroll || window.pageYOffset || 0;
  
  // Calculate relative position within the target element
  const relativeScroll = currentScroll - targetElementTop;
  const sectionHeight = window.innerHeight;
  
  // Determine which section we're in (0, 1, 2, or 3)
  const calculatedSection = Math.floor(relativeScroll / sectionHeight);
  currentSection = Math.max(0, Math.min(calculatedSection, 3)); // Clamp between 0 and 3
};

// Initialize controlled scrolling with section-based handling
export const initControlledScroll = () => {
  // Reset scroll state on initialization
  resetScrollState();
  
  // Make variables globally accessible for debugging and external reset
  window.currentSection = currentSection;
  window.isScrolling = isScrolling;
  
  let deltaResetTimeout;
  
  const handleWheel = (e) => {
    // Try controlled scroll first - only works in target section
    const handledByControlledScroll = handleControlledScroll(e.deltaY);
    
    // If controlled scroll handled it, prevent default
    if (handledByControlledScroll) {
      e.preventDefault();
      
      // Clear existing timeout
      if (deltaResetTimeout) {
        clearTimeout(deltaResetTimeout);
      }
      
      // Reset accumulated delta after a short period of inactivity
      deltaResetTimeout = setTimeout(() => {
        if (!isScrolling) { // Only reset if not currently scrolling
          accumulatedDelta = 0;
        }
      }, 150); // Short reset time for better responsiveness
      
      return;
    }
    
    // Otherwise, let Lenis handle normal smooth scrolling
    // Don't prevent default - let Lenis do its thing
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

// Clean premium smooth scroll utilities with GSAP ScrollTrigger support
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Kill all ScrollTriggers and refresh on route change
export const refreshScrollTriggers = () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.killAll()
    
    // Wait for route to settle, then refresh
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 150)
  }
}

// Route change handler - kills animations and resets scroll
export const handleRouteChange = () => {
  // Block all scroll animations during route change
  window.isRouteChanging = true
  
  // Kill all GSAP ScrollTriggers
  refreshScrollTriggers()
  
  // Hard reset scroll position
  window.scrollTo(0, 0)
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  
  // Reset Lenis
  if (window.lenis) {
    window.lenis.stop()
    window.lenis.scrollTo(0, { immediate: true })
  }
  
  // Re-enable after components render
  setTimeout(() => {
    if (window.lenis) {
      window.lenis.start()
    }
    window.isRouteChanging = false
  }, 200)
}

// Smooth scroll to any target
export const scrollTo = (target, options = {}) => {
  if (window.lenis && !window.isRouteChanging) {
    window.lenis.scrollTo(target, {
      duration: 1.5,
      easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      ...options
    })
  }
}

// Smooth scroll to top
export const scrollToTop = (options = {}) => {
  scrollTo(0, options)
}

// Smooth scroll to element
export const scrollToElement = (selector, options = {}) => {
  const element = document.querySelector(selector)
  if (element) {
    scrollTo(element, options)
  }
}

// Get Lenis instance
export const getLenis = () => window.lenis

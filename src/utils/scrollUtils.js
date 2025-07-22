// Utility functions for Lenis smooth scroll

export const scrollTo = (target, options = {}) => {
  if (window.lenis) {
    window.lenis.scrollTo(target, {
      duration: 1.2,
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

// Clean premium smooth scroll utilities

// Smooth scroll to any target
export const scrollTo = (target, options = {}) => {
  if (window.lenis) {
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

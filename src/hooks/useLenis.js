import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with premium smooth scroll settings
    const lenis = new Lenis({
      duration: 1.2,          // Duration of the smooth scroll (in seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      direction: 'vertical',   // Scroll direction
      gestureDirection: 'vertical',
      smooth: true,           // Enable smooth scrolling
      mouseMultiplier: 1,     // Mouse wheel sensitivity
      smoothTouch: false,     // Disable smooth scroll on touch devices (better performance)
      touchMultiplier: 2,     // Touch gesture sensitivity
      infinite: false,        // Disable infinite scroll
      autoResize: true,       // Auto resize observer
      syncTouch: false,       // Sync touch with scroll
      syncTouchLerp: 0.075,   // Touch lerp value
      touchInertiaMultiplier: 35, // Touch inertia
      wheelMultiplier: 1,     // Wheel scroll multiplier
      normalizeWheel: true,   // Normalize wheel delta
    })

    // Make Lenis instance globally accessible
    window.lenis = lenis

    // Animation frame loop for smooth rendering
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add scroll event listener for additional effects
    lenis.on('scroll', (e) => {
      // You can add custom scroll effects here
      // console.log(e)
    })

    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis')

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('lenis')
      window.lenis = null
      lenis.destroy()
    }
  }, [])
}

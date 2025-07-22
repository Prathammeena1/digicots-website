import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with controlled low-intensity scroll settings
    const lenis = new Lenis({
      duration: 1.5,          // Longer duration for slower, more controlled scroll
      easing: (t) => 1 - Math.pow(1 - t, 4), // Smoother, more controlled easing
      direction: 'vertical',   // Scroll direction
      gestureDirection: 'vertical',
      smooth: true,           // Enable smooth scrolling
      mouseMultiplier: 0.3,   // Reduced mouse wheel sensitivity (was 1)
      smoothTouch: false,     // Disable smooth scroll on touch devices (better performance)
      touchMultiplier: 0.5,   // Reduced touch gesture sensitivity (was 2)
      infinite: false,        // Disable infinite scroll
      autoResize: true,       // Auto resize observer
      syncTouch: false,       // Sync touch with scroll
      syncTouchLerp: 0.05,    // Reduced touch lerp for slower response (was 0.075)
      touchInertiaMultiplier: 15, // Reduced touch inertia (was 35)
      wheelMultiplier: 0.2,   // Much lower wheel scroll multiplier (was 1)
      normalizeWheel: true,   // Normalize wheel delta
      lerp: 0.05,            // Lower lerp value for slower interpolation
    })

    // Make Lenis instance globally accessible
    window.lenis = lenis

    // Custom scroll velocity limiter to cap at 1vh max
    let lastScrollY = 0;
    let scrollVelocity = 0;
    const maxScrollSpeed = window.innerHeight * 0.01; // 1vh in pixels

    // Animation frame loop with velocity control
    function raf(time) {
      // Calculate scroll velocity
      const currentScrollY = window.scrollY || 0;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      
      // If velocity exceeds max, temporarily reduce lerp
      if (scrollVelocity > maxScrollSpeed) {
        lenis.options.lerp = 0.02; // Even slower when scrolling fast
      } else {
        lenis.options.lerp = 0.05; // Normal slow speed
      }
      
      lastScrollY = currentScrollY;
      
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

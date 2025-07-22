import { useEffect } from 'react'
import Lenis from 'lenis'
import { initControlledScroll } from '../utils/scrollUtils.js'

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with optimized settings for smooth controlled scrolling
    const lenis = new Lenis({
      duration: 1.4,          // Matched with controlled scroll duration
      easing: (t) => {
        // Smoother easing that matches controlled scroll
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
      direction: 'vertical',   
      gestureDirection: 'vertical',
      smooth: true,           
      mouseMultiplier: 0,     // Disable default mouse wheel (we handle it)
      smoothTouch: true,      // Enable smooth touch for mobile
      touchMultiplier: 1.5,   // Normal touch sensitivity
      infinite: false,        
      autoResize: true,       
      syncTouch: true,        // Better touch sync
      syncTouchLerp: 0.1,     
      touchInertiaMultiplier: 25, 
      wheelMultiplier: 0,     // Disable default wheel handling
      normalizeWheel: false,  // We handle normalization
      lerp: 0.1,             // Smooth interpolation for touch
    })

    // Make Lenis instance globally accessible
    window.lenis = lenis

    // Initialize controlled scrolling
    const cleanupControlledScroll = initControlledScroll()

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add scroll event listener for additional effects
    lenis.on('scroll', (e) => {
      // Custom scroll effects can be added here
    })

    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis')

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('lenis')
      cleanupControlledScroll() // Cleanup controlled scroll event listeners
      window.lenis = null
      lenis.destroy()
    }
  }, [])
}

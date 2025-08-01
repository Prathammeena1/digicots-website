import { useEffect } from 'react'
import Lenis from 'lenis'
import { initControlledScroll } from '../utils/scrollUtils.js'

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with settings optimized for fixed 100vh scrolling
    const lenis = new Lenis({
      duration: 1.2,          // Matched with fixed scroll duration
      easing: (t) => {
        // Consistent easing for 100vh scrolls
        return t < 0.5 
          ? 2 * t * t 
          : 1 - Math.pow(-2 * t + 2, 2) / 2;
      },
      direction: 'vertical',   
      gestureDirection: 'vertical',
      smooth: true,           
      mouseMultiplier: 1.9,     // Disable default mouse wheel (we handle it)
      smoothTouch: true,      // Enable smooth touch for mobile
      touchMultiplier: 1.5,   // Normal touch sensitivity
      infinite: false,        
      autoResize: true,       
      syncTouch: true,        // Better touch sync
      syncTouchLerp: 0.1,     
      touchInertiaMultiplier: 25, 
      wheelMultiplier: 1.9,     // Disable default wheel handling
      normalizeWheel: false,  // We handle normalization
      lerp: 0.1,             // Smooth interpolation for touch
    })

    // Make Lenis instance globally accessible
    window.lenis = lenis

    // Initialize controlled scrolling
    // const cleanupControlledScroll = initControlledScroll()

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Add scroll event listener to sync section tracking
    lenis.on('scroll', (e) => {
      // Update current section when manually scrolled (e.g., via scrollbar)
      // if (!window.isScrolling) {
      //   const currentScroll = e.scroll;
      //   const sectionHeight = window.innerHeight;
      //   window.currentSection = Math.round(currentScroll / sectionHeight);
      // }
    })

    // Reset scroll position function
    const resetScrollPosition = () => {
      lenis.scrollTo(0, { immediate: true })
      window.currentSection = 0
      window.isScrolling = false
    }

    // Make reset function globally accessible for route changes
    window.lenisReset = resetScrollPosition

    // Add Lenis class to html for CSS targeting
    document.documentElement.classList.add('lenis')

    // Cleanup function
    return () => {
      document.documentElement.classList.remove('lenis')
      // cleanupControlledScroll() // Cleanup controlled scroll event listeners
      window.lenis = null
      window.lenisReset = null
      lenis.destroy()
    }
  }, [])
}

import { useEffect } from 'react'
import Lenis from 'lenis'
import { initControlledScroll } from '../utils/scrollUtils.js'

export const useLenis = () => {
  useEffect(() => {
    // Create Lenis instance with settings optimized for normal smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,          
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      direction: 'vertical',   
      gestureDirection: 'vertical',
      smooth: true,           
      mouseMultiplier: 1,     // Enable normal mouse wheel
      smoothTouch: true,      
      touchMultiplier: 1.5,   
      infinite: false,        
      autoResize: true,       
      syncTouch: true,        
      syncTouchLerp: 0.1,     
      touchInertiaMultiplier: 25, 
      wheelMultiplier: 1,     // Enable normal wheel handling
      normalizeWheel: true,   // Enable wheel normalization
      lerp: 0.1,             
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

    // Add scroll event listener to sync section tracking only for target section
    lenis.on('scroll', (e) => {
      // Update current section when manually scrolled within target section
      const targetElement = document.getElementById('HomeHero');
      if (targetElement && !window.isScrolling) {
        const rect = targetElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Only track sections if we're in the target section
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
          // Calculate current section within the 400vh HomeHero container
          const targetElementTop = e.scroll + rect.top;
          const relativeScroll = e.scroll - targetElementTop;
          const calculatedSection = Math.floor(relativeScroll / viewportHeight);
          
          window.currentSection = Math.max(0, Math.min(calculatedSection, 3));
        }
      }
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
      cleanupControlledScroll() // Cleanup controlled scroll event listeners
      window.lenis = null
      window.lenisReset = null
      lenis.destroy()
    }
  }, [])
}

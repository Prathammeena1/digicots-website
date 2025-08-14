import { useEffect } from 'react'
import Lenis from 'lenis'

export const useLenis = () => {
  useEffect(() => {
    // Create natural smooth scroll - faster and more responsive
    const lenis = new Lenis({
      duration: 1.2,          // Much faster duration
      easing: (t) => t,       // Linear easing for natural scroll behavior
      direction: 'vertical',
      smooth: true,
      mouseMultiplier: 1.5,   // Faster mouse wheel response
      touchMultiplier: 2.5,   // Faster touch response
      wheelMultiplier: 1.5,   // Faster wheel response
      touchInertiaMultiplier: 35,
      syncTouch: true,
      syncTouchLerp: 0.15,    // Much more responsive touch
      normalizeWheel: true,
      lerp: 0.18,            // Much more responsive interpolation
      autoResize: true,
    })

    // Make Lenis globally accessible
    window.lenis = lenis

    // Natural 60fps animation loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Add styling class
    document.documentElement.classList.add('lenis')

    // Cleanup
    return () => {
      document.documentElement.classList.remove('lenis')
      window.lenis = null
      lenis.destroy()
    }
  }, [])
}

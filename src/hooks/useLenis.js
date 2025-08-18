import { useEffect, useLayoutEffect } from 'react'
import Lenis from 'lenis'
import { useLocation } from 'react-router-dom'

export const useLenis = () => {
  const location = useLocation()

  // Immediate scroll reset on route change - before anything renders
  useLayoutEffect(() => {
    // Stop everything immediately
    if (window.lenis) {
      window.lenis.stop()
    }
    
    // Hard reset scroll position
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    
    // Block animations
    window.isRouteChanging = true
    
    // Reset Lenis position
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true, force: true })
    }
  }, [location.pathname])

  useEffect(() => {
    // Create natural smooth scroll
    const lenis = new Lenis({
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium easing curve
      direction: 'vertical',
      smooth: true,
      duration: 1.2
    })

    // Make Lenis globally accessible
    window.lenis = lenis

    // Animation loop
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
      window.isRouteChanging = false
      lenis.destroy()
    }
  }, [])

  // Re-enable Lenis after route change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.start()
      }
      window.isRouteChanging = false
    }, 50) // Very short delay

    return () => clearTimeout(timer)
  }, [location.pathname])
}

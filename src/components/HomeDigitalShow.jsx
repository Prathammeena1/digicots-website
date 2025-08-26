import React from "react";
import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

function SocialMediaCard() {
  const viewAllRef = useRef(null);
  const arrowRef = useRef(null);
  const containerRef = useRef(null);
    const animationRef = useRef({ isAnimating: false, currentTween: null });

  // Memoized animation handlers to prevent recreation
  const handleMouseEnter = useCallback(() => {
    const viewAllElement = viewAllRef.current;
    const arrowElement = arrowRef.current;
    
    if (!viewAllElement || !arrowElement || animationRef.current.isAnimating) return;
    
    // Kill any existing animation
    if (animationRef.current.currentTween) {
      animationRef.current.currentTween.kill();
    }
    
    animationRef.current.isAnimating = true;
    
    // Use timeline for better sync and performance
    const tl = gsap.timeline({
      onComplete: () => {
        animationRef.current.isAnimating = false;
        animationRef.current.currentTween = null;
      }
    });
    
    tl.to([viewAllElement, arrowElement], {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      force3D: true, // Hardware acceleration
        "will-change": "transform, opacity"
    });
    
    animationRef.current.currentTween = tl;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const viewAllElement = viewAllRef.current;
    const arrowElement = arrowRef.current;
    
    if (!viewAllElement || !arrowElement) return;
    
    // Kill any existing animation
    if (animationRef.current.currentTween) {
      animationRef.current.currentTween.kill();
    }
    
    animationRef.current.isAnimating = true;
    
    const tl = gsap.timeline({
      onComplete: () => {
        animationRef.current.isAnimating = false;
        animationRef.current.currentTween = null;
      }
    });
    
    tl.to(viewAllElement, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      force3D: true,
        "will-change": "transform, opacity"
    })
    .to(arrowElement, {
      x: -100,
      duration: 0.3,
      opacity:.6,
      ease: "power2.in",
      force3D: true,
        "will-change": "transform"
    }, "<"); // Start at the same time as previous animation
    
    animationRef.current.currentTween = tl;
  }, []);

  useEffect(() => {
    const viewAllElement = viewAllRef.current;
    const arrowElement = arrowRef.current;
    const containerElement = containerRef.current;

    // Safety check
    if (!viewAllElement || !arrowElement || !containerElement) {
      console.warn('SocialMediaCard: Required elements not found');
      return;
    }

    // Initial state with hardware acceleration
    gsap.set([viewAllElement], {
      x: -100,
      opacity: 0,
      force3D: true,
        "will-change": "transform, opacity"
    });
    
    gsap.set([arrowElement], {
      x: -100,
      force3D: true,
        "will-change": "transform"
    });

    // Add event listeners with passive option for better performance
    containerElement.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    containerElement.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Cleanup function
    return () => {
      // Kill any running animations
      if (animationRef.current.currentTween) {
        animationRef.current.currentTween.kill();
      }
      
      // Remove event listeners
      if (containerElement) {
        containerElement.removeEventListener('mouseenter', handleMouseEnter);
        containerElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      // Reset animation state
      animationRef.current = { isAnimating: false, currentTween: null };
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return (
    <div className="h-full w-[364px] shrink-0">
      <div className="h-[425px] w-[364px] overflow-hidden ">
        <img
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          // src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=364&h=425&fit=crop&q=80"
          src="/final-images/services/Branding.webp"
          alt="Nueva Face Branding Project"
          loading="lazy"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-900">Nueva Face</h2>
        <p className="text-base text-zinc-600 mt-1">
          Project carried out within digicots
        </p>
        <p className="text-sm text-zinc-500 mt-0.5">Branding</p>
      </div>
      <div 
        ref={containerRef}
        className="flex items-center gap-3 cursor-pointer overflow-hidden relative  py-2 px-1 rounded-md transition-colors duration-200 w-fit"
        role="button"
        tabIndex={0}
        aria-label="View all projects"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // Handle click action here
            console.log('View All clicked');
          }
        }}
      >
        <h3 
          ref={viewAllRef}
          className="text-base font-semibold text-zinc-500 whitespace-nowrap select-none"
        >
          View All
        </h3>
         <img
          ref={arrowRef}
          className="h-2 object-contain relative z-10 opacity-[.6]"
          src="/final-images/utils/long-arrow.png"
          alt=""
        />
      </div>
    </div>
  );
}


const HomeDigitalShow = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;

    const smoothScroll = (target) => {
      if (!container) return;
      const start = container.scrollLeft;
      const change = target - start;
      const duration = 300;
      let currentTime = 0;

      function animateScroll() {
        currentTime += 16.67; // ~60fps
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        container.scrollLeft = val;
        if (currentTime < duration) {
          window.requestAnimationFrame(animateScroll);
        } else {
          container.scrollLeft = target;
          isScrolling = false;
        }
      }
      animateScroll();
    };

    // Polyfill for easeInOutQuad
    if (!Math.easeInOutQuad) {
      Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };
    };

    const isMouseWheel = (e) => {
      // Simplified detection focusing on most reliable indicators
      
      // Mouse wheels typically have larger delta values (usually 100-120)
      const hasLargeDelta = Math.abs(e.deltaY) >= 100;
      
      // Mouse wheels often use line-based scrolling
      const isLineMode = e.deltaMode === 1; // DOM_DELTA_LINE
      
      // Mouse wheels typically only affect one axis at a time
      const isSingleAxis = e.deltaX === 0 && e.deltaY !== 0;
      
      // Legacy wheelDelta property (if available) can help distinguish
      const hasWheelDelta = e.wheelDelta && Math.abs(e.wheelDelta) >= 120;
      
      // Consider it a mouse wheel if any strong indicator is present
      return hasLargeDelta || isLineMode || hasWheelDelta;
    };

    const onWheel = (e) => {
      const canScrollHorizontally = container.scrollWidth > container.clientWidth;
      if (!canScrollHorizontally) return;

      // Only handle mouse wheel events, ignore touchpad
      if (!isMouseWheel(e)) {
        return; // Let browser handle touchpad events normally
      }

      const isAtStart = container.scrollLeft === 0;
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
      
      if ((e.deltaY > 0 && !isAtEnd) || (e.deltaY < 0 && !isAtStart)) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isScrolling) return;
        isScrolling = true;
        
        const scrollAmount = e.deltaY * 12;
        const target = Math.max(
          0,
          Math.min(
            container.scrollLeft + scrollAmount,
            container.scrollWidth - container.clientWidth
          )
        );
        smoothScroll(target);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <div className="pointer-events-auto">
      <div
        data-lenis-prevent
        ref={containerRef}
        className="h-auto w-[100vw] flex gap-5 overflow-x-auto scrollbar-hide px-30"
        style={{ scrollBehavior: "smooth", overflowX: "auto" }}
      >
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
      </div>
    </div>
  );
};

export default HomeDigitalShow;
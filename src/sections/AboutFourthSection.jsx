import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const AboutFourthSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  // Mouse follower refs
  const followerRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const intervalRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const slides = [
    {
      id: 1,
      image: '/images/service1.png', // Replace with actual image paths
      title: 'Digital Innovation',
      description: 'The force della knowledge, the impact della creativity, the pervasiveness della technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.'
    },
    {
      id: 2,
      image: '/images/service2.png',
      title: 'Creative Solutions', 
      description: 'The force della knowledge, the impact della creativity, the pervasiveness della technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.'
    },
    {
      id: 3,
      image: '/images/service3.png',
      title: 'Technology Excellence',
      description: 'The force della knowledge, the impact della creativity, the pervasiveness della technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.'
    },
    {
      id: 4,
      image: '/images/service4.png',
      title: 'Business Growth',
      description: 'The force della knowledge, the impact della creativity, the pervasiveness della technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.'
    }
  ];

  const AUTOPLAY_DELAY = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  // Reset and start autoplay timer
  const resetAutoplayTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    setProgress(0);
    
    if (isAutoPlaying) {
      startAutoplayTimer();
    }
  };

  // Start autoplay timer
  const startAutoplayTimer = () => {
    let progressValue = 0;
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    progressIntervalRef.current = setInterval(() => {
      progressValue += (PROGRESS_INTERVAL / AUTOPLAY_DELAY) * 100;
      setProgress(progressValue);
      if (progressValue >= 100) {
        clearInterval(progressIntervalRef.current);
      }
    }, PROGRESS_INTERVAL);

    intervalRef.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);
  };

  // Handle slide change
  const goToSlide = (index) => {
    setCurrentSlide(index);
    resetAutoplayTimer();
  };

  // Mouse drag handlers

  // Drag state for threshold
  const dragState = useRef({ dragging: false, startX: 0, moved: false });

  const handleMouseDown = (e) => {
    dragState.current.dragging = true;
    dragState.current.startX = e.pageX;
    dragState.current.moved = false;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    setIsAutoPlaying(false);
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragState.current.dragging) return;
    dragState.current.moved = true;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2; // less aggressive
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = (e) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    isDragging.current = false;
    document.body.style.userSelect = '';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);

    // Only snap if drag distance is significant
    const dragDistance = e ? Math.abs(e.pageX - dragState.current.startX) : 0;
    const threshold = 30; // px
    const container = sliderRef.current;
    const firstSlide = container.querySelector('.slide-item');
    if (firstSlide) {
      const slideWidth = firstSlide.getBoundingClientRect().width + 40;
      let slideIndex = Math.round(container.scrollLeft / slideWidth);
      // If drag was significant, go to next/prev slide
      if (dragDistance > threshold && dragState.current.moved) {
        if (e.pageX < dragState.current.startX) {
          slideIndex = Math.min(slides.length - 1, slideIndex + 1);
        } else if (e.pageX > dragState.current.startX) {
          slideIndex = Math.max(0, slideIndex - 1);
        }
      }
      setCurrentSlide(slideIndex);
    }
    setIsAutoPlaying(true);
    resetAutoplayTimer();
  };

  // Touch handlers for mobile

  // Touch drag logic
  const touchState = useRef({ dragging: false, startX: 0, moved: false });

  const handleTouchStart = (e) => {
    touchState.current.dragging = true;
    touchState.current.startX = e.touches[0].pageX;
    touchState.current.moved = false;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!touchState.current.dragging) return;
    touchState.current.moved = true;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = (e) => {
    if (!touchState.current.dragging) return;
    touchState.current.dragging = false;
    // Only snap if drag distance is significant
    const dragDistance = e && e.changedTouches ? Math.abs(e.changedTouches[0].pageX - touchState.current.startX) : 0;
    const threshold = 30;
    const container = sliderRef.current;
    const firstSlide = container.querySelector('.slide-item');
    if (firstSlide) {
      const slideWidth = firstSlide.getBoundingClientRect().width + 40;
      let slideIndex = Math.round(container.scrollLeft / slideWidth);
      if (dragDistance > threshold && touchState.current.moved && e && e.changedTouches) {
        if (e.changedTouches[0].pageX < touchState.current.startX) {
          slideIndex = Math.min(slides.length - 1, slideIndex + 1);
        } else if (e.changedTouches[0].pageX > touchState.current.startX) {
          slideIndex = Math.max(0, slideIndex - 1);
        }
      }
      setCurrentSlide(slideIndex);
    }
    setIsAutoPlaying(true);
    resetAutoplayTimer();
  };

  // GSAP mouse follower handlers
  const handleMouseEnterSlider = () => {
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }
  };

  const handleMouseLeaveSlider = () => {
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleMouseMoveSlider = (e) => {
    if (followerRef.current && sliderContainerRef.current) {
      const rect = sliderContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(followerRef.current, {
        x: x,
        y: y,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  };

  // Initialize mouse follower GSAP animation
  useEffect(() => {
    if (followerRef.current) {
      // Set initial state - hidden and scaled down
      gsap.set(followerRef.current, {
        scale: 0,
        opacity: 0,
        transformOrigin: 'center center'
      });
    }
  }, []);

  // Initialize autoplay and progress bar
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isAutoPlaying, currentSlide]);

  // Update slider position when currentSlide changes
  useEffect(() => {
    if (sliderRef.current) {
      const firstSlide = sliderRef.current.querySelector('.slide-item');
      if (firstSlide) {
        const slideWidth = firstSlide.getBoundingClientRect().width + 40; // 40px for gap-10
        const targetPosition = currentSlide * slideWidth;
        sliderRef.current.scrollTo({
          left: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentSlide]);

  return (
    <div className='section min-h-screen w-full text-white pt-16'>
      <div className='w-full mx-auto'>
        {/* Title */}
        <h2 className='text-7xl font-semibold mb-6 px-30'>
          How we started
        </h2>

        {/* Slider Container */}
        <div
          className='relative group'
          ref={sliderContainerRef}
          onMouseEnter={handleMouseEnterSlider}
          onMouseLeave={handleMouseLeaveSlider}
          onMouseMove={handleMouseMoveSlider}
          style={{ cursor: 'none' }}
        >
          {/* Slides */}
          <div 
            ref={sliderRef}
            className='flex overflow-x-hidden cursor-none gap-10 px-30 pointer-events-auto'
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollBehavior: isDragging.current ? 'auto' : 'smooth' }}
          >
          {/* Mouse Follower */}
          <div
            ref={followerRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              zIndex: 50
            }}
          >
              <div style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '2px solid #fff',
                background: 'rgba(100,100,100,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.08)'
              }}>
                {/* Center dot */}
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#e5e5e5',
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2
                }} />
                {/* Left arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)'}}><polygon points="16,6 8,12 16,18" fill="#fff"/></svg>
                {/* Right arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)'}}><polygon points="8,6 16,12 8,18" fill="#fff"/></svg>
              </div>
            </div>

            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className='slide-item flex-shrink-0 w-full flex items-center justify-center gap-8 relative'
                style={{ maxWidth: '120vh' }}
                onMouseEnter={() => setHoveredSlide(index)}
                onMouseLeave={() => setHoveredSlide(null)}
              >
                {/* Left Image - Laptop */}
                <div className='relative w-full h-[70vh]'>
                  <div className='rounded-lg h-full flex items-center justify-center transform shadow-2xl relative overflow-hidden'>
                    <div className='rounded-lg w-full h-full flex items-center justify-center overflow-hidden'>
                      <img 
                        src={slide.image} 
                        alt={slide.title}
                        className={`w-full h-full object-cover rounded-lg transition-transform duration-500 ${hoveredSlide === index ? 'scale-105' : 'scale-100'}`}
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9qZWN0ICR7aW5kZXggKyAxfTwvdGV4dD48L3N2Zz4=`;
                        }}
                      />
                    </div>
                    
                    {/* Hover Text Overlay - Only show for hovered slide */}
                    <div className={`absolute h-fit w-[40vw] rounded-2xl inset-0 bg-white/10 backdrop-blur-2xl transition-opacity duration-500 ease-in-out flex items-end justify-start p-6 my-6 mx-6 ${hoveredSlide === index ? 'opacity-100' : 'opacity-0'}`}>
                      <div className={`text-white transform transition-transform duration-500 w-full ease-out ${hoveredSlide === index ? 'translate-y-0' : 'translate-y-4'}`}>

                        <p className='text-base leading-relaxed opacity-90 w-full'>
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
          {/* Navigation Dots with Progress */}
          <div className='flex justify-center items-center mt-8 gap-3 pointer-events-auto'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className='relative group'
              >
                {index === currentSlide ? (
                  // Active dot with progress
                  <div className='w-12 h-3 bg-gray-600 rounded-full relative overflow-hidden'>
                    <div 
                      className='h-full bg-white rounded-full transition-all duration-100 ease-linear'
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                ) : (
                  // Inactive dots
                  <div className='w-3 h-3 cursor-pointer bg-gray-600 rounded-full group-hover:bg-gray-400 transition-colors duration-200'></div>
                )}
              </button>
            ))}
          </div>
      </div>
    </div>
  )
}

export default AboutFourthSection
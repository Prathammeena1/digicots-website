import React, { useRef, useState, useEffect } from 'react'

// Service Card Component
const ServiceCard = ({ image, title, description, logoOrAccent }) => {
  return (
    <div className="flex flex-col max-w-md shrink-0">
      <div className="relative overflow-hidden mb-6">
        <img 
          src={image} 
          alt={title}
          className="w-full h-[240px] object-cover"
        />
        {logoOrAccent && (
          <div className="absolute top-4 right-4">
            {title === "Brand Systems" ? (
              // Logo for Brand Systems
              <div className="text-white uppercase tracking-widest text-sm">
                AKSARI
                <div className="flex justify-center mt-1">
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                </div>
              </div>
            ) : (
              // Accent/button for Creative Campaigns
              <div className="px-3 py-2 text-xs font-medium text-black bg-yellow-500">
                DONATE TO MAKE A
                <br />
                DIFFERENCE
              </div>
            )}
          </div>
        )}
        {/* Overlay outline for creative campaigns */}
        {title === "Creative Campaigns" && (
          <div className="absolute inset-0 border-2 border-white/30 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-white/50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-12 border border-white/50"></div>
          </div>
        )}
      </div>
      <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-center">
        <img src="/images/long-arrow.png" alt="Arrow" className="h-2 mr-2 object-contain" />
        <span className="text-zinc-400 text-xs mr-2">View Services</span>
      </div>
    </div>
  );
};

const ApproachThirdSection = () => {
  // Refs and state for slider
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update measurements on mount and window resize
  useEffect(() => {
    const updateMeasurements = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.clientWidth);
        setContentWidth(sliderRef.current.scrollWidth);
      }
    };

    updateMeasurements();
    window.addEventListener('resize', updateMeasurements);
    
    return () => {
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  // Update scroll progress when scrolling
  const handleScroll = () => {
    if (sliderRef.current) {
      const progress = sliderRef.current.scrollLeft / (sliderRef.current.scrollWidth - sliderRef.current.clientWidth);
      setScrollProgress(progress);
    }
  };

  // Mouse down handler for drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
  };

  // Touch start handler for mobile drag
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  // Mouse move handler for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
    handleScroll();
  };

  // Touch move handler for mobile dragging
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    handleScroll();
  };

  // End dragging
  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };

  return (
    <div className='min-h-screen w-full py-20 relative z-10 px-8 md:px-16 lg:px-24 flex items-center'>
      <div className="container mx-auto h-fit">
        
        {/* Services slider container */}
        <div 
          ref={sliderRef}
          className={`flex items-center gap-12 overflow-x-auto h-fit my-auto hide-scrollbar pointer-events-auto ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDragEnd}
          style={{
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            userSelect: 'none'
          }}
        >
          <div className='shrink-0'>
            <h2 className="text-white text-4xl font-semibold w-[400px]">What We Create</h2>
          </div>

          {/* Service Card 1 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
          {/* Service Card 2 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
          {/* Service Card 3 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
          {/* Service Card 1 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
          {/* Service Card 2 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
          {/* Service Card 3 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
        </div>

        {/* Slider controls - only show on larger screens */}
        <div className="hidden md:flex justify-end mt-8 gap-4 pointer-events-auto">
          <button 
            onClick={() => {
              if (sliderRef.current) {
                const scrollAmount = Math.min(sliderRef.current.scrollLeft - 400, 0);
                sliderRef.current.scrollTo({ left: sliderRef.current.scrollLeft - 400, behavior: 'smooth' });
              }
            }}
            className="w-10 h-10 rounded-full border cursor-pointer border-gray-600 flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1L1 7L7 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            onClick={() => {
              if (sliderRef.current) {
                const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
                sliderRef.current.scrollTo({ left: Math.min(sliderRef.current.scrollLeft + 400, maxScroll), behavior: 'smooth' });
              }
            }}
            className="w-10 h-10 rounded-full border cursor-pointer border-gray-600 flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 13L7 7L1 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="why-it-works rounded-lg  flex items-center gap-10">
          <h3 className="text-white text-4xl font-semibold w-[400px]">Why It Works</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className='text-zinc-200'>
                ✓ 
              </span>
              <span className="text-zinc-300"> Strategy that roams freely but hits precisely</span>
            </div>
            <div className="flex items-start gap-3">
              <span className='text-zinc-200'>
                ✓
              </span>     
              <span className="text-zinc-300"> Design thinking that breaks old bones</span>
            </div>
            <div className="flex items-start gap-3">
              <span className='text-zinc-200'>
                ✓
              </span>
              <span className="text-zinc-300"> Innovation with a bite</span>
            </div>
          </div>
        </div>

        <div className='w-full text-center text-zinc-500 font-semibold text-5xl lg:text-6xl mt-10'>
          <h2>Discover. Design. Develop. Deliver.</h2>
        </div>

      </div>
    </div>
  )
}

export default ApproachThirdSection
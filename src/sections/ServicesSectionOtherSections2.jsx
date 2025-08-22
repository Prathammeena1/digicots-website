import React from "react";

const ServicesSectionOtherSections2 = () => {
  const sliderRef = React.useRef(null);
  const section2SubSectionsRef = React.useRef([]);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  // Slide data array (used to render slides with map)
  const slides = [
    {
      titleTop: 'Product',
      titleBottom: 'Photography',
      description:
        'The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.',
      image:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      titleTop: 'Brand',
      titleBottom: 'Identity',
      description:
        'Creating distinctive brand identities that resonate with your target audience and establish a strong market presence through strategic design and messaging.',
      image:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
    {
      titleTop: 'Web',
      titleBottom: 'Development',
      description:
        'Building responsive, modern websites that deliver exceptional user experiences and drive business growth through innovative technology solutions.',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    },
  ];
  return (
    <div className="py-10 w-full min-h-screen relative z-20 px-30 flex items-center bg-white">
      <div
        ref={(el) => (section2SubSectionsRef.current[1] = el)}
        className="h-[60vh] w-[70%] relative overflow-hidden pointer-events-auto"
      >
        {/* Slides Wrapper */}
        <div
          ref={sliderRef}
          className={`h-full w-full flex cursor-grab ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transform: `translateX(${-activeSlide * 80 + dragOffset}%)`,
            transition: isDragging ? "none" : "transform 500ms ease-in-out",
          }}
          onMouseDown={(e) => {
            // Prevent default behavior to avoid text selection during drag
            e.preventDefault();

            const startX = e.clientX;
            const sliderWidth = sliderRef.current.offsetWidth;
            const totalSlides = slides.length;

            setIsDragging(true);

            const onMouseMove = (e) => {
              // Calculate drag distance as percentage of slider width
              const x = e.clientX;
              const delta = ((startX - x) / sliderWidth) * 80; // Changed to 80 to match slide width

              // Apply resistance when trying to drag beyond limits
              let newOffset = 0;
              if (
                (activeSlide === 0 && delta < 0) ||
                (activeSlide === totalSlides - 1 && delta > 0)
              ) {
                // Add resistance (only move 1/3 as far when past the bounds)
                newOffset = -delta * 0.3;
              } else {
                newOffset = -delta;
              }

              setDragOffset(newOffset);
            };

            const onMouseUp = (e) => {
              setIsDragging(false);

              // Clean up event listeners
              window.removeEventListener("mousemove", onMouseMove);
              window.removeEventListener("mouseup", onMouseUp);

              // Calculate drag distance and direction
              const dragDistance = startX - e.clientX;
              const slideThreshold = sliderWidth * 0.2; // 20% threshold for slide change

              // Reset drag offset
              setDragOffset(0);

              // Determine if we should move to next or previous slide
              if (Math.abs(dragDistance) > slideThreshold) {
                if (dragDistance > 0 && activeSlide < totalSlides - 1) {
                  setActiveSlide(activeSlide + 1); // Move to next slide
                } else if (dragDistance < 0 && activeSlide > 0) {
                  setActiveSlide(activeSlide - 1); // Move to previous slide
                }
              }
            };

            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
          }}
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
        const sliderWidth = sliderRef.current.offsetWidth;
      const totalSlides = slides.length;

            setIsDragging(true);

            const onTouchMove = (e) => {
              e.preventDefault();
              // Calculate drag distance as percentage of slider width
              const x = e.touches[0].clientX;
              const delta = ((startX - x) / sliderWidth) * 80; // Changed to 80 to match slide width

              // Apply resistance when trying to drag beyond limits
              let newOffset = 0;
              if (
                (activeSlide === 0 && delta < 0) ||
                (activeSlide === totalSlides - 1 && delta > 0)
              ) {
                // Add resistance (only move 1/3 as far when past the bounds)
                newOffset = -delta * 0.3;
              } else {
                newOffset = -delta;
              }

              setDragOffset(newOffset);
            };

            const onTouchEnd = (e) => {
              setIsDragging(false);

              // Clean up event listeners
              document.removeEventListener("touchmove", onTouchMove);
              document.removeEventListener("touchend", onTouchEnd);

              // Calculate drag distance and direction
              const dragDistance = startX - e.changedTouches[0].clientX;
              const slideThreshold = sliderWidth * 0.2; // 20% threshold for slide change

              // Reset drag offset
              setDragOffset(0);

              // Determine if we should move to next or previous slide
              if (Math.abs(dragDistance) > slideThreshold) {
                if (dragDistance > 0 && activeSlide < totalSlides - 1) {
                  setActiveSlide(activeSlide + 1); // Move to next slide
                } else if (dragDistance < 0 && activeSlide > 0) {
                  setActiveSlide(activeSlide - 1); // Move to previous slide
                }
              }
            };

            document.addEventListener("touchmove", onTouchMove, {
              passive: false,
            });
            document.addEventListener("touchend", onTouchEnd);
          }}
        >
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`h-full w-[80%] flex shrink-0 items-center justify-between ${
                idx === activeSlide ? "dark:text-white" : ""
              } overflow-hidden gap-4 px-8 transition-opacity duration-300 ${
                activeSlide === idx ? "opacity-100" : "opacity-20"
              }`}
            >
              {/* Left Section */}
              <div className="w-1/2 h-full flex flex-col justify-between">
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-bold mb-4">
                    {s.titleTop}
                    <br />
                    {s.titleBottom}
                  </h2>
                  <p className="dark:text-gray-300 text-sm leading-relaxed mb-8">
                    {s.description}
                  </p>
                </div>
                <button className="flex items-center rounded-full justify-between border border-xinc-200 px-6 py-3 text-sm transition-colors group">
                  <span>Case Study</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              {/* Right Section */}
              <div className="w-1/2 h-full flex items-center justify-center relative">
                <div className="relative z-10 h-full w-full overflow-hidden">
                  <img src={s.image} alt={`${s.titleTop} ${s.titleBottom}`} className="w-full h-full object-cover shadow-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSectionOtherSections2;



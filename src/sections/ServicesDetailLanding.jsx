import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    navTitle: "Section 1",
    title: "Boba Ice-cream with Chocochips",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.",
  },
];

const ServicesDetailLanding = ({ servicesData }) => {
  const linesRef = React.useRef([]);
  const parentRef = React.useRef(null);
  const section1Ref = React.useRef(null);
  const section2Ref = React.useRef(null);
  const section2SubSectionsRef = React.useRef([]);
  const [activeSection, setActiveSection] = React.useState(0);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [overallProgress, setOverallProgress] = React.useState(0);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(0);
  const exploreRef = React.useRef(null);
  const mouseFollowerRef = React.useRef(null);
  const sliderRef = React.useRef(null);

  useGSAP(() => {
    // Create a master timeline to track overall progress from the very beginning
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 0%", // Start tracking immediately when section begins
        end: "top -100%", // End when we finish all transitions
        scrub: true,
        // onUpdate: (self) => {
        //   // Map the entire scroll range (0% to 100%) to our progress
        //   // First half (0% to 50%) = hero transition, no progress fill
        //   // Second half (50% to 100%) = section transition with progress fill

        //   if (self.progress <= 0.5) {
        //     // During hero transition - no progress yet
        //     setOverallProgress(0);
        //     setActiveSection(0);
        //   } else {
        //     // During section transition - map 50%-100% to 0%-100% progress
        //     const sectionProgress = (self.progress - 0.5) * 2; // Convert 0.5-1.0 to 0-1.0
        //     setOverallProgress(sectionProgress);
        //     setScrollProgress(sectionProgress);

        //     // Switch sections at 75% overall progress (50% of section transition)
        //     if (sectionProgress < 0.5) {
        //       setActiveSection(0);
        //     } else {
        //       setActiveSection(1);
        //     }
        //   }
        // },
      },
    });

    // Create two separate timelines for visual animations
    // First timeline (0% to -100%)
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 0%",
        end: "top -100%",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    // First sequence animations (0% to -100%)
    tl1
      .fromTo(linesRef.current, { y: "100%" }, { y: "0%", stagger: 0.2 })
      .fromTo(section2Ref.current, { opacity: 0 }, { opacity: 1 })
      .fromTo(section1Ref.current, { opacity: 1 }, { opacity: 0 })
      .fromTo(linesRef.current, { opacity: 1 }, { opacity: 0 });

    gsap.to(exploreRef.current, {
      rotation: "+=360", // Always add 360 degrees relative to current rotation
      duration: 7, // Slower for smoother appearance
      repeat: -1, // Infinite repetition
      ease: "none", // Constant speed with no easing
      transformOrigin: "50% 50%", // Rotate from center
    });

    // Mouse follower animation
    const handleMouseMove = (e) => {
      if (mouseFollowerRef.current) {
        gsap.to(mouseFollowerRef.current, {
          x: e.clientX - 96, // Center the 192px (w-48) element
          y: e.clientY - 96, // Center the 192px (h-48) element
          duration: 0.8, // Slower, smoother movement
          ease: "power1.out", // Smoother easing
        });
      }
    };

    // Create ScrollTrigger markers to track section boundaries
    const sections = [
      {
        id: "section1",
        start: "top -100%",
        end: "top -166.67%", // One-third of our total scroll area
        onEnter: () => setActiveSection(0),
      },
      {
        id: "section2",
        start: "top -166.67%",
        end: "top -233.34%", // Second third of our total scroll area
        onEnter: () => setActiveSection(1),
      },
      {
        id: "section3",
        start: "top -233.34%",
        end: "top -300%", // Last third of our total scroll area
        onEnter: () => setActiveSection(2),
      },
    ];

    // Create section markers for accurate navigation
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: parentRef.current,
        start: section.start,
        end: section.end,
        onEnter: section.onEnter,
        onEnterBack: section.onEnter, // Also set active section when scrolling back up
        // markers: true, // Uncomment for debugging
      });
    });

    // First animation timeline (section 1 to 2)
    const masterT2 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -100%", // Start at section 1
        end: "top -200%", // End at section 2
        scrub: true,
        onUpdate: (self) => {
          // Update the progress circle for the active section
          setOverallProgress(self.progress);
        },
      },
    });

    // Second animation timeline (section 2 to 3)
    const masterT3 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -200%", // Start at section 2
        end: "top -300%", // End at section 3
        scrub: true,
        onUpdate: (self) => {
          // Update the progress circle for the active section
          setOverallProgress(self.progress);
        },
      },
    });

    masterT2
      .fromTo(
        section2SubSectionsRef.current[0],
        { y: "0" },
        { y: "-100%" },
        "a"
      )
      .fromTo(
        section2SubSectionsRef.current[1],
        { y: "0" },
        { y: "-100%" },
        "a"
      );

    masterT3
      .to(
        section2SubSectionsRef.current[1],
        // { y: "-100%" },
        { y: "-200%" },
        "b"
      )
      .fromTo(
        section2SubSectionsRef.current[2],
        { y: "-100%" },
        { y: "-200%" },
        "b"
      );

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Return a cleanup function for all timelines and listeners
    return () => {
      masterTl.kill();
      tl1.kill();
      masterT2.kill();
      masterT3.kill();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    linesRef.current,
    section2SubSectionsRef.current,
    exploreRef.current,
    parentRef.current,
    section1Ref.current,
    section2Ref.current,
  ]);

  return (
    <>
      <div
        ref={parentRef}
        className="h-[400vh] w-full bg-transparent relative z-10 pointer-events-none"
      >
        <div className="fixed z-50 top-20 left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center space-x-2 text-sm text-gray-300">
            <span className="uppercase tracking-wider">SERVICES</span>
            <span className="text-white">•</span>
            <span className="text-white uppercase tracking-wider font-medium">
              {servicesData.title}
            </span>
          </nav>
        </div>

        <div className="h-screen w-full bg-transparent sticky top-0 z-30 pointer-events-none">
          {/* Breadcrumb Navigation */}

          <div
            ref={section1Ref}
            className="relative h-screen w-full overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${servicesData.src}')`,
              }}
            >
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-8">
              {/* Main Content */}
              <div className="text-center max-w-4xl mx-auto">
                {/* Main Title */}
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide mb-8">
                  {servicesData.title}
                </h1>

                {/* Description Text */}
                <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  The force della knowledge, the impact della creativity, the
                  technology. With the consulting of marketing and communication
                  of Quamm, the value del your business grows in the tempo.
                </p>
              </div>
            </div>

            <div className="absolute top-0 left-0 flex w-full h-full pointer-events-none z-10">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  ref={(el) => (linesRef.current[index] = el)}
                  className="h-full w-1/4 bg-black"
                ></div>
              ))}
            </div>
          </div>
          <div
            ref={section2Ref}
            className="top-0 absolute h-[300vh] w-full z-10"
            style={{ cursor: "none" }}
          >
            <div className="flex items-center justify-between h-screen px-16 lg:px-24">
              {/* Left Content */}
              <div className="w-3/4 text-white h-full  overflow-hidden ">
                <div
                  ref={(el) => (section2SubSectionsRef.current[0] = el)}
                  className="w-[480px] h-[100%] pt-50"
                >
                  <h2 className="text-6xl font-black leading-[1.4]">
                    {data[0].title}
                  </h2>
                  <p className="text-md mt-20 ">{data[0].description}</p>
                </div>

                {/* Slider Container */}
                <div
                  ref={(el) => (section2SubSectionsRef.current[1] = el)}
                  className="h-[100%] w-full relative overflow-hidden pointer-events-auto py-30"
                >
                  {/* Slides Wrapper */}
                  <div
                    ref={sliderRef}
                    className={`h-full flex cursor-grab ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    style={{
                      transform: `translateX(${
                        -activeSlide * 80 + dragOffset
                      }%)`,
                      transition: isDragging
                        ? "none"
                        : "transform 500ms ease-in-out",
                    }}
                    onMouseDown={(e) => {
                      // Prevent default behavior to avoid text selection during drag
                      e.preventDefault();

                      const startX = e.clientX;
                      const sliderWidth = sliderRef.current.offsetWidth;
                      const totalSlides = 3;

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
                          if (
                            dragDistance > 0 &&
                            activeSlide < totalSlides - 1
                          ) {
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
                      const totalSlides = 3;

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
                        const dragDistance =
                          startX - e.changedTouches[0].clientX;
                        const slideThreshold = sliderWidth * 0.2; // 20% threshold for slide change

                        // Reset drag offset
                        setDragOffset(0);

                        // Determine if we should move to next or previous slide
                        if (Math.abs(dragDistance) > slideThreshold) {
                          if (
                            dragDistance > 0 &&
                            activeSlide < totalSlides - 1
                          ) {
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
                    {/* Slide 1 */}
                    <div
                      className={`h-full w-[80%] flex shrink-0 items-center justify-between text-white overflow-hidden gap-4 px-8 transition-opacity duration-300 ${
                        activeSlide === 0 ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      {/* Left Section */}
                      <div className="w-1/2 h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                          <h2 className="text-3xl font-bold mb-4">
                            Product
                            <br />
                            Photography
                          </h2>
                          <p className="text-gray-300 text-sm leading-relaxed mb-8">
                            The force della knowledge, the impact della
                            creativity, the technology. With the consulting of
                            marketing and communication of Quamm, the value del
                            your business grows in the tempo.
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
                          <img
                            src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Product photography showing hands holding a white bottle with chocolates"
                            className="w-full h-full object-cover shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slide 2 */}
                    <div
                      className={`h-full w-[80%] flex shrink-0 items-center justify-between text-white overflow-hidden gap-4 px-8 transition-opacity duration-300 ${
                        activeSlide === 1 ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      {/* Left Section */}
                      <div className="w-1/2 h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                          <h2 className="text-3xl font-bold mb-4">
                            Brand
                            <br />
                            Identity
                          </h2>
                          <p className="text-gray-300 text-sm leading-relaxed mb-8">
                            Creating distinctive brand identities that resonate
                            with your target audience and establish a strong
                            market presence through strategic design and
                            messaging.
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
                          <img
                            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Brand identity design materials"
                            className="w-full h-full object-cover shadow-lg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Slide 3 */}
                    <div
                      className={`h-full w-[80%] flex shrink-0 items-center justify-between text-white overflow-hidden gap-4 px-8 transition-opacity duration-300 ${
                        activeSlide === 2 ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      {/* Left Section */}
                      <div className="w-1/2 h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-4">
                          <h2 className="text-3xl font-bold mb-4">
                            Web
                            <br />
                            Development
                          </h2>
                          <p className="text-gray-300 text-sm leading-relaxed mb-8">
                            Building responsive, modern websites that deliver
                            exceptional user experiences and drive business
                            growth through innovative technology solutions.
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
                          <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Web development workspace"
                            className="w-full h-full object-cover shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  ref={(el) => (section2SubSectionsRef.current[2] = el)}
                  className="h-[100%] w-[80%] relative overflow-hidden"
                >
                  <div className="h-[80%] w-full pt-30">
                    {/* Background Image - Futuristic Portrait */}
                    <div className="w-full h-[80%] relative">
                      <img
                        src="https://images.unsplash.com/photo-1635003913011-95971abba560"
                        alt="Futuristic portrait of person with tech elements"
                        className="object-cover w-full h-full object-top"
                      />
                      {/* Case Study Button - Top Right */}
                      <div className="absolute top-5 right-5">
                        <button className="border border-white/20 rounded-full px-6 py-2 text-white/90 text-sm hover:bg-white/10 transition-all duration-300">
                          Case Study
                        </button>
                      </div>
                      {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2d1e30]/50 to-[#2d1e30]/90"></div> */}
                    </div>

                    {/* Content Container */}
                    <div className=" inset-0 flex flex-col py-10 justify-end pointer-events-auto">
                      {/* Bottom Content */}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col w-[80%]">
                          {/* Title Area */}
                          <div className="flex items-end mb-6">
                            <h2 className="text-3xl font-bold text-white mr-4">
                              The Varallo Group
                            </h2>
                            <span className="text-zinc-200 text-lg">|</span>
                            <span className="text-zinc-200 text-lg ml-4">
                              Immersive, 3D
                            </span>
                          </div>
                          {/* Description */}
                          <p className="text-gray-300 text-sm w-fit">
                            The force della knowledge, the impact della
                            creativity, the technology. With the consulting of
                            marketing and commu of Quamm, the value del your
                            business grows in the tempo.
                          </p>
                        </div>

                        {/* View Project Button */}
                        <div className="w-18 h-18">
                          {/* <button className="group flex items-center space-x-2 text-white hover:text-white/80 transition-colors"> */}
                          <img
                            src="/images/arrow.png"
                            className="h-full w-full object-contain"
                            alt=""
                          />
                          {/* </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center justify-center relative">
                {/* Mouse Follower Circular Button */}
                <div
                  ref={mouseFollowerRef}
                  className="fixed top-0 left-0 z-50 pointer-events-none"
                  style={{ transform: "translate(50%, 50%)" }}
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
                {/* Left arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)'}}><polygon points="16,6 8,12 16,18" fill="#fff"/></svg>
                {/* Right arrow */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{position:'absolute',right:8,top:'50%',transform:'translateY(-50%)'}}><polygon points="8,6 16,12 8,18" fill="#fff"/></svg>
                {/* Center dot */}
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: '#e5e5e5',
                  zIndex: 2
                }} />
              </div>
                </div>

                {/* Navigation Progress Dots */}
                <div className="absolute top-0 right-0 flex flex-col space-y-8 items-center">
                  {/* Section 1 Dot */}
                  <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
                    <span
                      className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
                        activeSection === 0
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      Section 1
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
                        activeSection === 0
                          ? "border-white bg-transparent scale-110"
                          : activeSection > 0
                          ? "border-white scale-100 opacity-55"
                          : "border-gray-600 scale-100"
                      }`}
                    >
                      {/* Progress Circle - Only for active section */}
                      {activeSection === 0 && (
                        <svg
                          className="absolute inset-0 w-6 h-6 -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 11}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 11 * (1 - overallProgress)
                            }`}
                            className="transition-all duration-100 ease-out"
                          />
                        </svg>
                      )}
                      {/* Inner dot */}
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
                          activeSection === 0
                            ? "bg-white scale-110"
                            : activeSection > 0
                            ? "bg-transparent scale-0"
                            : "bg-gray-500 scale-90"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Section 2 Dot */}
                  <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
                    <span
                      className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
                        activeSection === 1
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      Section 2
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
                        activeSection === 1
                          ? "border-white bg-transparent scale-110"
                          : activeSection > 1
                          ? "border-white scale-100 opacity-55"
                          : "border-gray-600 scale-100"
                      }`}
                    >
                      {/* Progress Circle - Only for active section */}
                      {activeSection === 1 && (
                        <svg
                          className="absolute inset-0 w-6 h-6 -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 11}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 11 * (1 - overallProgress)
                            }`}
                            className="transition-all duration-100 ease-out"
                          />
                        </svg>
                      )}
                      {/* Inner dot */}
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
                          activeSection === 1
                            ? "bg-white scale-110"
                            : activeSection > 1
                            ? "bg-transparent scale-0"
                            : "bg-gray-500 scale-90"
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Section 3 Dot */}
                  <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
                    <span
                      className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
                        activeSection === 2
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4"
                      }`}
                    >
                      Section 3
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
                        activeSection === 2
                          ? "border-white bg-transparent scale-110"
                          : activeSection > 2
                          ? "border-white scale-100 opacity-55"
                          : "border-gray-600 scale-100"
                      }`}
                    >
                      {/* Progress Circle - Only for active section */}
                      {activeSection === 2 && (
                        <svg
                          className="absolute inset-0 w-6 h-6 -rotate-90"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="11"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 11}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 11 * (1 - overallProgress)
                            }`}
                            className="transition-all duration-100 ease-out"
                          />
                        </svg>
                      )}
                      {/* Inner dot */}
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
                          activeSection === 2
                            ? "bg-white scale-110"
                            : activeSection > 2
                            ? "bg-transparent scale-0"
                            : "bg-gray-500 scale-90"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesDetailLanding;

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
 
  const exploreRef = React.useRef(null);
  const mouseFollowerRef = React.useRef(null);
  const sliderRef = React.useRef(null);

  useGSAP(() => {
    // Create a master timeline to track overall progress from the very beginning
    // const masterTl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: parentRef.current,
    //     start: "top 0%", // Start tracking immediately when section begins
    //     end: "top -100%", // End when we finish all transitions
    //     scrub: true,
    //     // onUpdate: (self) => {
    //     //   // Map the entire scroll range (0% to 100%) to our progress
    //     //   // First half (0% to 50%) = hero transition, no progress fill
    //     //   // Second half (50% to 100%) = section transition with progress fill

    //     //   if (self.progress <= 0.5) {
    //     //     // During hero transition - no progress yet
    //     //     setOverallProgress(0);
    //     //     setActiveSection(0);
    //     //   } else {
    //     //     // During section transition - map 50%-100% to 0%-100% progress
    //     //     const sectionProgress = (self.progress - 0.5) * 2; // Convert 0.5-1.0 to 0-1.0
    //     //     setOverallProgress(sectionProgress);
    //     //     setScrollProgress(sectionProgress);

    //     //     // Switch sections at 75% overall progress (50% of section transition)
    //     //     if (sectionProgress < 0.5) {
    //     //       setActiveSection(0);
    //     //     } else {
    //     //       setActiveSection(1);
    //     //     }
    //     //   }
    //     // },
    //   },
    // });

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

    // // Mouse follower animation
    // const handleMouseMove = (e) => {
    //   if (mouseFollowerRef.current) {
    //     gsap.to(mouseFollowerRef.current, {
    //       x: e.clientX - 96, // Center the 192px (w-48) element
    //       y: e.clientY - 96, // Center the 192px (h-48) element
    //       duration: 0.8, // Slower, smoother movement
    //       ease: "power1.out", // Smoother easing
    //     });
    //   }
    // };

    // // Create ScrollTrigger markers to track section boundaries
    // const sections = [
    //   {
    //     id: "section1",
    //     start: "top -100%",
    //     end: "top -166.67%", // One-third of our total scroll area
    //     onEnter: () => setActiveSection(0),
    //   },
    //   {
    //     id: "section2",
    //     start: "top -166.67%",
    //     end: "top -233.34%", // Second third of our total scroll area
    //     onEnter: () => setActiveSection(1),
    //   },
    //   {
    //     id: "section3",
    //     start: "top -233.34%",
    //     end: "top -300%", // Last third of our total scroll area
    //     onEnter: () => setActiveSection(2),
    //   },
    // ];

    // // Create section markers for accurate navigation
    // sections.forEach((section) => {
    //   ScrollTrigger.create({
    //     trigger: parentRef.current,
    //     start: section.start,
    //     end: section.end,
    //     onEnter: section.onEnter,
    //     onEnterBack: section.onEnter, // Also set active section when scrolling back up
    //     // markers: true, // Uncomment for debugging
    //   });
    // });

    // // First animation timeline (section 1 to 2)
    // const masterT2 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: parentRef.current,
    //     start: "top -100%", // Start at section 1
    //     end: "top -200%", // End at section 2
    //     scrub: true,
    //     onUpdate: (self) => {
    //       // Update the progress circle for the active section
    //       setOverallProgress(self.progress);
    //     },
    //   },
    // });

    // // Second animation timeline (section 2 to 3)
    // const masterT3 = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: parentRef.current,
    //     start: "top -200%", // Start at section 2
    //     end: "top -300%", // End at section 3
    //     scrub: true,
    //     onUpdate: (self) => {
    //       // Update the progress circle for the active section
    //       setOverallProgress(self.progress);
    //     },
    //   },
    // });

    // masterT2
    //   .fromTo(
    //     section2SubSectionsRef.current[0],
    //     { y: "0" },
    //     { y: "-100%" },
    //     "a"
    //   )
    //   .fromTo(
    //     section2SubSectionsRef.current[1],
    //     { y: "0" },
    //     { y: "-100%" },
    //     "a"
    //   );

    // masterT3
    //   .to(
    //     section2SubSectionsRef.current[1],
    //     // { y: "-100%" },
    //     { y: "-200%" },
    //     "b"
    //   )
    //   .fromTo(
    //     section2SubSectionsRef.current[2],
    //     { y: "-100%" },
    //     { y: "-200%" },
    //     "b"
    //   );

    // // Add mouse move listener
    // window.addEventListener("mousemove", handleMouseMove);

    // Return a cleanup function for all timelines and listeners
    return () => {
      // masterTl.kill();
      tl1.kill();
      // masterT2.kill();
      // masterT3.kill();
      // window.removeEventListener("mousemove", handleMouseMove);
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
        className="h-[100vh] w-full bg-transparent fixed top-0 z-10 pointer-events-none"
      >
        <div className="fixed z-50 top-20 left-1/2 transform -translate-x-1/2">
          <nav className="flex items-center space-x-2 text-sm dark:text-gray-300">
            <span className="uppercase tracking-wider">SERVICES</span>
            <span className="dark:text-white">•</span>
            <span className="dark:text-white uppercase tracking-wider font-medium">
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60"></div>
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
                  {servicesData.description}
                </p>
              </div>
              <div className="tags flex w-full justify-between items-center px-20 absolute bottom-30">
                {servicesData.subCategories.map((s, i) => (
                  <div className="text-white capitalize text-xl font-medium px-10 py-4 border border-zinc-300 rounded-full bg-black/[.3]">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute top-0 left-0 flex w-full h-full pointer-events-none z-10">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  ref={(el) => (linesRef.current[index] = el)}
                  className="h-full w-1/4 bg-white"
                ></div>
              ))}
            </div>
          </div>
        
        </div>
      </div>
    </>
  );
};

export default ServicesDetailLanding;

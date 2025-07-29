import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { HiArrowLongRight } from "react-icons/hi2";

const HomeFifthSection = () => {
  const parentRef = useRef(null);
  const sec1Ref = useRef(null);
  const sec2Ref = useRef(null);
  const sec3Ref = useRef(null);
  const sec4Ref = useRef(null);
  const sec5Ref = useRef(null);
  const sec6Ref = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 0%",
        end: "top -700%",
        scrub: 1,
      },
    });

    // Set initial states
    gsap.set([sec2Ref.current, sec3Ref.current, sec4Ref.current, sec5Ref.current, sec6Ref.current], {
      top: "100%",
    //   opacity: 0,
      scale: 1
    });
    
    gsap.set(sec1Ref.current, {
      top: "30%",
    //   opacity: 0,
      scale: 1
    });

    // Section 1 entrance (0vh to 100vh)
    tl.to(sec1Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    })
    
    // Section 1 scale + Section 2 entrance (100vh to 200vh)
    .to(sec1Ref.current, {
      scale: 0.75,
      top: "-10%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(sec2Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")
    
    // Section 2 scale + Section 3 entrance (200vh to 300vh)
    .to(sec2Ref.current, {
      scale: 0.75,
      top: "-8%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(sec3Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")
    
    // Section 3 scale + Section 4 entrance (300vh to 400vh)
    .to(sec3Ref.current, {
      scale: 0.75,
      top: "-6%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(sec4Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")
    
    // Section 4 scale + Section 5 entrance (400vh to 500vh)
    .to(sec4Ref.current, {
      scale: 0.75,
      top: "-4%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(sec5Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")
    
    // Section 5 scale + Section 6 entrance (500vh to 600vh)
    .to(sec5Ref.current, {
      scale: 0.75,
      top: "-2%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    })
    .to(sec6Ref.current, {
      top: "0%",
      opacity: 1,
      duration: 1,
      ease: "power2.inOut"
    }, "<")
    
    // Section 6 final scale animation (600vh to 700vh)
    .to(sec6Ref.current, {
      scale: 0.75,
      top: "-2%",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.inOut"
    });
    
  }, [sec1Ref.current, parentRef.current]);

  return (
    <div ref={parentRef} className="relative bg-black">
      {/* Main service card */}
      <div className="sticky top-0 w-full h-screen z-10">
        {/* Main content */}
        <div className="relative z-0 max-w-7xl mx-auto py-20">
          {/* Header */}
          <div className="text-center ">
            <h2 className=" text-zinc-200 text-5xl md:text-6xl font-bold tracking-wide">
              OUR SERVICES
            </h2>
          </div>
        </div>

        {/* Futuristic card container */}
        <div
          style={{
            backgroundImage: "url('/images/service1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec1Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/service2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec2Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/service3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec3Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/service4.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec4Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/service5.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec5Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/images/service6.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          ref={sec6Ref}
          className="h-screen w-full absolute z-10 flex items-end"
        >
          <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
            {/* Right side - Service info */}
            <div className="text-white w-[80vw] flex items-end justify-between">
              <div className="">
                <div className="mb-2">
                  <span className="text-zinc-300 text-sm  tracking-wider">
                    Solutions/Services
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                  Web & Digital
                </h3>

                <div className="text-gray-300 text-lg">
                  Website Design | Website Development | UI/UX Design |
                  Ecommerce Sol...
                </div>
              </div>
              <div className="">
                <HiArrowLongRight className="text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* This div creates the scroll height for the sticky effect */}
      <div className="h-[700vh]"></div>
    </div>
  );
};

export default HomeFifthSection;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const ApproachFirstSection = ({ step }) => {
  const imageContainerRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useGSAP(() => {
    if (imageContainerRef.current) {
      // Animate height from 0 to full height
      gsap.to(imageContainerRef.current, {
        // height: "60vh",
        top: "100%",
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      })
      gsap.fromTo([textRef1.current,textRef2.current], {
        y:"100%",
        opacity: 0.5,
      }, {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      })
    }
  }, [imageContainerRef.current,textRef1.current]);

  return (
    <div className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black px-8">
      {/* <div
        ref={screen1Ref}
        className="screen1 top-[100vh] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
      ></div> */}
      {/* <div
        ref={screen2Ref}
        className="screen2 top-[0vh] h-[80vh] w-screen left-0 right-0 z-20 fixed bg-black"
      ></div> */}

      {/* Background Image/Character */}
      <div className="absolute inset-0 pt-24 px-8">
        <div
          className="w-full h-[60vh] flex items-center relative justify-center overflow-hidden"
          style={{
            backgroundImage: `url('${step.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            ref={imageContainerRef}
            className="w-full h-full bg-black absolute top-0 z-20 "
          ></div>
          {/* Content */}
          <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <h1 ref={textRef1} className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[.8] mb-6">
                Innovative &<br />
                Creativity
              </h1>
            </div>

            <p ref={textRef2} className="text-white text-lg md:text-xl font-medium tracking-wide opacity-90">
              Innovation is our territory - and we don't share it
            </p>
          </div>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/[.6]"></div>
      </div>
    </div>
  );
};

export default ApproachFirstSection;

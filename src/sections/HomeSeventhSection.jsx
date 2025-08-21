import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const HomeSeventhSection = () => {
  const lineRefs = React.useRef([]);
  const parentRef = React.useRef(null);

  useGSAP(() => {
    lineRefs.current.forEach((line, index) => {
      if (line) {
        // Set initial position
        gsap.set(line, {
          x: "0%",
        });

        // Create infinite marquee animation that moves exactly 50% (half the content)
        gsap.to(line, {
          x: index % 2 === 0 ? "-30%" : "30%",
          duration: 25,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
      }
    });
  }, [lineRefs.current]);

  return (
    <div
      ref={parentRef}
      className="relative w-full flex flex-col items-center justify-start overflow-hidden pointer-events-none py-10"
    >
      {/* Heading */}
      <div className="text-center my-10">
        <h2 className="dark:text-white text-6xl md:text-7xl font-bold tracking-wide uppercase">
          <TextAnimH1>LOVED BY BRANDS</TextAnimH1>
        </h2>
      </div>

      {/* Grid of rounded rectangles */}
      <div className="px-20">
        <TextAnimP1>
          <div className="w-full flex gap-5 flex-col items-center justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                ref={(el) => (lineRefs.current[i] = el)}
                className="w-full flex gap-10 whitespace-nowrap"
              >
                {/* First set of logos */}
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={`first-${j}`}
                    className="w-50 h-20 rounded-[3.5rem] border-2 border-[#6b5b5b] opacity-60 overflow-hidden flex items-center justify-center px-10 flex-shrink-0"
                  >
                    <img
                      className="w-full object-contain"
                      src={`/images/logo-black.svg`}
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {Array.from({ length: 8 }).map((_, j) => (
                  <div
                    key={`second-${j}`}
                    className="w-50 h-20 rounded-[3.5rem] border-2 border-[#6b5b5b] opacity-60 overflow-hidden flex items-center justify-center px-10 flex-shrink-0"
                  >
                    <img
                      className="w-full object-contain"
                      src={`/images/logo-black.svg`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </TextAnimP1>
      </div>
    </div>
  );
};

export default HomeSeventhSection;

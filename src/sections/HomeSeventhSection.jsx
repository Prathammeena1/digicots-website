import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import TextAnimation from "../components/TextAnimation";

const HomeSeventhSection = () => {
  const lineRefs = React.useRef([]);
  const parentRef = React.useRef(null);

  useGSAP(() => {
    lineRefs.current.forEach((line, index) => {
      if (line) {
        gsap.set(line, { x: "0%" });
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

  // Brand images array
  const brandImages = [
    "10.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
  ];

  return (
    <div
      ref={parentRef}
      className="relative w-full flex flex-col items-center justify-start overflow-hidden pointer-events-none py-30 bg-white"
    >
      {/* Heading */}
      <div className="text-center my-10">
        {/* <h2 className="dark:text-white text-6xl md:text-7xl font-bold tracking-wide uppercase">
          <TextAnimH1>LOVED BY BRANDS</TextAnimH1>
        </h2> */}
        <div className="text-center mt-10 px-30">
          <TextAnimP1>
            <div className="text-center">
              <h2 className="dark:text-white heading-text mb-5">
                <TextAnimation>Loved By Brands</TextAnimation>
              </h2>
              <h2 className="dark:text-zinc-200 subHeading-text w-full">
                <TextAnimation
                  animeStart="95"
                  animeEnd="90"
                  duration={0.1}
                  stagger={10}
                >
                  Our Alpha Edge represents innovation, precision, and
                </TextAnimation>
              </h2>
            </div>
          </TextAnimP1>
        </div>
      </div>

      {/* Grid of rounded rectangles */}
      <div className="px-20 mt-4">
        <TextAnimP1>
          <div className="w-full flex gap-5 flex-col items-center justify-center">
            {[0, 1, 2].map((rowIdx) => (
              <div
                key={rowIdx}
                ref={(el) => (lineRefs.current[rowIdx] = el)}
                className="w-full flex gap-3 whitespace-nowrap"
              >
                {Array.from({ length: 36 }).map((_, repeatIdx) => (
                  <div
                    key={`brand-${rowIdx}-${repeatIdx}`}
                    className="w-30 h-14 rounded-[3.5rem] pointer-events-auto border-2 border-[#d1d1d1] opacity-60 overflow-hidden flex items-center justify-center px-10 flex-shrink-0 group"
                  >
                    <img
                      className="w-full object-contain scale-[2.3] filter grayscale transition-all duration-300 group-hover:filter-none"
                      src={`/final-images/brands/${
                        brandImages[((rowIdx * 3 + repeatIdx) % 3) + rowIdx * 3]
                      }`}
                      alt={`Brand ${
                        ((rowIdx * 3 + repeatIdx) % 3) + rowIdx * 3 + 1
                      }`}
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

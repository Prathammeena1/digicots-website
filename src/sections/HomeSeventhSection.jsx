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
      className="relative w-full flex flex-col items-center justify-start overflow-hidden pointer-events-none py-10 px-30"
    >
      {/* Heading */}
      <div className=" my-10 text-white w-full ">
        {/* <h2 className="dark:text-white text-6xl md:text-7xl font-bold tracking-wide uppercase">
          <TextAnimH1>LOVED BY BRANDS</TextAnimH1>
        </h2> */}

        <div className="flex items-end justify-between  w-full">
          <div className="left">
            <h2 className="text-md text-zinc-500 font-semibold">Clients</h2>
            <h1 className="text-4xl font-bold ">
              Our tour <br /> more than 15 years.
            </h1>
          </div>
          <div className="right">
            <p className="text-md text-zinc-200">With years of experience in the industry, we have honed our ability to create digital <br /> solutions that exceed expectations.</p>
          </div>
        </div>

        <div className="text-center mt-10 px-30">
          <TextAnimP1>
            <div className="text-center">
              <h2 className="dark:text-white heading-text mb-5">
                {/* <TextAnimation> */}
                {/* Trusted by Leading Brands Across Industries */}
                {/* </TextAnimation> */}
              </h2>
              <h2 className="dark:text-zinc-200 subHeading-text w-full">
                {/* <TextAnimation
                  animeStart="95"
                  animeEnd="90"
                  duration={0.1}
                  stagger={10}
                >
                  Our Alpha Edge represents innovation, precision, and
                </TextAnimation> */}
              </h2>
            </div>
          </TextAnimP1>
        </div>
      </div>



            <div className="absolute top-0 left-0 h-full bg-black w-30 z-20"></div>
            <div className="absolute top-0 right-0 h-full bg-black w-30 z-20"></div>
      {/* Grid of rounded rectangles */}
      <div className="mt-4 overflow-hidden relative">
        <TextAnimP1>
          <div className="w-full flex gap-5 flex-col items-center justify-center overflow-hidden relative ">
            {[0, 1, 2].map((rowIdx) => (
              <div
                key={rowIdx}
                ref={(el) => (lineRefs.current[rowIdx] = el)}
                className="w-full flex gap-3 whitespace-nowrap"
              >
                {Array.from({ length: 36 }).map((_, repeatIdx) => (
                  <div
                    key={`brand-${rowIdx}-${repeatIdx}`}
                    className="w-28 h-28 rounded-[99%] pointer-events-auto border-2 border-zinc-200 opacity-60 overflow-hidden flex items-center justify-center px-10 flex-shrink-0 group"
                  >
                    <img
                      className="w-full object-contain scale-[4.2] filter grayscale transition-all duration-300 group-hover:filter-none"
                      src={`/final-images/brands/9.png`}
                      // src={`/final-images/brands/${
                      //   brandImages[((rowIdx * 3 + repeatIdx) % 3) + rowIdx * 3]
                      // }`}
                      alt={`Brand ${((rowIdx * 3 + repeatIdx) % 3) + rowIdx * 3 + 1
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

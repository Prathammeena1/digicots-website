import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Example image URLs (replace with your own or import dynamically)
const images = [
  "/images/approach1.png",
  "/images/approach2.png",
  "/images/approach3.png",
];

const NUM_COLS = 3;
const NUM_ROWS = 10;

// Create a 2D array of images for the grid
const getGrid = () => {
  let grid = [];
  for (let c = 0; c < NUM_COLS; c++) {
    let col = [];
    for (let r = 0; r < NUM_ROWS; r++) {
      col.push(images[(c * NUM_ROWS + r) % images.length]);
    }
    grid.push(col);
  }
  return grid;
};

const grid = getGrid();

const KineticGrid = () => {
  const colRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggers = [];
    for (let c = 0; c < NUM_COLS; c++) {
      const phase = (c / NUM_COLS) * Math.PI * 2;
      const col = colRefs.current[c];
      if (col) {
        const distance = NUM_ROWS * 220; // px to scroll
        const direction = c % 2 === 0 ? -1 : 1; // Reverse direction for odd columns
        triggers.push(
          gsap.to(col, {
            y: direction * distance,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "top -400%",
              scrub: true,
              onUpdate: (self) => {
                // Add phase offset for kinetic effect
                const progress = self.progress;
                const offset = Math.sin(progress * Math.PI * 2 + phase) * 60;
                gsap.set(col, {
                  y: Math.abs(distance) * progress * direction + offset,
                });
              },
            },
          })
        );
      }
    }
    return () => {
      triggers.forEach((t) => t.scrollTrigger && t.scrollTrigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-[467vh]">
      <div
        ref={containerRef}
        className="w-full h-screen sticky top-0 bg-black flex items-center justify-center overflow-hidden"
      >
        <div className="h-[30vh] w-full absolute top-0 bg-gradient-to-b from-black to-transparent z-10"></div>
        {/* <div className="h-[30vh] w-full absolute top-0 bg-gradient-to-b from-black to-transparent z-10"></div> */}
        {/* <div className="h-[30vh] w-full absolute bottom-0 bg-gradient-to-t from-black to-transparent z-10"></div> */}
        <div className="h-[30vh] w-full absolute bottom-0 bg-gradient-to-t from-black to-transparent z-10"></div>
        <div className="flex gap-16 h-fit w-full px-20">
          {grid.map((col, cIdx) => (
            <div
              key={cIdx}
              ref={(el) => (colRefs.current[cIdx] = el)}
              className={`flex flex-col gap-20 h-full w-full will-change-transform ${
                cIdx === 1 ? "mt-84" : ""
              }`}
              style={{ height: "100%" }}
            >
              {col.map((img, rIdx) => (
                <div
                  key={rIdx}
                  className="w-full  overflow-hidden shadow-lg flex justify-center flex-col gap-4"
                >
                  <img
                    src={img}
                    alt="grid"
                    className="w-full h-[60vh] object-cover rounded"
                    style={{
                      background: "#222",
                      minHeight: "100%",
                      minWidth: "100%",
                    }}
                  />
                  <div className="flex items-start justify-between text-md ">
                    <h1 className=" text-zinc-200 text-3xl font-semibold">
                      Cap & Caps
                    </h1>

                    <h6 className="text-zinc-400">2021</h6>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KineticGrid;

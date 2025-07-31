import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";

const HomeSeventhSection = () => {

    const lineRefs = React.useRef([]);
    const parentRef = React.useRef(null);

    gsap.registerPlugin(ScrollTrigger);
    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: parentRef.current,
                start: "top 70%",
                end: "top 00%",
                scrub: 1,
            }
        })
        
        lineRefs.current.forEach((line, index) => {
            tl.from(line, {
                x: index % 2 === 0 ? "-100%" : "100%",
                duration: 15,
                opacity: 0,
                ease: "power4.out"
            }, index * 2);
        });

    },[lineRefs.current]);



  return (
    <div ref={parentRef} className="relative h-screen w-full flex flex-col items-center justify-start overflow-hidden">
      {/* Heading */}
      <h2 className="relative z-10 text-[2.7rem] font-bold text-[#fbeaea] mt-20 mb-8 text-center">
        LOVED by BRANDS
      </h2>

      {/* Grid of rounded rectangles */}
      <div className="px-20">
        <div className="w-full flex gap-5 flex-col items-center justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} ref={(el) => (lineRefs.current[i] = el)} className="w-full flex gap-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-50 h-20 rounded-[3.5rem] border-2 border-[#6b5b5b] opacity-60 overflow-hidden flex items-center justify-center px-10"
                >
                  <img
                    className="w-full object-contain"
                    src={`/images/logo-1.png`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSeventhSection;

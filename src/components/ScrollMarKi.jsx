import gsap from "gsap";
import React, { useEffect } from "react";

const ScrollMarKi = ({direction = 1}) => {
  const secRef = React.useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: secRef.current,
        start: "top 120%",
        end: "top -20%",
        scrub: true,
      },
    });
    
    tl.fromTo(
      secRef.current,
      {
        translateX: `${20 * direction}%`,
      },
      {
        translateX: `${-20 * direction}%`,
        ease: "none",
      }
    );
  });

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div ref={secRef} className="whitespace-nowrap text-[8vw]">
        Some Marketing Text Here Some Marketing Text Here 
      </div>
    </div>
  );
};

export default ScrollMarKi;

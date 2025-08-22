import gsap from "gsap";
import React, { useEffect } from "react";

const ScrollMarKi = ({direction = 1,children}) => {
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
        translateX: `${30 * direction}%`,
      },
      {
        translateX: `${-10 * direction}%`,
        ease: "none",
      }
    );
  });

  return (
    <div className="w-full flex items-center justify-center overflow-hidden bg-white">
      <div
        ref={secRef}
        className="whitespace-nowrap text-[12vw] uppercase text-transparent bg-clip-text"
        style={{
          background: 'linear-gradient(to right, #ff95b1, #ec38bc, #7303c0, #380775)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollMarKi;

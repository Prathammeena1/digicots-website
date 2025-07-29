import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect } from "react";

const ApproachFirstSection = () => {
  // const screen1Ref = React.useRef(null);
  // const screen2Ref = React.useRef(null);

  // useGSAP(() => {
  //   // if (screen1Ref.current && screen2Ref.current) {
  //     // gsap.to(screen1Ref.current, {
  //     //   top: "-100%",
  //     //   duration: 1.2,
  //     //   ease: "power2.inOut",
  //     //   delay: 0.8,
  //     // });
  //     // gsap.to(screen2Ref.current, {
  //     //   top: "100%",
  //     //   duration: 1.2,
  //     //   ease: "power2.inOut",
  //     //   delay: 0.8,
  //     // });
  //   // }
  // }, []);


  useEffect(()=>{
    
  })




  return (
    <div className="relative h-[100vh] flex items-center justify-center overflow-hidden pt-28">
      {/* <div
        ref={screen1Ref}
        className="screen1 top-[100vh] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
      ></div> */}
      {/* <div
        ref={screen2Ref}
        className="screen2 top-[0vh] h-[80vh] w-screen left-0 right-0 z-20 fixed bg-black"
      ></div> */}

      {/* Background Image/Character */}
      <div className="absolute inset-0">
        <div
          className="w-full h-[60vh] flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600"
          style={{
            backgroundImage: `url('/images/approach1.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Content */}
          <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-[.8] mb-6">
              Innovative &<br />
              Creativity
            </h1>

            <p className="text-white text-lg md:text-xl font-medium tracking-wide opacity-90">
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

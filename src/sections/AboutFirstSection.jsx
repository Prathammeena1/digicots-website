import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const AboutFirstSection = () => {
  const boxRef = React.useRef(null);

  const handleBoxMouseMove = (e) => {
    if (boxRef.current) {
      // Get mouse X position relative to window width
      const mouseX = e.clientX;
      const windowWidth = window.innerWidth;

      // Calculate percentage of mouse position (0 to 1)
      const mousePercentage = mouseX / windowWidth;

      // Account for container padding (px-12 = 48px on each side)
      const containerPadding = 48; // 12 * 4 = 48px (Tailwind px-12)
      const boxWidth = 400;

      // Calculate available movement space
      const availableWidth = windowWidth - containerPadding * 2 - boxWidth;

      // Calculate target position (starts from containerPadding, not 0)
      const targetX = mousePercentage * availableWidth;

      // Animate box to follow mouse X position
      gsap.to(boxRef.current, {
        x: targetX,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleBoxMouseMove);

    // Cleanup event listener
    return () => {
      window.removeEventListener("mousemove", handleBoxMouseMove);
    };
  }, []);

  return (
    <div className="section min-h-screen flex items-center justify-start px-12 py-16 overflow-hidden relative">
      <div className="h-[60vh] w-full relative z-10">
        {/* Content for the first section of the About page */}
        <div
          ref={boxRef}
          className="h-[270px] w-[380px] absolute left-0 transform bottom-0 rounded-xl overflow-hidden"
        >
          <video
            src="https://www.datocms-assets.com/57508/1738945450-loop_03.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          ></video>
        </div>
      </div>
      <div className="absolute h-screen w-full top-0 left-0 px-12 pt-28 ">
        <h1 className="font-bold text-[8vw] leading-[1] ">
          Future-Proof <br /> Design Agency
        </h1>

        <p className="mt-[250px] ">
          The force della knowledge, the impact della creativity, the
          pervasiveness <br /> della technology. With the consulting of
          marketing and communication of <br /> Quamm, the value del your
          business grows in the tempo.
        </p>

        <div className="absolute bottom-16 right-12 flex items-center gap-2 text-3xl ">
          (<h2>Scroll</h2>
          <HiOutlineArrowLongRight />)
        </div>
      </div>
    </div>
  );
};

export default AboutFirstSection;

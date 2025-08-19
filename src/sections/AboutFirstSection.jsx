import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const AboutFirstSection = () => {
  const boxRef = React.useRef(null);

  const handleBoxMouseMove = (e) => {
    if (boxRef.current) {
      // Get the parent container element
      const parentContainer = boxRef.current.closest(".mx-30");
      const containerRect = parentContainer
        ? parentContainer.getBoundingClientRect()
        : null;

      if (containerRect) {
        // Get mouse X position relative to the container
        const mouseX = e.clientX;

        // Container boundaries (excluding padding)
        const containerLeft = containerRect.left;
        const containerRight = containerRect.right;
        const containerWidth = containerRect.width;

        // Box dimensions
        const boxWidth = 380; // w-[380px]

        // Calculate available movement space within the container content area
        const availableWidth = containerWidth - boxWidth;

        // Calculate mouse position relative to container (0 to 1)
        const mouseRelativeToContainer = Math.max(
          0,
          Math.min(1, (mouseX - containerLeft) / containerWidth)
        );

        // Calculate target position within the available space
        const targetX = mouseRelativeToContainer * availableWidth;

        // Animate box to follow mouse X position within container bounds
        gsap.to(boxRef.current, {
          x: targetX,
          duration: 0.4,
          ease: "power2.out",
        });
      }
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
    <div className="section min-h-screen relative pointer-events-none">
      <div className=" h-screen mx-30 pt-18">
        <h1 className="font-bold text-[8vw] leading-[1.2] ">
          <TextAnimH1 isLanding={true} delay={0.2}>Future-Proof</TextAnimH1>
          <TextAnimH1 isLanding={true} delay={0.4}>Design Agency</TextAnimH1>
        </h1>

        <TextAnimP1 isLanding={true} delay={0.6}>
          <div
            ref={boxRef}
            className="h-[270px] w-[380px] transform rounded-xl overflow-hidden"
          >
            <video
              src="https://www.datocms-assets.com/57508/1738945450-loop_03.mp4"
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            ></video>
          </div>
        </TextAnimP1>

        <div className="flex w-full justify-between items-end">
          <p className="">
            <TextAnimP1 isLanding={true} delay={0.8}>
              The force della knowledge, the impact della creativity, the
              pervasiveness <br /> della technology. With the consulting of
              marketing and communication of <br /> Quamm, the value del your
              business grows in the tempo.
            </TextAnimP1>
          </p>

            <TextAnimP1 isLanding={true} delay={1.0}>
          <div className="flex items-center gap-2 text-3xl ">
            (<h2>Scroll</h2>
            <HiOutlineArrowLongRight />)
          </div>
          </TextAnimP1>
        </div>
      </div>
    </div>
  );
};

export default AboutFirstSection;

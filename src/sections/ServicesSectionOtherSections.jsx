import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);


const data = [
  {
    navTitle: "Section 1",
    title: "Boba Ice-cream with Chocochips",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication of Quamm, the value del your business grows in the tempo.",
  },
];


const ServicesSectionOtherSections = () => {
  const parentRef = React.useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 33%",
        end: "top 25%",
        scrub: true,
        // markers: true,
      },
      ease: "power3.inOut",
    });

    tl.fromTo(
      parentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2 }
    );
  }, []);

  return (
    <div ref={parentRef} className=" py-10 min-h-screen w-full relative z-20 opacity-0 px-30 bg-white">
      <div
        className=" h-[100%] pt-50"
      >
        <h2 className="text-[5vw] font-black leading-[1.2] w-[40vw]">{data[0].title}</h2>
        <p className="w-[35vw] text-lg mt-20 ">{data[0].description}</p>
      </div>
    </div>
  );
};

export default ServicesSectionOtherSections;



import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import { useLoading } from "../context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);
const TextAnimP1 = ({ children, isLanding = false, delay = 0 }) => {
  //   console.log(children);
  const parentRef = React.useRef(null);
  const childRef = React.useRef(null);

  // Get loading state
  const { isLoading } = useLoading();

  useGSAP(() => {
    if (!isLanding) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 80%",
          end: "top 78%",
          // scrub: true,
          //   markers: true,
        },
      });

      tl.fromTo(
        childRef.current,
        { y: 100, opacity: 0, },
        {
            y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.inOut",
        }
      );
    } else {
      !isLoading &&
        gsap.fromTo(
          childRef.current,
          { y: 100, opacity: 0, },
          {
              y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: delay,
            ease: "power3.inOut",
          }
        );
    }
  }, [childRef.current, parentRef.current, isLanding, isLoading]);

  return (
    <div ref={parentRef} className="h-auto">
      <div ref={childRef} className="h-auto">
        {children}
      </div>
    </div>
  );
};

export default TextAnimP1;

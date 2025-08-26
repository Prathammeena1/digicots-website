import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

gsap.registerPlugin(ScrollTrigger);
const TextAnimP1 = ({ children, isLanding = false, delay = 0 }) => {
  const parentRef = React.useRef(null);
  const childRef = React.useRef(null);
  const hasAnimatedRef = React.useRef(false);

  // Get loading state
  const { isLoading } = useLoading();

  // Handle landing animation
  useEffect(() => {
    if (isLanding && !isLoading && !hasAnimatedRef.current) {
      console.log("Starting landing animation for TextAnimP1");
      hasAnimatedRef.current = true;
      
      gsap.fromTo(
        childRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: delay,
          ease: "power3.inOut"
        }
      );
    }
  }, [isLanding, isLoading, delay]);

  // Handle scroll-triggered animation
  useGSAP(() => {
    if (!isLanding && !hasAnimatedRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: "top 90%",
          end: "top 88%",
          // markers: true, // Enable for debugging
        },
      });

      tl.fromTo(
        childRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power3.inOut",
          onComplete: () => {
            hasAnimatedRef.current = true;
          }
        }
      );
    }
  }, [isLanding]);

  return (
    <span ref={parentRef} className="h-auto ">
      <span ref={childRef} className="h-auto ">
        {children}
      </span>
    </span>
  );
};

export default TextAnimP1;

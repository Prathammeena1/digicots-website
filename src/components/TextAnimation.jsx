import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

const TextAnimation = ({ children, className = "", animeStart = "50", animeEnd = "40", duration = 0.5, scrub = false, stagger = 20 }) => {
  const parentRef = useRef(null);
  const letterRefs = useRef([]);
  // ✅ Don't reset here! Only push valid refs inside rendering

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (!letterRefs.current.length) return;

    // ✅ Fix fromTo structure
    gsap.fromTo(
      letterRefs.current,
      { opacity: 0.3 },
      {
        opacity: 1,
        duration: duration,
        stagger: duration / stagger,
        ease: "none",
        scrollTrigger: {
          trigger: parentRef.current,
          start: `top ${animeStart}%`,
          end: `top ${animeEnd}%`,
          scrub: scrub,
          toggleActions: scrub ? undefined : "play none none none", // ✅ Prevent reverse when scrub false
        },
      }
    );
  }, []);

  let letterIndexCounter = 0;

  const wrappedText = React.Children.toArray(children).flatMap((child, childIndex) => {
    if (typeof child === "string") {
      return child.split(" ").map((word, wordIndex) => (
        <span key={`${childIndex}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, index) => {
            const refIndex = letterIndexCounter++;
            return (
              <span
                key={refIndex}
                ref={(el) => {
                  if (el) letterRefs.current[refIndex] = el;
                }}
                className="inline-block"
              >
                {letter}
              </span>
            );
          })}
          <span className="inline-block">&nbsp;</span>
        </span>
      ));
    } else if (React.isValidElement(child) && child.type === "br") {
      return <br key={`br-${childIndex}`} />;
    }
  });

  return (
    <div ref={parentRef} className={`${className} w-full`}>
      <div>{wrappedText}</div>
    </div>
  );
};

export default TextAnimation;
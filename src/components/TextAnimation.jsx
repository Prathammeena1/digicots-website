import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

const TextAnimation = ({ children, className = "", animeStart = "50", animeEnd = "40", duration = 0.5, scrub = false, stagger = 20 }) => {
  const parentRef = useRef(null);
  const letterRefs = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    // Filter out null/undefined refs
    const validRefs = letterRefs.current.filter(ref => ref !== null && ref !== undefined);
    
    if (!validRefs.length) return;

    // Create the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: `top ${animeStart}%`,
        end: `top ${animeEnd}%`,
        scrub: scrub,
        toggleActions: scrub ? undefined : "play none none reverse",
      }
    });

    tl.fromTo(
      validRefs,
      { 
        opacity: 0.3,
        y: 1,
      },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: duration / stagger,
        ease: "power2.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === parentRef.current) {
          trigger.kill();
        }
      });
    };
  }, [animeStart, animeEnd, duration, scrub, stagger]);

  let letterIndexCounter = 0;

  // Reset letterRefs before creating new refs
  letterRefs.current = [];

  const wrappedText = React.Children.toArray(children).flatMap((child, childIndex) => {
    if (typeof child === "string") {
      return child.split(" ").map((word, wordIndex) => (
        <span key={`${childIndex}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, letterIndex) => {
            const refIndex = letterIndexCounter++;
            return (
              <span
                key={`${childIndex}-${wordIndex}-${letterIndex}`}
                ref={(el) => {
                  if (el) letterRefs.current[refIndex] = el;
                }}
                className="inline-block"
                style={{ opacity: 0.3 }}
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
    return child;
  });

  return (
    <div ref={parentRef} className={`${className} w-full`}>
      <div>{wrappedText}</div>
    </div>
  );
};

export default TextAnimation;
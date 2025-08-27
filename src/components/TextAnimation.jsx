import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

const TextAnimation = ({ children, className = "", animeStart = "90", animeEnd = "85", duration = .2, scrub = false, stagger = 10 }) => {
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

    // Use a GSAP timeline for smooth, synced color transitions
    const tlLetters = gsap.timeline({
      scrollTrigger: tl.scrollTrigger,
    });
    tlLetters.fromTo(validRefs,
      { opacity: 0, color: '#ED510C', y: 1 },
      {
        opacity: 1,
        color: '#ED510C',
        y: 0,
        duration: duration,
        stagger: stagger / 300,
        ease: 'power3.inOut',
      },"a"
    )
    .to(validRefs, {
      color: '#D2D2D2',
      duration: duration,
      // delay: stagger / 100,
      stagger: stagger / 300,
      ease: 'power3.inOut',
    // },`a+=.05`)
    },`a+=${stagger / 350}`)
    .to(validRefs, {
      // delay: stagger / 100,
      color: '#fff',
      duration: duration,
      stagger: stagger / 300,
      ease: 'power3.inOut',
    },`a+=${stagger / 40}`);
    // },"a+=.3");

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
      {wrappedText}
    </div>
  );
};

export default TextAnimation;
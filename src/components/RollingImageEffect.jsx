import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef, useCallback } from 'react'

gsap.registerPlugin(ScrollTrigger);

const RollingImageEffect = React.memo(({children, direction = "horizontal", align = "left"}) => {
    const divRef = useRef(null);
    const animationRef = useRef(null);

    useGSAP(() => {
        // Prevent multiple animations on the same element
        if (animationRef.current) {
            animationRef.current.kill();
        }

        if (!divRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: divRef.current,
                start: "top 60%",
                end: "top 40%",
                once: true, // Only trigger once to prevent re-animations
                onComplete: () => {
                    animationRef.current = null;
                }
            }
        });

        if (direction === "horizontal") {
            tl.fromTo(divRef.current, 
                { x: 0, alignSelf: align }, 
                { x: align === "right" ? "100%" : "-100%", duration: 1.5, ease: "power3.inOut" }
            );
        } else {
            tl.fromTo(divRef.current, 
                { height: '100%', alignSelf: align }, 
                { height: 0, duration: 1.5, ease: "power3.inOut" }
            );
        }

        animationRef.current = tl;

        // Cleanup function
        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
                animationRef.current = null;
            }
        };
    }, { dependencies: [direction, align], revertOnUpdate: true }); // Better dependency management

  return (
    <div className='h-full w-full relative overflow-hidden'>
        <div ref={divRef} className='w-full h-full absolute top-0 left-0 bg-black pointer-events-none z-30'>

        </div>

        {children}
    </div>
  )
});

export default RollingImageEffect;
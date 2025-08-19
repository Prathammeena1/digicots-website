import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CountingAnimation = ({ children, duration = 1.5 }) => {
  const parentRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);
  const target = typeof children === 'number' ? children : parseInt(children);

  useGSAP(() => {
    if (!hasAnimatedRef.current) {
      const obj = { val: 0 };
      gsap.timeline({
        scrollTrigger: {
          trigger: parentRef.current,
          start: 'top 80%',
          once: true,
        }
      })
      .to(obj, {
        val: target,
        duration: duration,
        ease: 'power3.inOut',
        onUpdate: () => setCount(Math.floor(obj.val)),
        onComplete: () => {
          setCount(target);
          hasAnimatedRef.current = true;
        }
      });
    }
  }, [target, duration]);

  return (
    <span ref={parentRef}>{count}</span>
  );
};

export default CountingAnimation;
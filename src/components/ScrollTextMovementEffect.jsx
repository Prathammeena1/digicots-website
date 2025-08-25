
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const ScrollTextMovementEffect = () => {
  const textRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const charactersRef = React.useRef([]);

  gsap.registerPlugin(ScrollTrigger);
  
  // Split text into characters on mount
  React.useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.textContent;
      textRef.current.innerHTML = '';
      charactersRef.current = [];
      
      // Create character spans
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
        span.style.display = 'inline-block';
        span.style.transform = `translateY(${Math.random() * 550 - 350}px) rotate(${Math.random() * 90 - 45}deg)`;
        span.style.opacity = '0.1';
        span.style.transformOrigin = 'center center';
        textRef.current.appendChild(span);
        charactersRef.current.push(span);
      });
    }
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top -650%",
        scrub: 1,
      },
    });

    // Animate the entire text container sliding from right to left
    tl.fromTo(
      textRef.current,
      {
        x: "0%",
      },
      {
        x: "-100%",
        duration: 2,
        ease: "power2.out",
      }
    );

    // Character animation timeline
    const charTl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 30%",
        end: "top -350%",
        scrub: 1,
      },
    });

    // Animate each character coming into position
    charactersRef.current.forEach((char, index) => {
      charTl.to(char, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        // delay: index * 1, // Stagger each character by 0.5 seconds
      }, index * 0.1); // Stagger each character by 0.5 seconds
    });

  }, [textRef.current, charactersRef.current]);

  return (
    <div className="relative h-[600vh] w-full bg-black">
      <div
        ref={parentRef}
        className="h-screen w-full sticky left-10 top-0 bg-transparent pt-30 overflow-hidden"
      >
        <p
          ref={textRef}
          className="text-zinc-200 text-center font-[600] absolute top-1/2 left-[80%] transform -translate-y-1/2 z-20 w-[5500px] text-9xl"
        >
          We Squeeze Out the Best of Global Applied Marketing & Strategy to
          Drive Customer Loyalty
        </p>

        <div className="text-roll-effect w-full mt-12 relative z-50"></div>
      </div>
    </div>
  );
};

export default ScrollTextMovementEffect;


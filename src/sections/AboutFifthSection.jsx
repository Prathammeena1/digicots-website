import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutFifthSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const creators = [
    [
      {
        id: 1,
        name: "Moulik Saxena",
        role: "Co-Founder",
        image: "/images/man1.png", // Replace with actual image path
        isHighlighted: false,
      },
      {
        id: 2,
        name: "Amit Kumar",
        role: "Co-Founder",
        image: "/images/man2.png", // Replace with actual image path
        isHighlighted: true,
      },
      {
        id: 3,
        name: "Pratham Meena",
        role: "Full-Stack Developer",
        image: "/images/man3.png", // Replace with actual image path
        isHighlighted: false,
      },
    ],
    [
      {
        id: 1,
        name: "Moulik Saxena",
        role: "Co-Founder",
        image: "/images/man1.png", // Replace with actual image path
        isHighlighted: false,
      },
      {
        id: 2,
        name: "Amit Kumar",
        role: "Co-Founder",
        image: "/images/man2.png", // Replace with actual image path
        isHighlighted: true,
      },
      {
        id: 3,
        name: "Pratham Meena",
        role: "Full-Stack Developer",
        image: "/images/man3.png", // Replace with actual image path
        isHighlighted: false,
      },
    ],
  ];

  useEffect(() => {
    // Animate title and description first
    gsap.fromTo([titleRef.current, descriptionRef.current], 
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    // Set initial state for all cards
    cardsRef.current.forEach((card) => {
      if (card) {
        gsap.set(card, {
          y: 80,
          opacity: 0,
          scale: 0.95
        });
      }
    });

    // Animate cards when they come into view
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: index * 0.15, // Stagger the animations
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });
  }, []);

  return (
    <div className="h-[200vh] w-full relative text-white pt-16" ref={sectionRef}>
      <div className="w-full mx-auto px-30">
        {/* Content Container */}
        <div className="">
          {/* Top Side - Text Content */}
          <div className="flex w-full items-center justify-between mb-10">
            <div className="w-fit" ref={titleRef}>
              <h2 className="text-6xl lg:text-7xl font-bold leading-[1] mt-2">
                Our Fundamental
                <br />
                <span className="text-white">Creators</span>
              </h2>
            </div>

            <div className="w-fit" ref={descriptionRef}>
              <p className="text-lg text-gray-300 leading-[1.6]">
                We craft data-driven strategies aligned with <br /> your goals
                to drive growth and keep you <br /> competitive in a changing
                market. To drive <br /> growth and keep you competitive.
              </p>
            </div>
          </div>

          {/* Bottom Side - Creators Grid */}
          {creators.map((arr, groupIndex) => {
            return (
              <div key={groupIndex} className="flex justify-between">
                {arr.map((c, i) => {
                  const cardIndex = groupIndex * arr.length + i;
                  return (
                    <div 
                      className="card h-[65vh] w-fit relative overflow-hidden" 
                      key={`${groupIndex}-${c.id}`}
                      style={{ marginTop: `${i * 4}rem` }}
                      ref={(el) => cardsRef.current[cardIndex] = el}
                    >
                      <div className="img">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-[22vw] h-full object-cover rounded-lg"
                        />
                        <div className="content">
                          <p className="text-lg text-gray-300">
                            {c.role}
                          </p>
                          <h3 className="text-2xl font-semibold">
                            {c.name}
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutFifthSection;

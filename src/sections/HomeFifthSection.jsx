import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

// Services data array
const servicesData = [
  {
    id: 1,
    image: "/images/WebnDigital.webp",
    category: "Solutions/Services",
    title: "Web & Digital",
    description:
      "Website Design | Website Development | UI/UX Design | Ecommerce Sol...",
      href: "/services/1"
    },
    {
      id: 2,
      image: "/images/WebnDigital_2.webp",
      category: "Solutions/Services",
      title: "Branding",
      description:
      "Logo Design  |  Brand Strategy  |  Visual Identity  |  Brand Guidelines  |  Na...",
      href: "/services/2"
    },
    {
      id: 3,
      image: "/images/service3.png",
      category: "Solutions/Services",
      title: "Digital Marketing",
      description:
      "Logo Design | Brand Identity | Marketing Materials | Brand Strategy...",
      href: "/services/3"
    },
    {
      id: 4,
      image: "/images/service4.png",
      category: "Solutions/Services",
      title: "Content Generation",
      description:
      "3D Modelling  |  Content Strategy  |  Copywriting  |  Photography   |  Anim...",
      href: "/services/4"
    },
    {
      id: 5,
      image: "/images/service5.png",
      category: "Solutions/Services",
    title: "Production (Pre-Post)",
    description:
      "Creative Direction & Storyboarding  |  Scriptwriting & Copywriting  |  Cam...",
      href: "/services/5"
    },
    {
      id: 6,
      image: "/images/service6.png",
      category: "Solutions/Services",
      title: "Creatives & Graphics",
      description:
      "Creatives Solutions  |  Motion Design  |  Illustration Design  |  Print...",
      href: "/services/6"
  },
];

const HomeFifthSection = () => {
  const parentRef = useRef(null);
  const sectionRefs = useRef([]);

  // Initialize refs array
  if (sectionRefs.current.length !== servicesData.length) {
    sectionRefs.current = Array(servicesData.length)
      .fill()
      .map((_, i) => sectionRefs.current[i] || React.createRef());
  }

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 0%",
        end: "top -600%",
        scrub: 1,
      },
    });

    // Set initial states for all sections except the first one
    const allRefsExceptFirst = sectionRefs.current.slice(1);
    gsap.set(
      allRefsExceptFirst.map((ref) => ref.current),
      {
        top: "100%",
        scale: 1,
      }
    );

    gsap.set(sectionRefs.current[0].current, {
      top: "0%",
      scale: 1,
    });

    // Create animations for each section transition
    sectionRefs.current.forEach((ref, index) => {
      if (index < sectionRefs.current.length - 1) {
        const currentSection = sectionRefs.current[index];
        const nextSection = sectionRefs.current[index + 1];

        // Scale current section and bring in next section
        tl.to(currentSection.current, {
          scale: 0.75,
          top: `${-10 + index * 2}%`, // Progressive top positioning
          borderRadius: "20px",
          duration: 1,
          ease: "power2.inOut",
        }).to(
          nextSection.current,
          {
            top: "0%",
            opacity: 1,
            duration: 1,
            ease: "power2.inOut",
          },
          "<"
        );
      } else {
        // Final section scale animation
        tl.to(ref.current, {
          scale: 0.75,
          top: "-2%",
          borderRadius: "20px",
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  }, [parentRef.current, ...sectionRefs.current]);

  return (
    <div ref={parentRef} className="relative bg-black">
      {/* Main service card */}
      <div className="sticky top-0 w-full h-screen z-10">
        {/* Mapped service sections */}
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            style={{
              backgroundImage: `url('${service.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            ref={sectionRefs.current[index]}
            className="h-screen w-full absolute z-10 flex items-end"
          >
            <div className="h-[90%] w-full bg-gradient-to-b from-transparent to-black"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center absolute bottom-20 left-40">
              {/* Service info */}
              <div className="text-white w-[80vw] flex items-end justify-between">
                <div className="">
                  <div className="mb-2">
                    <span className="text-zinc-300 text-sm tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-semibold mb-2">
                    {service.title}
                  </h3>

                  <div className="text-gray-300 text-lg">
                    {service.description}
                  </div>
                </div>
                <Link to={service.href} className="">
                  <HiArrowLongRight className="text-4xl" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* This div creates the scroll height for the sticky effect */}
      <div className="h-[600vh]"></div>
    </div>
  );
};

export default HomeFifthSection;

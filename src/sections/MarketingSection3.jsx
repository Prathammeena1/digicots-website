import React, { useState } from "react";
import TextAnimP1 from "../components/TextAnimP1";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function MarketingSection3() {
  const caseStudyData = [
    {
      id: 1,
      image: "/final-images/home-services/Graphic.webp",
      category: "Solutions/Services",
      title: "Creatives & Graphics",
      description:
        "Creatives Solutions  |  Motion Design  |  Illustration Design  |  Print...",
      href: "/services/2",
      position: "top-[-5%]",
    },
    {
      id: 2,
      image: "/final-images/home-services/Branding.webp",
      category: "Solutions/Services",
      title: "Branding",
      description:
        "Logo Design  |  Brand Strategy  |  Visual Identity  |  Brand Guidelines  |  Na...",
      href: "/services/4",
      position: "top-[10%]",
    },
    {
      id: 3,
      image: "/final-images/home-services/WebnDigital.webp",
      category: "Solutions/Services",
      title: "Web & Digital",
      description:
        "Website Design | Website Development | UI/UX Design | Ecommerce Sol...",
      href: "/services/5",
      position: "top-[30%]",
    },
    {
      id: 4,
      image: "/final-images/home-services/DIgitalM.webp",
      category: "Solutions/Services",
      title: "Digital Marketing",
      description:
        "Logo Design | Brand Identity | Marketing Materials | Brand Strategy...",
      href: "/services/6",
      position: "top-[45%]",
    },
    {
      id: 5,
      image: "/final-images/home-services/Content.webp",
      category: "Solutions/Services",
      title: "Content Generation",
      description:
        "3D Modelling  |  Content Strategy  |  Copywriting  |  Photography   |  Anim...",
      href: "/services/1",
      position: "top-[62%]",
    },
    {
      id: 6,
      image: "/final-images/home-services/Production.webp",
      category: "Solutions/Services",
      title: "Production (Pre-Post)",
      description:
        "Creative Direction & Storyboarding  |  Scriptwriting & Copywriting  |  Cam...",
      href: "/services/3",
      position: "top-[78%]",
    },
  ];

  return (
    <div className="min-h-screen dark:text-white py-2  bg-white">

        <h2 className="text-5xl relative z-10 px-30">
            It's so challenging to find a  <br /> <span className="font-semibold">good team to do</span>  great things.
        </h2>
     
      <div className=" mx-auto relative z-30 ">
        {/* Left Side - Content */}
        <div className=" w-full home-services-effect relative z-30">
          {caseStudyData.map((section, index) => (
            <React.Fragment key={section.id}>
              <TextAnimP1>
                <Link
                  to={section.href}
                  className="relative z-30 grid grid-cols-[1.5fr_1.5fr_3fr] items-center gap-8 cursor-pointer transition-all duration-300 dark:hover:bg-zinc-700/30 hover:bg-[#8e44ad]/7 p-6 py-12 rounded-lg"
                  onMouseEnter={(e) => {
                    const { clientX, clientY } = e;
                    const { left, top, width } =
                      e.currentTarget.getBoundingClientRect();
                    const img = e.currentTarget.querySelector(".img");
                    e.currentTarget._prevMouseX = clientX;
                    const mouseX = clientX - left;
                    const mouseY = clientY - top;
                    if (img) {
                      gsap.to(img, {
                        duration: 0.3,
                        left: mouseX - img.offsetWidth / 2,
                        top: mouseY - img.offsetHeight / 2,
                        scale: 1.4,
                        opacity: 1,
                        rotate: 0,
                        ease: "power3.out",
                        position: "absolute",
                      });
                    }
                  }}
                  onMouseMove={(e) => {
                    const { clientX, clientY } = e;
                    const { left, top, width } =
                      e.currentTarget.getBoundingClientRect();
                    const img = e.currentTarget.querySelector(".img");
                    // Store previous mouse position on the element
                    if (!e.currentTarget._prevMouseX) {
                      e.currentTarget._prevMouseX = clientX;
                    }
                    const mouseX = clientX - left;
                    const mouseY = clientY - top;
                    // Calculate movement intensity (speed)
                    const deltaX = clientX - e.currentTarget._prevMouseX;
                    e.currentTarget._prevMouseX = clientX;
                    // Clamp intensity between min and max
                    const minDeg = 0;
                    const maxDeg = 7;
                    let intensity = Math.abs(deltaX);
                    // Normalize intensity (tweak divisor for sensitivity)
                    let rotate =
                      minDeg + Math.min(intensity, 1) * (maxDeg - minDeg);
                    // Direction: left or right
                    if (deltaX < 0) rotate = -rotate;
                    if (img) {
                      gsap.to(img, {
                        duration: 0.3,
                        left: mouseX - img.offsetWidth / 2,
                        top: mouseY - img.offsetHeight / 2,
                        scale: 1.4,
                        opacity: 1,
                        rotate: rotate,
                        ease: "power3.out",
                        position: "absolute",
                      });
                    }
                  }}
                  onMouseLeave={() => {
                    const container = document.querySelector(
                      ".home-services-effect"
                    );
                    if (container) {
                      const imgs = container.querySelectorAll(".img");
                      imgs.forEach((img) => {
                        gsap.to(img, {
                          duration: 0.3,
                          opacity: 0,
                          scale: 1,
                          ease: "power3.out",
                        });
                      });
                    }
                  }}
                >
                  <div className="img absolute h-60 w-90 opacity-0 overflow-hidden pointer-events-none z-30">
                    <img
                      src={section.image}
                      className="h-full w-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className=" pl-30 text-8xl font-bold text-gray-600 leading-none">
                    {section.id}.
                  </div>
                    <h2 className="text-2xl font-semibold mb-3">
                      {section.title}
                    </h2>
                    <p className="dark:text-gray-300 text-lg leading-relaxed">
                      {section.description}
                    </p>
                </Link>
              </TextAnimP1>

              {/* Add border after each section except the last one */}
              {index < caseStudyData.length - 1 && (
                <div className="border-t border-gray-700/15"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

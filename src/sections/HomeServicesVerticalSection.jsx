import React, { useState } from "react";
import TextAnimP1 from "../components/TextAnimP1";
import TextAnimH1 from "../components/TextAnimH1";
import { Link } from "react-router-dom";
import gsap from "gsap";
import TextAnimation from "../components/TextAnimation";

export default function HomeServicesVerticalSection() {
  const caseStudyData = [
    {
      id: 1,
      image: "/final-images/home-services/Graphic.webp",
      category: "/Services",
      title: "Graphics",
      description:
        "Creatives Solutions  |  Motion Design  |  Illustration Design  |  Print...",
      href: "/services/2",
      position: "top-[-5%]",
    },
    {
      id: 2,
      image: "/final-images/home-services/Branding.webp",
      category: "/Services",
      title: "Branding",
      description:
        "Logo Design  |  Brand Strategy  |  Visual Identity  |  Brand Guidelines  |  Na...",
      href: "/services/4",
      position: "top-[10%]",
    },
    {
      id: 3,
      image: "/final-images/home-services/WebnDigital.webp",
      category: "/Services",
      title: "Web Design",
      description:
        "Website Design | Website Development | UI/UX Design | Ecommerce Sol...",
      href: "/services/5",
      position: "top-[30%]",
    },
    {
      id: 4,
      image: "/final-images/home-services/WebnDigital.webp",
      category: "/Services",
      title: "Digital",
      description:
        "Website Design | Website Development | UI/UX Design | Ecommerce Sol...",
      href: "/services/5",
      position: "top-[30%]",
    },
    {
      id: 5,
      image: "/final-images/home-services/DIgitalM.webp",
      category: "/Services",
      title: "Marketing",
      description:
        "Logo Design | Brand Identity | Marketing Materials | Brand Strategy...",
      href: "/services/6",
      position: "top-[45%]",
    },
    {
      id: 6,
      image: "/final-images/home-services/Content.webp",
      category: "/Services",
      title: "Content",
      description:
        "3D Modelling  |  Content Strategy  |  Copywriting  |  Photography   |  Anim...",
      href: "/services/1",
      position: "top-[62%]",
    },
    {
      id: 7,
      image: "/final-images/home-services/Content.webp",
      category: "/Services",
      title: "Studio",
      description:
        "3D Modelling  |  Content Strategy  |  Copywriting  |  Photography   |  Anim...",
      href: "/services/1",
      position: "top-[62%]",
    },
    {
      id: 8,
      image: "/final-images/home-services/Production.webp",
      category: "/Services",
      title: "Production",
      description:
        "Creative Direction & Storyboarding  |  Scriptwriting & Copywriting  |  Cam...",
      href: "/services/3",
      position: "top-[78%]",
    },
  ];

  const [lineX, setLineX] = useState(0);

  return (
    <div className="h-screen text-white pt-50 overflow-hidden ">
      <div className=" mx-auto relative z-30 px-30 ">
        {/* Left Side - Content */}
        <div
          onMouseMove={(e) => {
            const container = e.currentTarget;
            const { left, width } = container.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const percent = Math.max(0, Math.min(100, (mouseX / width) * 100));
            setLineX(percent);
          }}
          className=" w-full home-services-effect relative z-30 flex h-[80vh] "
        >
          {caseStudyData.map((section, index) => (
            <React.Fragment key={section.id}>
              {/* <TextAnimP1> */}
              <Link
                to={section.href}
                className="w-1/8 h-full flex relative group"
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
                <div className="img absolute h-48 w-38 opacity-0 overflow-hidden pointer-events-none z-30">
                  <img
                    src={section.image}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>

                <div className=" ml-55 flex-1 rotate-[-90deg] w-full ">
                  <h2
                    style={{
                      //   writingMode: "vertical-lr",
                      //   textOrientation: "mixed",
                      WebkitTextStroke: "1px #71717b",
                      //   letterSpacing: "1px",
                      //   fontFamily: "Gilroy-Bold, sans-serif",
                      //   textAlign: "center",
                    }}
                    className="text-[85px] text-white font-semibold  w-[50vw] group-hover:text-transparent transition-colors duration-300 flex gap-6 items-center"
                  >
                    {section.title}
                    <div
                      style={{
                        WebkitTextStroke: "0px white",
                      }}
                      className=" text-2xl font-bold text-zinc-500 leading-none"
                    >
                      <span className="group-hover:opacity-0 group-hover:-translate-x-8 inline-block duration-300">
                        {section.id}.
                      </span>

                      <span className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-8 inline-block duration-300">
                        {section.category}
                      </span>
                    </div>
                  </h2>
                  {/* <p className="dark:text-gray-300 text-lg leading-relaxed">
                      {section.description}
                    </p> */}
                </div>
              </Link>
              {/* </TextAnimP1> */}

              {/* Add border after each section except the last one */}
              {/* {index < caseStudyData.length - 1 && (
                <div className="border-t border-gray-700/15"></div>
              )} */}
            </React.Fragment>
          ))}

          <div className="h-[0.5px] w-[100%] bg-zinc-200/30 absolute bottom-43 overflow-hidden">
            <div
              className="w-1/12 h-full bg-white absolute"
              style={{
                left: `${lineX}%`,
                // transition: "left 0.2s cubic-bezier(.4,0,.2,1)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

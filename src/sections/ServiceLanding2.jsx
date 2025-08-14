import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: "1",
    title: "Content Creation",
    src: "/final-images/services/Content.webp",
    width: "25vw",
    tags: ["web", "digital", "branding", "marketing", "graphics"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "2",
    title: "Creative & Graphics",
    src: "/final-images/services/Graphic.webp",
    width: "15vw",
    tags: ["branding", "identity", "logo", "design"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "3",
    title: "Production (Pre-Post)",
    src: "/final-images/services/Production.webp",
    width: "0vw",
    tags: ["marketing", "digital", "social", "strategy"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "4",
    title: "Branding",
    src: "/final-images/services/Branding.webp",
    width: "0vw",
    tags: ["content", "writing", "copywriting", "strategy"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "5",
    title: "Web & Digital",
    src: "/final-images/services/Web.webp",
    width: "0vw",
    tags: ["production", "video", "photography", "editing"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "6",
    title: "Digital Marketing",
    src: "/final-images/services/Digital.webp",
    width: "0vw",
    tags: ["graphics", "creative", "design", "illustration"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
];

gsap.registerPlugin(ScrollTrigger);
const ServiceLanding2 = () => {
  const parentRef = React.useRef(null);

  useGSAP(() => {
    if (!parentRef.current) return;

    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top top",
        end: "top -100%",
        scrub: true,
      },
    });

    tl1
      .to(
        ".service0",
        {
          width: 0,
          opacity: 0,
        },
        "a"
      )
      .to(
        ".service1",
        {
          width: "60vw",
        },
        "a"
      )
      .to(
        ".service1 .service-content",
        {
          opacity: 1,
        },
        "a"
      )
      .to(
        ".service2",
        {
          width: "25vw",
        },
        "a"
      )
      .to(
        ".service3",
        {
          width: "15vw",
        },
        "a"
      );

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -100%",
        end: "top -200%",
        scrub: true,
      },
    });

    tl2
      .to(
        ".service1",
        {
          width: 0,
        },
        "b"
      )
      .to(
        ".service2",
        {
          width: "60vw",
        },
        "b"
      )
      .to(
        ".service1 .service-content",
        {
          opacity: 0,
        },
        "b"
      )
      .to(
        ".service2 .service-content",
        {
          opacity: 1,
        },
        "b"
      )
      .to(
        ".service3",
        {
          width: "25vw",
        },
        "b"
      )
      .to(
        ".service4",
        {
          width: "15vw",
        },
        "b"
      );

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -200%",
        end: "top -300%",
        scrub: true,
      },
    });

    tl3
      .to(
        ".service2",
        {
          width: 0,
        },
        "c"
      )
      .to(
        ".service3",
        {
          width: "60vw",
        },
        "c"
      )
      .to(
        ".service2 .service-content",
        {
          opacity: 0,
        },
        "c"
      )
      .to(
        ".service3 .service-content",
        {
          opacity: 1,
        },
        "c"
      )
      .to(
        ".service4",
        {
          width: "25vw",
        },
        "c"
      )
      .to(
        ".service5",
        {
          width: "15vw",
        },
        "c"
      );
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -300%",
        end: "top -400%",
        scrub: true,
      },
    });

    tl4
      .to(
        ".service3",
        {
          width: 0,
        },
        "d"
      )
      .to(
        ".service4",
        {
          width: "60vw",
        },
        "d"
      )
      .to(
        ".service3 .service-content",
        {
          opacity: 0,
        },
        "d"
      )
      .to(
        ".service4 .service-content",
        {
          opacity: 1,
        },
        "d"
      )
      .to(
        ".service5",
        {
          width: "25vw",
        },
        "d"
      )
      .to(
        ".service6",
        {
          width: "15vw",
        },
        "d"
      );
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -400%",
        end: "top -500%",
        scrub: true,
      },
    });

    tl5
      .to(
        ".service4",
        {
          width: 0,
        },
        "e"
      )
      .to(
        ".service5",
        {
          width: "60vw",
        },
        "e"
      )
      .to(
        ".service4 .service-content",
        {
          opacity: 0,
        },
        "e"
      )
      .to(
        ".service5 .service-content",
        {
          opacity: 1,
        },
        "e"
      )
      .to(
        ".service6",
        {
          width: "40vw",
        },
        "e"
      );
    const tl6 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -500%",
        end: "top -600%",
        scrub: true,
      },
    });

    tl6
      .to(
        ".service5",
        {
          width: 0,
        },
        "f"
      )
      .to(
        ".service6",
        {
          width: "60vw",
        },
        "f"
      )
      .to(
        ".service5 .service-content",
        {
          opacity: 0,
        },
        "f"
      )
      .to(
        ".service6 .service-content",
        {
          opacity: 1,
        },
        "f"
      )
      .to(
        ".content-parent",
        {
          width: "100vw",
        },
        "f"
      );
    const tl7 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -600%",
        end: "top -700%",
        scrub: true,
      },
    });

    tl7
      .to(
        ".service6",
        {
          height: 0,
          width: "30vw",
        },
        "g"
      )
      .to(
        ".service6 .service-content",
        {
          opacity: 0,
        },
        "g"
      )
      .to(
        ".content-imgs",
        {
          transform: "translateY(0%)",
          width: "30vw",
        },
        "g"
      )
      .to(
        ".content",
        {
          width: "72vw",
        },
        "g"
      )
      // .to(".content .service-content-description",{
      //   // width:"22vw"
      // }, "i")
    const tl8 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -700%",
        end: "top -800%",
        scrub: true,
      },
    });

    tl8.to(
      ".content-imgs",
      {
        transform: "translateY(-50%)",
      },
      "h"
    );
    const tl9 = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top -800%",
        end: "top -900%",
        scrub: true,
      },
    });

    tl9
      .to(
        ".content-imgs",
        {
          //   transform: "translateY(-50%)",
          width: "0vw",
        },
        "i"
      )
      .to(
        ".content",
        {
          width: "100vw",
        },
        "i"
      )
      .to(".content .service-content-description",{
        width:"40vw"
      }, "i")
  }, [servicesData]);

  return (
    <div ref={parentRef} className="h-[1000vh] w-full relative">
      <div className="h-screen sticky top-0 w-full flex">
        <div
          className="service0 heroHeading flex flex-col justify-center items-center"
          style={{
            width: "60vw",
          }}
        >
          <div className="pl-30 pr-4 ">
            {/* Main Services Title */}
            <div className="mb-16">
              <h1 className="text-white text-7xl md:text-8xl lg:text-9xl font-bold tracking-wide mb-8">
                Services
              </h1>

              {/* Description Text */}
              <p className="text-zinc-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-[1.4]">
                The force della knowledge, the impact della creativity, the
                pervasiveness della technology. With the consulting of marketing
                and communication of Quamm, the value del your business grows in
                the tempo.
              </p>
            </div>

            {/* Service Categories */}
            <div className="w-full max-w-6xl">
              {/* Horizontal line */}
              <div className="w-full h-px bg-zinc-600 mb-12"></div>

              {/* Categories Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "2rem",
                }}
                className="md:grid-cols-4 md:gap-16"
              >
                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "rgb(161, 161, 170)",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    className="md:text-xl"
                  >
                    Development
                  </h3>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "rgb(161, 161, 170)",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    className="md:text-xl"
                  >
                    Design
                  </h3>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "rgb(161, 161, 170)",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    className="md:text-xl"
                  >
                    Graphics
                  </h3>
                </div>

                <div style={{ textAlign: "center" }}>
                  <h3
                    style={{
                      color: "rgb(161, 161, 170)",
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                    className="md:text-xl"
                  >
                    Content
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {servicesData.map((s, i) => {
          return (
            <>
              <div
                className={`service${
                  i + 1
                } relative h-screen  bg-amber-200 z-30 overflow-hidden`}
                style={{
                  width: s.width,
                  backgroundImage: `url('${s.src}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="service-content absolute z-30 bottom-0 bg-gradient-to-t from-black to-transparent w-full pt-[22vh] opacity-0">
                  <div className="tags flex w-full justify-between items-center px-14">
                    {s.tags.map((t, i) => (
                      <div className="text-white text-md font-medium px-4 py-2 border border-zinc-300 rounded-full bg-black/[.1]">
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="title">
                    <h2 className="text-white text-3xl font-bold mt-8 text-center">
                      {s.title}
                    </h2>
                  </div>

                  <div className="text-white w-full px-14  py-5 flex items-center justify-between">
                    <div className="page-no">{i + 1}</div>
                    <Link
                      to={`/services/${s.id}`}
                      className="arrow text-2xl pointer-events-auto"
                    >
                      <HiArrowLongRight />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        })}

        
        <div
          className=" content-parent absolute right-0 top-0 h-screen bg-gradient-to-b from-transparent to-black/50 z-10 flex"
          style={{
            width: "0vw",
          }}
        >
          <div
            className="content-imgs h-[200vh] bg-gradient-to-bl from-red-300 to-blue-400"
            style={{
              width: "60vw",
              transform: "translateY(50%)",
            }}
          >
            <div className="img1 h-1/4 w-full">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/736x/ba/a8/0f/baa80f4857fcf026e6ef65b2940e3f2a.jpg"
                alt=""
              />
            </div>
            <div className="img1 h-1/4 w-full">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/736x/13/89/a0/1389a0ad5465655cceb439d7d3cf9fe4.jpg"
                alt=""
              />
            </div>
            <div className="img1 h-1/4 w-full">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/1200x/eb/2f/5c/eb2f5c5fd560d6d1fe12d814805a4a5d.jpg"
                alt=""
              />
            </div>
            <div className="img1 h-1/4 w-full">
              <img
                className="h-full w-full object-cover"
                src="https://i.pinimg.com/736x/1f/e0/91/1fe09123592b1b02cfb531f375df022b.jpg"
                alt=""
              />
            </div>
          </div>

          <div
            className="content h-screen bg-gradient-to-bl "
            style={{
              width: "40vw",
              height: "100vh",
              position: "absolute",
              top: 0,
              right: "0vw",
              display: "flex",
              flexDirection: "column",
              justifyContent:"center",
              // paddingLeft: "3rem",
              // paddingRight: "3rem",
              paddingTop: "4.5rem",
            }}
          >
            {/* Services Title */}
            <div className="px-30">
              <h1 className="text-white text-6xl md:text-7xl font-bold tracking-wide">
                Services
              </h1>

              {/* Service List */}
              <div className="w-[80vw] mx-20">
                <div className="grid grid-cols-1 gap-4 pt-10">
                  {servicesData.map((service, index) => (
                    <div
                      // ref={(el) => (servicesGridRef.current[index] = el)}
                      key={index}
                      className="grid grid-cols-[8vw_2fr_3.5fr] gap-0 items-center border-b border-gray-600 pb-4"
                    >
                      <span className="text-gray-400 text-xl font-medium">
                        {service.id}
                      </span>
                      <span className="text-white text-xl md:text-2xl font-medium">
                        {service.title}
                      </span>
                      <span
                        // ref={(el) => (contentDesRef.current[index] = el)}
                        className="service-content-description text-white text-sm font-medium leading-[1.2] w-[25vw] pl-4"
                      >
                        {service.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="mt-6 px-30">
              <p className="text-gray-300 text-lg leading-[1.5]">
                The force della knowledge, the impact della creativity, the
                pervasiveness della technology. With the consulting of marketing
                and communication of Quamm, the value del your business grows in
                the tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLanding2;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

// Services data array
const servicesData = [
  {
    id: "01",
    title: "Web & Digital",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "02",
    title: "Branding",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "03",
    title: "Digital Marketing",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "04",
    title: "Content Generation",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "05",
    title: "Production (Pre-Post)",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
  {
    id: "06",
    title: "Creative & Graphics",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
  },
];

// Service images configuration array
const serviceImagesConfig = [
  {
    src: "/images/service1.png",
    width: "25vw",
    hasBackground: false,
    containerWidth: "w-full"
  },
  {
    src: "/images/service2.png",
    width: "15vw",
    hasBackground: false,
    containerWidth: ""
  },
  {
    src: "/images/service3.png",
    width: "10vw",
    hasBackground: true,
    containerWidth: ""
  },
  {
    src: "/images/service4.png",
    width: "10vw",
    hasBackground: true,
    containerWidth: ""
  },
  {
    src: "/images/service5.png",
    width: "5vw",
    hasBackground: true,
    containerWidth: ""
  },
  {
    src: "/images/service6.png",
    width: "5vw",
    hasBackground: true,
    containerWidth: "w-full"
  }
];

const ServiceLanding = () => {
  const parentRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const servicesRef = useRef([]);
  const contentRef = useRef(null);
  const contentDesRef = useRef([]);
  const servicesGridRef = useRef([]);
  const serviceListRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parentRef.current,
        start: "top 0%",
        end: "top -900%",
        scrub: true,
      },
    });

    tl.to(
      parentRef.current,
      {
        x: "-50vw",
      },
      "a"
    )
      .to(
        servicesRef.current[0],
        {
          width: "50vw",
        },
        "a"
      )
      .to(
        servicesRef.current[1],
        {
          width: "30vw",
        },
        "a"
      )
      .to(
        servicesRef.current[2],
        {
          width: "20vw",
        },
        "a"
      )

      .to(
        servicesRef.current[0],
        {
          width: "0vw",
        },
        "b"
      )
      .to(
        servicesRef.current[1],
        {
          width: "50vw",
        },
        "b"
      )
      .to(
        servicesRef.current[2],
        {
          width: "30vw",
        },
        "b"
      )
      .to(
        servicesRef.current[3],
        {
          width: "20vw",
        },
        "b"
      )
      .to(
        servicesRef.current[4],
        {
          width: "15vw",
        },
        "b"
      )

      .to(
        servicesRef.current[1],
        {
          width: "0vw",
        },
        "c"
      )
      .to(
        servicesRef.current[2],
        {
          width: "60vw",
        },
        "c"
      )
      .to(
        servicesRef.current[3],
        {
          width: "30vw",
        },
        "c"
      )
      .to(
        servicesRef.current[4],
        {
          width: "20vw",
        },
        "c"
      )
      .to(
        servicesRef.current[5],
        {
          width: "15vw",
        },
        "c"
      )

      .to(
        servicesRef.current[2],
        {
          width: "0vw",
        },
        "d"
      )
      .to(
        servicesRef.current[3],
        {
          width: "60vw",
        },
        "d"
      )
      .to(
        servicesRef.current[4],
        {
          width: "30vw",
        },
        "d"
      )
      .to(
        servicesRef.current[5],
        {
          width: "20vw",
        },
        "d"
      )

      .to(
        servicesRef.current[3],
        {
          width: "0vw",
        },
        "e"
      )
      .to(
        servicesRef.current[4],
        {
          width: "60vw",
        },
        "e"
      )
      .to(
        servicesRef.current[5],
        {
          width: "40vw",
        },
        "e"
      )

      .to(
        contentRef.current,
        {
          right: 0,
        },
        "f"
      )

      .to(
        servicesRef.current[4],
        {
          width: "0vw",
        },
        "f"
      )
      .to(
        servicesRef.current[5],
        {
          width: "60vw",
        },
        "f"
      )

      .to(
        contentRef.current,
        {
          width: "70vw",
        },
        "g"
      )
      .to(
        serviceListRef.current,
        {
          width: "65vw",
        },
        "g"
      )
      .to(
        servicesRef.current[5],
        {
          height: "0",
          width: "30vw",
        },
        "g"
      )
      .to(
        section3Ref.current,
        {
          top: "0%",
          width: "30vw",
        },
        "g"
      )
      .to(
        section3Ref.current,
        {
          top: "-100%",
        },
        "h"
      )
      .to(
        section3Ref.current,
        {
          left: "20vw",
        },
        "i"
      )
      .to(
        contentRef.current,
        {
          width: "100vw",
        },
        "i"
      )
      .to(
        serviceListRef.current,
        {
          width: "85vw",
        },
        "i"
      )
      .fromTo(
        servicesGridRef.current,
        {
          gridTemplateColumns: "100px 1fr 2fr",
        },
        {
          gridTemplateColumns: "300px 2fr 4fr",
        },
        "i"
      )
      .fromTo(
        contentDesRef.current,
        {
          width: "35vw",
        },
        {
          width: "45vw",
        },
        "i"
      );
  }, [
    section1Ref.current,
    section2Ref.current,
    servicesRef.current,
    section3Ref.current,
    contentRef.current,
    contentDesRef.current,
    servicesGridRef.current,
    parentRef.current,
  ]);

  return (
    <div className="h-[1000vh] w-full bg-transparent relative z-10 pointer-events-none">
      <div
        ref={parentRef}
        className="sticky top-0 h-screen w-[150vw]  text-white flex items-center justify-between"
      >
        <div
          ref={section1Ref}
          className="section-1 h-screen w-[50vw] flex flex-col justify-center items-center pl-8 pr-4 md:pl-16 lg:pl-24"
        >
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
              <div className="text-center">
                <h3 className="text-zinc-400 text-lg md:text-xl font-medium tracking-wider uppercase">
                  Development
                </h3>
              </div>

              <div className="text-center">
                <h3 className="text-zinc-400 text-lg md:text-xl font-medium tracking-wider uppercase">
                  Design
                </h3>
              </div>

              <div className="text-center">
                <h3 className="text-zinc-400 text-lg md:text-xl font-medium tracking-wider uppercase">
                  Graphics
                </h3>
              </div>

              <div className="text-center">
                <h3 className="text-zinc-400 text-lg md:text-xl font-medium tracking-wider uppercase">
                  Content
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={section2Ref}
          className="section-2 h-screen w-[100vw] flex  relative "
        >
          {serviceImagesConfig.map((imageConfig, index) => (
            <div
              key={index}
              ref={(el) => (servicesRef.current[index] = el)}
              className={`flex items-center justify-center h-full w-[${imageConfig.width}] ${imageConfig.hasBackground ? 'bg-zinc-900' : ''}`}
            >
              <div className={`h-[100%] ${imageConfig.containerWidth}`}>
                <img
                  src={imageConfig.src}
                  className="object-cover h-full w-full"
                  alt=""
                />
                
              </div>
            </div>
          ))}
          <div
            ref={contentRef}
            className="content h-[100vh] w-[40vw] absolute top-0 right-[-40vw] flex flex-col  px-12 pt-18 "
          >
            {/* Services Title */}
            <div className="">
              <h1 className="text-white text-6xl md:text-7xl font-bold tracking-wide">
                Services
              </h1>

              {/* Service List */}
              <div ref={serviceListRef} className="w-[80vw] mx-20">
                <div className="grid grid-cols-1 gap-4 pt-10">
                  {servicesData.map((service, index) => (
                    <div
                      ref={(el) => (servicesGridRef.current[index] = el)}
                      key={index}
                      className="grid grid-cols-[100px_1fr_2fr] gap-0 items-center border-b border-gray-600 pb-4"
                    >
                      <span className="text-gray-400 text-xl font-medium">
                        {service.id}
                      </span>
                      <span className="text-white text-xl md:text-2xl font-medium">
                        {service.title}
                      </span>
                      <span
                        ref={(el) => (contentDesRef.current[index] = el)}
                        className="text-white text-sm font-medium leading-[1.2] w-[35vw] pl-4"
                      >
                        {service.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Text */}
            <div className="mt-6">
              <p className="text-gray-300 text-lg leading-[1.5]">
                The force della knowledge, the impact della creativity, the
                pervasiveness della technology. With the consulting of marketing
                and communication of Quamm, the value del your business grows in
                the tempo.
              </p>
            </div>
          </div>
        </div>

        <div
          ref={section3Ref}
          className="section-3 absolute top-full left-[50vw] h-full w-[60vw]  flex flex-col"
        >
          <div className="img1 h-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/736x/ba/a8/0f/baa80f4857fcf026e6ef65b2940e3f2a.jpg"
              alt=""
            />
          </div>
          <div className="img1 h-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/736x/13/89/a0/1389a0ad5465655cceb439d7d3cf9fe4.jpg"
              alt=""
            />
          </div>
          <div className="img1 h-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/1200x/eb/2f/5c/eb2f5c5fd560d6d1fe12d814805a4a5d.jpg"
              alt=""
            />
          </div>
          <div className="img1 h-1/2 w-full">
            <img
              className="h-full w-full object-cover"
              src="https://i.pinimg.com/736x/1f/e0/91/1fe09123592b1b02cfb531f375df022b.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceLanding;
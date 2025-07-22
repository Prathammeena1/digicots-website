import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import { useLogo } from "../context/LogoContext";

const HomeHeroSection = () => {
  const sec1 = useRef();
  const sec2 = useRef();
  const homeRef = useRef();
  const heroTextRef = useRef();
  const logoSvgRef = useRef();
  const mainSvgLogoRef = useRef();

  // Get logo context
  const { navigationLogoRef } = useLogo();

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    // Main timeline with optimized scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: "top 0",
        end: "top -300%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
        // markers: true, // Remove in production
      },
    });

    // Set initial states
    gsap.set([sec1.current, sec2.current], { y: "100%" });
    gsap.set(heroTextRef.current, { opacity: 1 });

    // Animation sequence
    tl
      .to(
        sec1.current,
        {
          y: "0%",
          duration: 1.5,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        sec1.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        1.5
      )
      .to(
        sec2.current,
        {
          y: "0%",
          duration: 1.5,
          ease: "power3.out",
        },
        1.7
      )
      .to(
        logoSvgRef.current,
        {
          scale: 1,
          ease: "linear",
          duration: 5,
        },
        "+=0.3"
      )
      .to(
        logoSvgRef.current,
        {
          opacity: 0,
          ease: "power3.out",
          duration: 0.7,
        },
        "+=0.3"
      )
      .to(
        mainSvgLogoRef.current,
        {
          opacity: 1,
          ease: "power3.out",
          duration: 0.7,
        },
        "<"
      )
      .to(mainSvgLogoRef.current, {
        top: "5.5%",
        duration: 1.2,
        ease: "power2.inOut",
      })
      .to(
        mainSvgLogoRef.current,
        {
          opacity: 0,
          duration: 0.4,
        },
        "+=0.2"
      )
      .to(
        navigationLogoRef.current,
        {
          opacity: 1,
          ease: "power3.out",
          duration: 0.5,
        },
        "<"
      );
  }, [
    sec1.current,
    sec2.current,
    homeRef.current,
    heroTextRef.current,
    logoSvgRef.current,
    mainSvgLogoRef.current,
    navigationLogoRef.current,
  ]);

  return (
    <>
      <img
        ref={mainSvgLogoRef}
        src="/images/logo-1.svg"
        alt="Logo"
        className="fixed left-[51%] top-1/2 -translate-1/2 w-30 h-auto z-[99999] pointer-events-none select-none opacity-0"
      />
      <div className="h-[300vh] w-full relative">
        <div ref={homeRef} className="h-screen w-full relative overflow-hidden">
          <div className="hero-page-section-1 h-full w-full">
            {/* Gradient Background */}
            <div className="absolute h-screen w-full">
              <video
                src="/videos/showreel.mp4"
                className="object-cover w-full h-full brightness-[.9]"
                autoPlay
                loop
                muted
              />
            </div>
            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div
            ref={sec1}
            className="h-screen w-full absolute top-0 left-0 right-0 z-20"
          >
            {/* SVG Text Mask Implementation */}
            <div className="relative w-full h-full">
              {/* SVG Text Mask */}
              <svg
                className="absolute top-0 left-0 pointer-events-none h-screen w-screen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <mask id="text-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="180"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="-0.005em"
                    >
                      BRIEF
                    </text>
                    <text
                      x="960"
                      y="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="180"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="-0.005em"
                    >
                      TO DELIVERY
                    </text>
                  </mask>
                </defs>

                {/* White background with text cut out */}
                <rect
                  width="100%"
                  height="100%"
                  fill="white"
                  mask="url(#text-mask)"
                />
              </svg>
            </div>
          </div>
          <div
            ref={sec2}
            className="h-screen w-full absolute top-0 left-0 right-0 z-30"
          >
            {/* SVG Text Mask Implementation */}
            <div className="relative w-full h-full">
              {/* SVG Text Mask */}
              <svg
                className="absolute top-0 left-0 pointer-events-none h-screen w-screen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <mask id="text-mask-2">
                    <rect width="100%" height="100%" fill="white" />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="180"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="-0.005em"
                    >
                      THOUGHTS TO
                    </text>
                    <text
                      x="960"
                      y="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="180"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="-0.005em"
                    >
                      REALITY
                    </text>
                  </mask>
                </defs>

                {/* White background with text cut out */}
                <rect
                  width="100%"
                  height="100%"
                  fill="black"
                  mask="url(#text-mask-2)"
                />
              </svg>
            </div>
          </div>

          <svg
            ref={logoSvgRef}
            className="absolute top-0 left-0 pointer-events-none h-screen w-screen z-[40] scale-[250]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="logo-mask" maskUnits="userSpaceOnUse">
                <rect width="100%" height="100%" fill="white" />

                <image
                  href="/images/logo-1.svg"
                  x="42.5%"
                  y="42.5%"
                  width="15%"
                  height="15%"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ filter: "invert(1)" }}
                />
              </mask>
            </defs>

            <rect
              width="100%"
              height="100%"
              fill="white"
              mask="url(#logo-mask)"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HomeHeroSection;

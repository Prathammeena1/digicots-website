import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useState, useEffect } from "react";
import { useLogo } from "../context/LogoContext.jsx";

const HomeHeroSection = () => {
  const sec1 = useRef();
  const sec2 = useRef();
  const sec3 = useRef();
  const homeRef = useRef();
  const heroTextRef = useRef();
  const logoSvgRef = useRef();
  const mainSvgLogoRef = useRef();
  const videoRef = useRef();
  const [videoMuted, setVideoMuted] = useState(true);

  // Get logo context
  const { navigationLogoRef } = useLogo();

  // Video health monitoring and auto-recovery
  useEffect(() => {
    let healthCheckInterval;
    
    const checkVideoHealth = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        
        // Check if video should be playing but is paused
        if (video.paused && !video.ended && video.readyState >= 2) {
          console.log("Video health check: resuming paused video");
          video.play().catch(err => {
            console.log("Health check resume failed:", err);
          });
        }
        
        // Check for network stalls
        if (video.networkState === video.NETWORK_LOADING && video.readyState < 3) {
          const currentTime = video.currentTime;
          if (currentTime > 0 && currentTime === video.currentTime) {
            console.log("Video health check: detected stall, reloading");
            video.load();
            video.currentTime = currentTime;
            video.play().catch(err => {
              console.log("Health check reload failed:", err);
            });
          }
        }
      }
    };

    // Start health monitoring after component mounts
    const startHealthCheck = () => {
      healthCheckInterval = setInterval(checkVideoHealth, 3000); // Check every 3 seconds
    };

    // Delay health check to allow video to load
    setTimeout(startHealthCheck, 2000);

    return () => {
      if (healthCheckInterval) {
        clearInterval(healthCheckInterval);
      }
    };
  }, []);

  // Handle video mute toggle with performance optimization and smooth playback
  const toggleVideoMute = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const newMutedState = !videoMuted;
      
      // Use requestAnimationFrame for smooth state updates
      requestAnimationFrame(() => {
        setVideoMuted(newMutedState);
        video.muted = newMutedState;
        video.volume = newMutedState ? 0 : 1;
        
        // Ensure video continues playing smoothly
        if (video.paused) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Video playing after mute toggle");
              })
              .catch(err => {
                console.log("Video play failed after mute toggle:", err);
                // If playback fails, ensure video is in correct state
                video.muted = true;
                setVideoMuted(true);
                video.play().catch(e => console.log("Fallback play failed:", e));
              });
          }
        }
      });
    }
  };

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    // Main timeline with optimized scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: "top 0",
        end: "top -300%",
        scrub: 1.2,
        anticipatePin: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
        // markers: true, // Remove in production
      },
    });

    // Set initial states
    gsap.set([sec1.current, sec2.current, sec3.current], { y: "100%" });
    gsap.set(heroTextRef.current, { opacity: 1 });

    // Animation sequence
    tl.to(
      sec1.current,
      {
        y: "0%",
        duration: 3.1,
        ease: "power3.out",
      },
      0.2
    )
      .to(
        sec1.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        3.7
      )
      .to(
        sec2.current,
        {
          y: "0%",
          duration: 3.1,
          ease: "power3.out",
        },
        4.2
      )
      .to(
        sec2.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.2"
      )
      .to(
        sec3.current,
        {
          y: "0%",
          duration: 3.1,
          ease: "power3.out",
        },
        "+=0.1"
      )
      // .to(
      //   logoSvgRef.current,
      //   {
      //     scale: 1,
      //     ease: "linear",
      //     duration: 5,
      //   },
      //   "+=0.3"
      // )
      // .to(
      //   logoSvgRef.current,
      //   {
      //     opacity: 0,
      //     ease: "power3.out",
      //     duration: 0.7,
      //   },
      //   "+=0.3"
      // )
      // .to(
      //   mainSvgLogoRef.current,
      //   {
      //     opacity: 1,
      //     ease: "power3.out",
      //     duration: 0.7,
      //   },
      //   "<"
      // )
      // .to(mainSvgLogoRef.current, {
      //   top: "5.5%",
      //   duration: 1.2,
      //   ease: "power2.inOut",
      // })
      // .to(
      //   mainSvgLogoRef.current,
      //   {
      //     opacity: 0,
      //     duration: 0.4,
      //   },
      //   "+=0.2"
      // )
      // .to(
      //   navigationLogoRef.current,
      //   {
      //     opacity: 1,
      //     ease: "power3.out",
      //     duration: 0.5,
      //   },
      //   "<"
      // );
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
      {/* Mute Toggle Button */}
      <button
        onClick={toggleVideoMute}
        className="fixed top-5 right-6 z-[100000] bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-black/40 transition-all duration-300 group"
        aria-label={videoMuted ? "Unmute video" : "Mute video"}
      >
        {videoMuted ? (
          // Muted icon
          <svg
            className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          // Unmuted icon
          <svg
            className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

      <img
        ref={mainSvgLogoRef}
        src="/images/logo-1.svg"
        alt="Logo"
        className="fixed left-[51%] top-1/2 -translate-1/2 w-30 h-auto z-[99999] pointer-events-none select-none opacity-0"
      />
      <div className="h-[400vh] w-full relative">
        <div
          ref={homeRef}
          className="h-screen w-full sticky top-0 overflow-hidden"
        >
          <div className="hero-page-section-1 top-0 h-full w-full relative">
            {/* Optimized Video Background Container */}
            <div
              className="absolute inset-0 h-screen w-full bg-black"
              style={{
                contain: "layout style paint",
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <video
                ref={videoRef}
                className="object-cover w-full h-full brightness-[.9]"
                autoPlay
                loop
                muted={videoMuted}
                playsInline
                preload="metadata"
                fetchPriority="high"
                loading="lazy"
                disablePictureInPicture
                disableRemotePlayback
                x-webkit-airplay="deny"
                style={{
                  willChange: "auto",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "translate3d(0, 0, 0)",
                  WebkitTransform: "translate3d(0, 0, 0)",
                  imageRendering: "optimizeSpeed",
                  WebkitImageRendering: "optimizeSpeed",
                }}
                // All event handlers remain the same
                onLoadedMetadata={() => {
                  if (videoRef.current) {
                    const video = videoRef.current;
                    video.playbackRate = 1;
                    video.currentTime = 0;
                    video.style.transform = "translate3d(0, 0, 0)";
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(err => {
                        console.log("Autoplay prevented:", err);
                      });
                    }
                  }
                }}
                onCanPlayThrough={() => {
                  if (videoRef.current && videoRef.current.paused) {
                    videoRef.current.play().catch(err => {
                      console.log("Play failed:", err);
                    });
                  }
                }}
                onStalled={() => {
                  console.log("Video stalled, attempting to resume");
                  if (videoRef.current) {
                    const currentTime = videoRef.current.currentTime;
                    videoRef.current.load();
                    videoRef.current.currentTime = currentTime;
                    videoRef.current.play().catch(err => {
                      console.log("Resume failed:", err);
                    });
                  }
                }}
                onWaiting={() => {
                  console.log("Video buffering...");
                }}
                onPlaying={() => {
                  console.log("Video playing smoothly");
                }}
                onPause={() => {
                  if (videoRef.current && !videoRef.current.ended) {
                    setTimeout(() => {
                      if (videoRef.current && videoRef.current.paused) {
                        videoRef.current.play().catch(err => {
                          console.log("Auto-resume failed:", err);
                        });
                      }
                    }, 100);
                  }
                }}
                onError={(e) => {
                  console.error("Video error:", e);
                  if (videoRef.current) {
                    setTimeout(() => {
                      videoRef.current.load();
                    }, 1000);
                  }
                }}
                onLoadStart={() => {
                  if (videoRef.current) {
                    videoRef.current.defaultPlaybackRate = 1;
                    videoRef.current.volume = videoMuted ? 0 : 1;
                  }
                }}
                src="/videos/showreel.webm"
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
                      stroke="black"
                      strokeWidth="10"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      BRIEF
                    </text>
                    <text
                      x="960"
                      y="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="10"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      TO BELIEF.
                    </text>
                  </mask>
                </defs>

                {/* White background with text cut out */}
                <rect
                  width="100%"
                  height="100%"
                  fill="black"
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
                    <rect width="100%" height="110%" fill="white" />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="8"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      ROUGH TO
                    </text>

                    <text
                      x="960"
                      y="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="8"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      REALITY
                    </text>
                  </mask>
                </defs>

                {/* White background with text cut out */}
                <rect
                  width="100%"
                  height="100%"
                  fill="white"
                  mask="url(#text-mask-2)"
                />
              </svg>
            </div>
          </div>
          <div
            ref={sec3}
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
                  <mask id="text-mask-3">
                    <rect width="100%" height="110%" fill="white" />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="8"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      DREAM TO
                    </text>
                    <text
                      x="960"
                      y="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="8"
                      fontSize="200"
                      fontFamily="Palette, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      DELIVERY
                    </text>
                  </mask>
                </defs>

                {/* White background with text cut out */}
                <rect
                  width="100%"
                  height="100%"
                  fill="black"
                  mask="url(#text-mask-3)"
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

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef, useState, useEffect } from "react";
import { useLogo } from "../context/LogoContext.jsx";
import ReactPlayer from "react-player";

/**
 * PRODUCTION VIDEO SETUP:
 *
 * For optimal production performance, replace VIDEO_URL with:
 *
 * 1. VIMEO PRO (Recommended):
 *    const VIDEO_URL = "https://vimeo.com/your-video-id";
 *
 * 2. CLOUDINARY:
 *    const VIDEO_URL = "https://res.cloudinary.com/your-cloud/video/upload/your-video.mp4";
 *
 * 3. AWS CLOUDFRONT:
 *    const VIDEO_URL = "https://your-cloudfront-domain.com/showreel.mp4";
 *
 * 4. YOUTUBE (Public videos):
 *    const VIDEO_URL = "https://www.youtube.com/watch?v=your-video-id";
 *
 * Current setup supports all these platforms with automatic optimization.
 */

const HomeHeroSection = ({videoMuted,videoReady,isPlaying, playerRef, setVideoMuted, setIsPlaying, setVideoReady}) => {
  const sec1 = useRef();
  const sec2 = useRef();
  const sec3 = useRef();
  const homeRef = useRef();
  const heroTextRef = useRef();
  const logoSvgRef = useRef();
  const mainSvgLogoRef = useRef();
  

  // Production video URL - Replace with your actual video URL

  // const VIDEO_URL = "https://ik.imagekit.io/x5xessyka/digicots/showreel.webm/ik-video.mp4?tr=orig"; // Change this to your cloud video URL
  const VIDEO_URL = "/videos/showreel.webm"; // Change this to your cloud video URL
  // Get logo context
  const { navigationLogoRef } = useLogo();

  // Video health monitoring and performance optimization
  useEffect(() => {
    let healthCheckInterval;

    const checkVideoHealth = () => {
      if (playerRef.current) {
        try {
          const player = playerRef.current;

          // Check if getInternalPlayer method exists
          if (typeof player.getInternalPlayer === "function") {
            const internalPlayer = player.getInternalPlayer();

            if (internalPlayer && internalPlayer.readyState >= 2) {
              // Video is ready
              if (!videoReady) {
                setVideoReady(true);
              }

              // Check if video should be playing but is paused
              if (internalPlayer.paused && !internalPlayer.ended && isPlaying) {
                console.log("Video health check: resuming paused video");
                internalPlayer.play().catch(console.error);
              }
            }
          } else {
            // Fallback: just set video as ready after a delay
            if (!videoReady) {
              setTimeout(() => setVideoReady(true), 2000);
            }
          }
        } catch (error) {
          console.log("Video health check error:", error);
          // Fallback: set video as ready
          if (!videoReady) {
            setVideoReady(true);
          }
        }
      }
    };

    // Start health monitoring
    healthCheckInterval = setInterval(checkVideoHealth, 2000);

    return () => {
      if (healthCheckInterval) {
        clearInterval(healthCheckInterval);
      }
    };
  }, [videoReady, isPlaying]);

  // Handle video mute toggle with performance optimization


  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    // Main timeline with optimized scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: homeRef.current,
        start: "top 0",
        end: "top -100%",
        scrub: 1.2,
        anticipatePin: 1,
        refreshPriority: -1,
        invalidateOnRefresh: true,
        // markers: true, // Remove in production
      },
    });

    // Set initial states
    gsap.set([sec1.current], { y: "100%" });
    gsap.set(heroTextRef.current, { opacity: 1 });

    // Animation sequence
    tl.to(
      sec1.current,
      {
        y: "0%",
        duration: 3.1,
        ease: "power3.out",
      }
      // 0.2
    );
  }, [
    sec1.current,
    homeRef.current,
    heroTextRef.current,
    logoSvgRef.current,
    mainSvgLogoRef.current,
    navigationLogoRef.current,
  ]);

  return (
    <>
      
      <div id="HomeHero" className="section h-[200vh] w-full relative">
        <div
          ref={homeRef}
          className="h-screen w-full sticky top-0 overflow-hidden"
        >
          <div className="top-0 h-full w-full relative">
            {/* Production-Level Video Background Container */}
            <div
              className="absolute inset-0 h-screen w-full dark:bg-black bg-white"
              style={{
                contain: "layout style paint",
                willChange: "transform",
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <ReactPlayer
                className="h-full w-full object-cover"
                ref={playerRef}
                url={VIDEO_URL}
                src={VIDEO_URL}
                playing={isPlaying}
                loop={true}
                muted={videoMuted}
                width="100%"
                height="100%"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                config={{
                  file: {
                    attributes: {
                      preload: "metadata",
                      "webkit-playsinline": true,
                      playsinline: true,
                      disablePictureInPicture: true,
                      disableRemotePlayback: true,
                      "x-webkit-airplay": "deny",
                      style: {
                        objectFit: "cover",
                        filter: "brightness(0.9)",
                        willChange: "auto",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translate3d(0, 0, 0)",
                        WebkitTransform: "translate3d(0, 0, 0)",
                        imageRendering: "optimizeSpeed",
                        WebkitImageRendering: "optimizeSpeed",
                      },
                    },
                    forceVideo: true,
                    forceHLS: false,
                    forceDASH: false,
                  },
                  // For Vimeo (when you switch to cloud hosting)
                  vimeo: {
                    playerOptions: {
                      background: true,
                      autoplay: true,
                      loop: true,
                      muted: videoMuted,
                      quality: "auto",
                      responsive: true,
                    },
                  },
                  // For YouTube (if needed)
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      rel: 0,
                      showinfo: 0,
                      mute: videoMuted ? 1 : 0,
                      loop: 1,
                      playlist: "", // Add video ID here for loop
                    },
                  },
                }}
              />
            </div>
            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <div
            ref={sec1}
            className="section h-screen w-full absolute top-0 left-0 right-0 z-20 bg-white/[.1] backdrop-blur"
          >
            {/* SVG Text Mask Implementation */}
            <div className="relative w-full h-full">
              <svg
                className="absolute top-0 left-0 pointer-events-none h-screen w-screen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <mask id="text-mask" maskUnits="userSpaceOnUse">
                    <rect width="100%" height="100%" fill="white" />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="260"
                      fontFamily="Arial, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      DREAM TO
                    </text>
                    <text
                      x="960"
                      y="645"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      fontSize="260"
                      fontFamily="Arial, sans-serif"
                      fontWeight="900"
                      letterSpacing="0.02em"
                    >
                      DELIVERY
                    </text>
                  </mask>
                </defs>
                {/* Black overlay with text cut out (transparent where text is) */}
                <rect
                  width="100%"
                  height="100%"
                  fill="black"
                  mask="url(#text-mask)"
                />
              </svg>
              <div className="text-zinc-200 text-center font-semibold text-3xl absolute bottom-25 w-full ">
                We are a results-driven digital agency that blends creativity,
                strategy and <br /> technology to build powerful brands and
                deliver measurable growth
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHeroSection;

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

const HomeHeroSection = () => {
  const sec1 = useRef();
  const sec2 = useRef();
  const sec3 = useRef();
  const homeRef = useRef();
  const heroTextRef = useRef();
  const logoSvgRef = useRef();
  const mainSvgLogoRef = useRef();
  const playerRef = useRef();
  const [videoMuted, setVideoMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

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
  const toggleVideoMute = () => {
    const newMutedState = !videoMuted;

    // Use requestAnimationFrame for smooth state updates
    requestAnimationFrame(() => {
      setVideoMuted(newMutedState);

      // Ensure video continues playing smoothly
      if (playerRef.current && videoReady) {
        const player = playerRef.current;
        if (!isPlaying) {
          setIsPlaying(true);
        }
      }
    });
  };

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
      {/* Mute Toggle Button */}
      <button
        onClick={toggleVideoMute}
        className="fixed top-1 right-6 scale-[0.8] z-[100000] dark:bg-white/20 bg-white/80 backdrop-blur-sm border border-black/20 rounded-full p-3 hover:bg-white/90 transition-all duration-300 group"
        aria-label={videoMuted ? "Unmute video" : "Mute video"}
      >
        {videoMuted ? (
          // Muted icon
          <svg
            className="w-5 h-5 text-black/50 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          // Unmuted icon
          <svg
            className="w-5 h-5 text-black/50 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>

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
              {/* SVG Text Mask */}
              <svg
                className="absolute top-0 left-0 pointer-events-none h-screen w-screen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1920 1080"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <mask id="text-mask">
                    <rect
                      width="100%"
                      height="100%"
                      className="dark:fill-black fill-white"
                    />
                    <text
                      x="960"
                      y="420"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="black"
                      stroke="black"
                      strokeWidth="1"
                      fontSize="260"
                      fontFamily="Palette, sans-serif"
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
                      stroke="black"
                      strokeWidth="1"
                      fontSize="260"
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
                  // fill="black"
                  className="dark:fill-black fill-white"
                  mask="url(#text-mask)"
                />
              </svg>
              <div className="dark:text-zinc-200 text-center font-semibold text-3xl absolute bottom-25 w-full ">
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

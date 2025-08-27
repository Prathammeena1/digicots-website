import React, { useState } from "react";
import HomeHeroSection from "../sections/HomeHeroSection.jsx";
import HomeSecondSection from "../sections/HomeSecondSection.jsx";
import HomeThirdSection from "../sections/HomeThirdSection.jsx";
import HomeFourthSection from "../sections/HomeFourthSection.jsx";
import HomeFifthSection from "../sections/HomeFifthSection";
import HomeSixthSection from "../sections/HomeSixthSection.jsx";
import HomeSeventhSection from "../sections/HomeSeventhSection.jsx";
import HomeEighthSection from "../sections/HomeEighthSection.jsx";
import HomeNinthSection from "../sections/HomeNinthSection.jsx";
import HomeServiceSection from "../sections/HomeServiceSection.jsx";
import ScrollMarKi from "../components/ScrollMarKi.jsx";
import AboutStatSection from "../sections/AboutStatSection.jsx";
import HomeServicesVerticalSection from "../sections/HomeServicesVerticalSection.jsx";
import HomeContactSection from "../sections/HomeContactSection.jsx";
import HomeApproachSection from "../sections/HomeApproachSection.jsx";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const awards = [
  "/final-images/awards/1.png",
  "/final-images/awards/2.png",
  "/final-images/awards/3.png",
  "/final-images/awards/4.png",
]

const AwardsComponent = ({ awards, videoMuted, isPlaying, videoReady, playerRef, setVideoMuted, setIsPlaying, setVideoReady }) => {
  const awardRefs = useRef([]);


  useEffect(() => {
    // Create rotation animation for each award
    awardRefs.current.forEach((awardRef) => {
      if (awardRef) {
        gsap.to(awardRef, {
          rotation: 360,
          duration: 3,
          ease: "none", // Linear easing
          repeat: -1    // Infinite repeat
        });
      }
    });

    // Cleanup function to kill all animations when component unmounts
    return () => {
      awardRefs.current.forEach((awardRef) => {
        if (awardRef) {
          gsap.killTweensOf(awardRef);
        }
      });
    };
  }, [awards]);



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

  return (
    <div className="fixed bg-transparent z-[1000] top-1/2 -translate-y-1/2 left-5 ">
      {/* Mute Toggle Button */}
      <button
        onClick={toggleVideoMute}
        className="pointer-events-auto w-19 h-19 flex items-center justify-center scale-[.6] z-[100000] dark:bg-white/20 bg-white/80 backdrop-blur-sm border border-black/20 rounded-full p-3 hover:bg-white/90 transition-all duration-300 group"
        aria-label={videoMuted ? "Unmute video" : "Mute video"}
      >
        {videoMuted ? (
          // Muted icon
          <svg
            className="w-10 h-10 text-black/50 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        ) : (
          // Unmuted icon
          <svg
            className="w-10 h-10 text-black/50 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        )}
      </button>
      <div className="space-y-5">

        {awards.map((award, index) => {
          return (
            <div
              key={index}
              ref={(el) => (awardRefs.current[index] = el)}
              className="w-19 h-19 bg-white rounded-full overflow-hidden"
            >
              <img
                className="h-full w-full object-contain"
                src={award}
                alt={`Award ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};


const Home = () => {
  const [videoMuted, setVideoMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const playerRef = useRef();

  return (
    <>
      <AwardsComponent awards={awards} videoMuted={videoMuted} isPlaying={isPlaying} videoReady={videoReady} playerRef={playerRef} setVideoMuted={setVideoMuted} setIsPlaying={setIsPlaying}
          setVideoReady={setVideoReady} />
      <div className="h-full w-full bg-transparent relative">
        <div className="h-full w-full relative z-40 pointer-events-auto bg-black">
          <HomeHeroSection videoMuted={videoMuted} videoReady={videoReady} isPlaying={isPlaying} playerRef={playerRef}
          setVideoMuted={setVideoMuted}
          setIsPlaying={setIsPlaying}
          setVideoReady={setVideoReady}
           />

          <HomeFourthSection />

          {/* <div className="-space-y-22">
          <ScrollMarKi> {"          "} Strategies meeting </ScrollMarKi>
          <ScrollMarKi direction={-1}>proven results</ScrollMarKi>
          </div> */}

          {/* <HomeThirdSection /> */}

          {/* <HomeFifthSection /> */}

          {/* <div className="h-[50vh] w-full "></div> */}

          <HomeServicesVerticalSection />






          {/* <HomeServiceSection /> */}

          {/* <HomeSixthSection /> */}

          {/* <HomeSecondSection /> */}

          {/* <HomeEighthSection /> */}
          <HomeApproachSection />

          <HomeContactSection />
        </div>


        <AboutStatSection />
        <HomeSeventhSection />

        <HomeNinthSection />
      </div>


    </>
  );
};

export default Home;

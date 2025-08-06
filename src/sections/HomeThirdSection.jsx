import React from "react";
import ScrollTextMovementEffect from "../components/ScrollTextMovementEffect";
import TwistedTextEffect from "../components/TwistedTextEffect";
import TextAnimation from "../components/TextAnimation";

const HomeThirdSection = () => {
  return (
    <div className="w-full h-fit relative pointer-events-none overflow-hidden">
      {/* <ScrollTextMovementEffect /> */}
      <p className="absolute top-34 left-1/2 font-bold -translate-x-1/2 z-30 text-zinc-200 text-center text-3xl pointer-events-none ">
        <TextAnimation
          scrub={true}
          animeStart="70%"
          animeEnd="30%"
          duration="2"
          stagger={10}
        >
          We Squeeze Out the Best of Global Applied Marketing & Strategy to
          Drive Customer Loyalty
        </TextAnimation>
      </p>

      <TwistedTextEffect />
    </div>
  );
};

export default HomeThirdSection;

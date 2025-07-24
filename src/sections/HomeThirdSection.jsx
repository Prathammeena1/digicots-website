import React from "react";
import TextAnimation from "../components/TextAnimation";

const HomeThirdSection = () => {
  return (
    <div className="h-screen w-full bg-transparent pt-30">
      <TextAnimation
        scrub={true}
        animeStart="70%"
        animeEnd="30%"
        duration="2"
        stagger={10}
        className="text-zinc-200 text-center font-[600] text-2xl "
      >
        We Squeeze Out the Best of Global Applied Marketing & Strategy <br /> to
        Drive Customer Loyalty
      </TextAnimation>

      <div className="text-roll-effect w-full mt-12 relative z-50"></div>
    </div>
  );
};

export default HomeThirdSection;

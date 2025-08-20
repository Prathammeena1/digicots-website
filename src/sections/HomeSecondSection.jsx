import React from "react";
import TextAnimation from "../components/TextAnimation.jsx";

const HomeSecondSection = () => {
  return (
    <div className="h-screen w-full relative pointer-events-none pt-30">
      <TextAnimation
        scrub={true}
        animeStart="70%"
        animeEnd="30%"
        duration="2"
        stagger={10}
        className="dark:text-zinc-200 text-center font-bold text-3xl "
      >
        We are not just any other agency. <br />
        We are the ALPHA of marketing & development.
      </TextAnimation>

      <div className="absolute top-[40%] -translate-y-1/2 w-200 m-auto h-fit inset-0 flex items-center justify-center">
        <p className="dark:text-zinc-200 absolute top-[-3%] font-bold left-[27%] text-3xl ">
          WE ARE
        </p>
        <img
          src="/images/logo-black.svg"
          alt="Logo"
          className="w-full h-auto pointer-events-none select-none"
        />
        {/* <img
          src="/images/logo-1.svg"
          alt="Logo"
          className="w-full h-auto pointer-events-none select-none"
        /> */}
      </div>
    </div>
  );
};

export default HomeSecondSection;

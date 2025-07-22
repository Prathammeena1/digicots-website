import React from "react";
import HomeHeroSection from "../sections/HomeHeroSection";
import HomeSecondSection from "../sections/HomeSecondSection";

const Home = () => {
  return (
    <div className="h-screen w-full bg-transparent">
      <HomeHeroSection />
      <HomeSecondSection />
    </div>
  );
};

export default Home;

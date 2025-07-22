import React from "react";
import HomeHeroSection from "../sections/HomeHeroSection.jsx";
import HomeSecondSection from "../sections/HomeSecondSection.jsx";

const Home = () => {
  return (
    <div className="h-screen w-full bg-transparent">
      <HomeHeroSection />
      <HomeSecondSection />
    </div>
  );
};

export default Home;

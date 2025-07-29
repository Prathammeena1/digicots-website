import React from "react";
import HomeHeroSection from "../sections/HomeHeroSection.jsx";
import HomeSecondSection from "../sections/HomeSecondSection.jsx";
import HomeThirdSection from "../sections/HomeThirdSection.jsx";
import HomeFourthSection from "../sections/HomeFourthSection.jsx";
import HomeFifthSection from "../sections/HomeFifthSection";
import HomeSixthSection from "../sections/HomeSixthSection.jsx";

const Home = () => {
  return (
    <div className="h-full w-full bg-transparent">
      <HomeHeroSection />
      <HomeSecondSection />

      <HomeThirdSection />

      <HomeFourthSection />

      <HomeFifthSection/>

      <HomeSixthSection />
    </div>
  );
};

export default Home;

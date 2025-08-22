import React from "react";
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

const Home = () => {
  return (
    <div className="h-full w-full bg-transparent">
      <HomeHeroSection />

      <ScrollMarKi />
      <ScrollMarKi direction={-1} />

      <HomeFourthSection />

      {/* <HomeThirdSection /> */}


      {/* <HomeFifthSection /> */}

      <HomeServiceSection />

      <HomeSixthSection />

      <HomeSeventhSection />
      <HomeSecondSection />


      <HomeEighthSection />

      <HomeNinthSection />
    </div>
  );
};

export default Home;

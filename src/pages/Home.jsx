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
import AboutStatSection from "../sections/AboutStatSection.jsx";

const Home = () => {
  return (
    <>
      <div className="h-screen w-full fixed top-0 left-0">
        <img
          className="h-full w-full object-cover"
          src="/final-images/bg/testing.webp"
          alt=""
        />
      </div>
      <div className="h-full w-full bg-transparent relative">
        <HomeHeroSection />
        <AboutStatSection />

        <HomeFourthSection />

        <div className="-space-y-22">
          <ScrollMarKi> {"          "} Strategies meeting </ScrollMarKi>
          <ScrollMarKi direction={-1}>proven results</ScrollMarKi>
        </div>

        {/* <HomeThirdSection /> */}

        {/* <HomeFifthSection /> */}

        <div className="h-[50vh] w-full "></div>

        <HomeServiceSection />

        <HomeSixthSection />

        {/* <HomeSecondSection /> */}

        <HomeEighthSection />
        <HomeSeventhSection />

        <HomeNinthSection />
      </div>
    </>
  );
};

export default Home;

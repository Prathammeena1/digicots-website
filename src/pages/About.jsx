import React from "react";
import AboutFirstSection from "../sections/AboutFirstSection";
import AboutSecondSection from "../sections/AboutSecondSection";
import AboutThirdSection from "../sections/AboutThirdSection";
import AboutFourthSection from "../sections/AboutFourthSection";
import AboutFifthSection from "../sections/AboutFifthSection";
import AboutSixthSection from "../sections/AboutSixthSection";
import AboutSeventhSection from "../sections/AboutSeventhSection";
import AboutWhyDigi from "../sections/AboutWhyDigi";
import AboutStatSection from "../sections/AboutStatSection";

//  <AboutFirstSection />
//       <AboutSecondSection />
//       <AboutThirdSection />
//       <AboutFourthSection />
const About = () => {
  return (
    <div className="min-h-screen  w-full relative z-10 text-zinc-200 pointer-events-none ">
      <AboutFirstSection />
      {/* <AboutSecondSection /> */}
      <AboutThirdSection />

      <AboutWhyDigi />
      <AboutStatSection/>

      <AboutFourthSection />
      <AboutFifthSection />
      <AboutSixthSection />
      <AboutSeventhSection />
    </div>
  );
};

export default About;

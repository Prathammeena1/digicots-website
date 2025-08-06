import React from "react";
import AboutFirstSection from "../sections/AboutFirstSection";
import AboutSecondSection from "../sections/AboutSecondSection";
import AboutThirdSection from "../sections/AboutThirdSection";
import AboutFourthSection from "../sections/AboutFourthSection";
import AboutFifthSection from "../sections/AboutFifthSection";


//  <AboutFirstSection />
//       <AboutSecondSection />
//       <AboutThirdSection />
//       <AboutFourthSection />
const About = () => {
  return (
    <div className="min-h-screen  w-full relative z-10 text-zinc-200 bg-[#282929]">
      {/* <AboutFirstSection /> */}
      {/* <AboutSecondSection /> */}
      {/* <AboutThirdSection /> */}
      <AboutFourthSection />
      <AboutFifthSection />
    </div>
  );
};

export default About;

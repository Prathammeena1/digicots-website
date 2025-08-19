import React from "react";
import WebStatisticsSection from "../sections/WebStatisticsSection";
import WebsAndDigitalCaseStudySection from "../sections/WebsAndDigitalCaseStudySection";
import BrandingLanding from "../sections/BrandingLanding";
import BrandingSection2 from "../sections/BrandingSection2";
import WebSolveSection from "../sections/WebSolveSection";
import BrandingSection3 from "../sections/BrandingSection3";
import BrandingSection4 from "../sections/BrandingSection4";
import BrandingSection5 from "../sections/BrandingSection5";

const landingdata = {
  heading: ["Create your ", "Dream Brand"],
  p: ` With all our in-house expertise and experience, our brand creation
            services <br /> gets our global clients noticed for all the right
            reasons.`,
  btn: "Get in touch",
  img:"/final-images/web/img1.png",
  bgColor:"black"
};

const section2Data = {
    heading: ["Building", "authenticity", "and trust"],
    p: [
        `New to the wild? Or back on the hunt? We’re a brand creation agency
        with the instincts of a wolf—strategic, relentless, and loyal to your
        success. We track, research, and craft strategies that make you own
        your territory.`,
        `  Our pack works with precision, uniting your values and goals into a
        clear path. Whether claiming new ground or chasing recognition, we
        shape perceptions and make your presence impossible to ignore.`,
    ],
    img:"/final-images/web/img2.png",
  bgColor: "black",
};

const WebAndDigital = () => {
  return (
    <div className="h-full w-full relative z-20 text-white ">
      <BrandingLanding data={landingdata} />

      <BrandingSection2 data={section2Data} />
      <WebSolveSection />
      <WebStatisticsSection />
      <WebsAndDigitalCaseStudySection />
      <BrandingSection3 />
      <BrandingSection4 />
      <BrandingSection5 />
    </div>
  );
};

export default WebAndDigital;

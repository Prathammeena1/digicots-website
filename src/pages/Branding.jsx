import React from "react";
import BrandingLanding from "../sections/BrandingLanding";
import BrandingSection2 from "../sections/BrandingSection2";
import BrandingSection3 from "../sections/BrandingSection3";
import BrandingSection4 from "../sections/BrandingSection4";
import BrandingSection5 from "../sections/BrandingSection5";

const landingdata = {
  heading: ["Create your ", "Dream Brand"],
  p: ` With all our in-house expertise and experience, our brand creation
            services <br /> gets our global clients noticed for all the right
            reasons.`,
  btn: "Get in touch",
  img: "/images/branding-page/img1.png",
  bgColor: "#9372B9",
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
  img: "/images/branding-page/img2.png",
  bgColor: "#9372B9",
};

const Branding = () => {
  return (
    <div className="min-h-screen w-full text-zinc-200 relative z-10 bg-[#9372B9]">
      <BrandingLanding data={landingdata} />
      <BrandingSection2 data={section2Data} />
      <BrandingSection3 />
      <BrandingSection4 />
      <BrandingSection5 />
    </div>
  );
};

export default Branding;

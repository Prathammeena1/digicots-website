import React, { useRef } from "react";
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
  img: "/final-images/branding-page/B1.png",
  bgColor: ["white", "white"],
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
  img: "/final-images/branding-page/B2.png",
  bgColor: ["white", "white"],
};
const section3Data = {
  heading: ["Have a", "Query ?"],
  btn: "Get in touch",
  img: "/final-images/branding-page/B3.png",
  bgColor: ["white", "white"],
};

const section4Data = {
  headings: {
    h1: ["Brand creation", "specialists", "at the ready"],
    h2: ["Taking your", "brand message", "to the world"],
  },

  p: {
    p1: ` With every insight we track down, our brand creation pack moves
                in-storytellers and visionaries who make your brand spark
                emotion and forge lasting connections. It’s more than words or a
                logo; our work gives your brand the strength and depth to lead
                the pack.`,
    p2: ` For the strongest brands, it’s not just what you say, it’s how
                  you say it. Our brand messaging pack makes sure your voice hits
                  with precision. We hunt down what makes you great, then turn it
                  into powerful copy and a voice that commands the world’s
                  attention.`,
  },

  bgColor: ["white", "white"],
};
const section5Data = {
  heading: ["Have a", "Query ?"],
  btn: "Get in touch",
  img: "/final-images/branding-page/B4.png",
  bgColor: ["white", "white"],

  imageMap: {
    "Research & Strategy": "/final-images/branding-page/B5.png",
    Branding: "/final-images/branding-page/B6.png",
    Content: "/final-images/branding-page/B7.png",
    "Advertising ": "/final-images/branding-page/B8.png",
    Campaigns: "/final-images/branding-page/B9.png",
    "Website Design": "/final-images/branding-page/B10.png",
  },

  listItems: [
    "Research & Strategy",
    "Branding",
    "Content",
    "Advertising ",
    "Campaigns",
    "Website Design",
  ],
};

const Branding = () => {
  const pageRef = useRef(null);
  return (
    <div
      ref={pageRef}
      className="min-h-screen w-full dark:text-zinc-200 relative z-10 "
    >
      <>
        <BrandingLanding data={landingdata} />
        <BrandingSection2 data={section2Data} />
        <BrandingSection3 data={section3Data} />
        <BrandingSection4 data={section4Data} />
        <BrandingSection5 data={section5Data} />
      </>
    </div>
  );
};

export default Branding;

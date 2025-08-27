import React from "react";
import HomeFourthSectionCard from "../components/HomeFourthSectionCard";
import HomeFourthSectionCanvas from "../components/HomeFourthSectionCanvas";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import TextAnimation from "../components/TextAnimation";
import ParticleEffect from "../components/Svg_particle_effect";

const content = [
  {
    title: "Pro-Strategist ",
    // imgSrc:"/final-images/gif/1.gif",
    h2: "CORE-STRATEGY",
    imgSrc: "/final-images/gif/1-black.gif",
    dHead: `Strategies that <br />
    reflect who you are.`,
    dParagraph: `We design customised tech solutions and development strategies that optimise both technological and management processes within your company. Our approach empowers businesses to achieve efficiency, scalability, and sustainable growth.`,
  },
  {
    title: "Pro-Strategist ",
    imgSrc: "/final-images/gif/2-black.gif",
    h2: "DEVELOPMENT",
    dHead: `Solutions that <br /> deliver your future.`,
    dParagraph: `We craft innovative, data-driven digital solutions and performance marketing strategies that maximise visibility, reach, and ROI. From comprehensive SEO research to targeted campaigns, we help brands grow smarter, faster, and stronger.`,
  },
];

const HomeFourthSection = () => {
  return (
    <div className=" pointer-events-auto">
      <TextAnimP1>
        <div className="text-white relative z-20 pt-25 ">
          <div className="text-center">
            <h2 className="text-white heading-text mb-5">
              <TextAnimation >Digicots: Where innovation hunts with creativity.</TextAnimation>
            </h2>
            <h2 className="text-zinc-200 subHeading-text w-full">
              {/* Where creativity transforms into digital impact */}
              {/* <TextAnimation animeStart="95" animeEnd="90" duration={.1} stagger={10} >Creative by nature, Digital by design - We are Digicots.</TextAnimation> */}
            </h2>
          </div>
        </div>
        <div className="min-h-screen w-full  relative overflow-hidden flex items-start justify-center gap-[30vw] px-30 mt-20 ">
          {/* <HomeFourthSectionCanvas /> */}
          <ParticleEffect />

          {content.map((item, index) => (
            <HomeFourthSectionCard
              key={index}
              align={index % 2 === 0 ? "left" : "right"}
              content={item}
            />
          ))}
        </div>
      </TextAnimP1>
    </div>
  );
};

export default HomeFourthSection;

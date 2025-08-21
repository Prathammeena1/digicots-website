import React from "react";
import HomeFourthSectionCard from "../components/HomeFourthSectionCard";
import HomeFourthSectionCanvas from "../components/HomeFourthSectionCanvas";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const content = [
  {
    title: "Pro-Strategist ",
    // imgSrc:"/final-images/gif/1.gif",
    imgSrc: "/final-images/gif/2.gif",
    h2: "HOLISTIC ADVISORY",
    dHead: `Strategies that <br />
reflect who you are.`,
    dParagraph: `We understand your core, your values and blend them into data & analytics to create systems that rip apart your competition.`,
  },
  {
    title: "Pro-Strategist ",
    imgSrc: "/final-images/gif/1.gif",
    h2: "CUSTOMIZED SOLUTIONS",
    dHead: `Solutions that <br /> deliver your future.`,
    dParagraph: `We scour your existing systems for gaps and develop automated solutions that boost efficiencies and minimize risks.`,
  },
];

const HomeFourthSection = () => {
  return (
    <>
      <TextAnimP1>
        <div className="text-black relative z-20">
          <div className="text-center mb-10">
            <div className="text-2xl ">
              Hello! We’re Digicots
            </div>
            <h2 className="dark:text-zinc-200 text-center font-semibold text-3xl w-full ">
                Where creativity transforms into digital impact
            </h2>
          </div>
        </div>
        <div className="h-screen w-full dark:bg-black relative overflow-hidden flex items-start justify-center gap-[33vw] px-30 ">
          <HomeFourthSectionCanvas />

          {content.map((item, index) => (
            <HomeFourthSectionCard
              key={index}
              align={index % 2 === 0 ? "left" : "right"}
              content={item}
            />
          ))}
        </div>
      </TextAnimP1>
    </>
  );
};

export default HomeFourthSection;

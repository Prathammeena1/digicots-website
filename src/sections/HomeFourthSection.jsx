import React from "react";
import HomeFourthSectionCard from "../components/HomeFourthSectionCard";
import HomeFourthSectionCanvas from "../components/HomeFourthSectionCanvas";

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
  );
};

export default HomeFourthSection;

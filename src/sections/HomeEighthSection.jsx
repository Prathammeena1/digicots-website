import React from "react";
import KineticGrid from "../components/KineticGrid";
import TextAnimH1 from "../components/TextAnimH1";

const HomeEighthSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center dark:bg-black relative z-10 ">
      <div className="text-center my-10 py-10 relative z-10 pointer-events-none dark:bg-black">
        <h2 className="dark:text-zinc-200 text-6xl md:text-7xl font-bold tracking-wide">
          <TextAnimH1>Appreciations For</TextAnimH1>
        </h2>
      </div>
      <KineticGrid />
    </div>
  );
};

export default HomeEighthSection;

import React from "react";
import KineticGrid from "../components/KineticGrid";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const HomeEighthSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center dark:bg-black relative z-10 ">
      <TextAnimP1>
        <div className="text-center my-10 py-10 relative z-10 pointer-events-none dark:bg-black">
          <h2 className="dark:text-zinc-200 text-6xl md:text-7xl font-bold tracking-wide uppercase">
            OUR DIGITAL SHOWCASE
          </h2>
        </div>
        <KineticGrid />
      </TextAnimP1>
    </div>
  );
};

export default HomeEighthSection;

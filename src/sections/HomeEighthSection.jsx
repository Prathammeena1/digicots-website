import React from "react";
import KineticGrid from "../components/KineticGrid";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const HomeEighthSection = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center dark:bg-black relative z-10 bg-white">
      <TextAnimP1>
        <div className="text-center my-10 py-10 relative z-10 pointer-events-none dark:bg-black">
          {/* <h2 className="dark:text-zinc-200 text-6xl md:text-7xl font-bold tracking-wide uppercase">
            OUR DIGITAL SHOWCASE
          </h2> */}
          <div className="text-center mt-10 px-30">
          <div className="text-center">
            <h2 className="dark:text-white  text-6xl md:text-7xl font-bold tracking-wide mb-5 capitalize">
              our digital showcase
            </h2>
            <h2 className="dark:text-zinc-200 text-center font-semibold text-[27px]  w-full">
              Our Alpha Edge represents innovation, precision, and relentless
              drive that empowers businesses to lead, adapt, and thrive in a
              competitive digital world.
            </h2>
          </div>
        </div>

        </div>
        <KineticGrid />
      </TextAnimP1>
    </div>
  );
};

export default HomeEighthSection;

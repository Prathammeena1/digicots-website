import React from "react";
import KineticGrid from "../components/KineticGrid";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import TextAnimation from "../components/TextAnimation";
import HomeDigitalShow from "../components/HomeDigitalShow";

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
              <h2 className="dark:text-white heading-text mb-5">
                <TextAnimation>
                  See how Digicots turns vision into digital reality
                </TextAnimation>
              </h2>
              <h2 className="dark:text-zinc-200 subHeading-text w-full">
                {/* <TextAnimation
                  animeStart="95"
                  animeEnd="90"
                  duration={0.1}
                  stagger={10}
                >
                  Our Alpha Edge represents innovation, precision, and
                  relentless drive that empowers
                </TextAnimation>
                <TextAnimation
                  animeStart="95"
                  animeEnd="90"
                  duration={0.1}
                  stagger={10}
                >
                  businesses to lead, adapt, and thrive in a
                  competitive digital world.
                </TextAnimation> */}
              </h2>
            </div>
          </div>
        </div>
        {/* <KineticGrid /> */}

        <HomeDigitalShow />
      </TextAnimP1>
    </div>
  );
};

export default HomeEighthSection;

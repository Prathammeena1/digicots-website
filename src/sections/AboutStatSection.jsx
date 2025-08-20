import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import CountingAnimation from "../components/CountingAnimation";

const AboutStatSection = () => {
  const statsData = [
    {
      number: "78",
      symbol: "",
      label: "Global Team Members",
    },
    {
      number: "14",
      symbol: "",
      label: "Years In Business",
    },
    {
      number: "500",
      symbol: "+",
      label: "Projects Completed",
    },
  ];

  return (
    <div className=" dark:text-white py-20">
      <div className="px-30 mx-auto flex flex-col justify-center">
        {/* Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-10">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center md:text-left">
              <h2 className="text-8xl lg:text-9xl font-bold leading-none mb-1">
                <CountingAnimation>{stat.number} </CountingAnimation>{" "}
                <span>{stat.symbol}</span>
              </h2>
              <p className="dark:text-zinc-300 text-xl">
                <TextAnimP1>{stat.label}</TextAnimP1>
              </p>
            </div>
          ))}
        </div>

        {/* Headquarters Section */}
        <div className="mt-12">
          <h1 className="text-8xl lg:text-9xl font-bold leading-none mb-3">
            <TextAnimH1>San Francisco</TextAnimH1>
          </h1>
          <p className="dark:text-zinc-300 text-xl">
            <TextAnimP1>Headquarters</TextAnimP1>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutStatSection;

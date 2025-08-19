import React from "react";
import CountingAnimation from "../components/CountingAnimation";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const Card = ({ heading, description }) => {
  return (
    <>
      <div className="relative h-[250px] aspect-square p-8 group cursor-pointer">
        <div
          className="absolute z-20 top-0 left-0 right-0 bottom-0 h-full w-full bg-zinc-900 scale-y-[1.1] opacity-0 group-hover:opacity-100 rotate-0 group-hover:rotate-[-8deg]"
          style={{ transition: "all 0.5s cubic-bezier(0.65, 0, 0.35, 1)" }}
        ></div>
        <div className="absolute z-20 top-0 left-0 right-0 bottom-0 h-full w-full bg-zinc-800 scale-y-[1.1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          className="absolute w-[25%] top-0 left-0"
          src="/final-images/utils/Line.png"
          alt=""
        />
        <img
          className="absolute w-[25%] top-0 right-0 rotate-[180deg]"
          src="/final-images/utils/Line.png"
          alt=""
        />
        <img
          className="absolute w-[25%] bottom-0 left-0"
          src="/final-images/utils/Line.png"
          alt=""
        />
        <img
          className="absolute w-[25%] bottom-0 right-0 rotate-[180deg]"
          src="/final-images/utils/Line.png"
          alt=""
        />
        <img
          className="absolute h-[25%] top-0 left-0 rotate-[180deg]"
          src="/final-images/utils/Line2.png"
          alt=""
        />
        <img
          className="absolute h-[25%] top-0 right-0 rotate-[180deg]"
          src="/final-images/utils/Line2.png"
          alt=""
        />
        <img
          className="absolute h-[25%] bottom-0 left-0"
          src="/final-images/utils/Line2.png"
          alt=""
        />
        <img
          className="absolute h-[25%] bottom-0 right-0"
          src="/final-images/utils/Line2.png"
          alt=""
        />

        <div className=" h-full w-full flex flex-col items-center justify-center gap-4 relative z-30">
          <img
            className="w-[20%]"
            src="/final-images/utils/cellphone.png"
            alt=""
          />
          <div className="">
            <h1 className="text-lg font-semibold">{heading}</h1>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default function WebStatisticsSection() {
  return (
    <div className="min-h-screen  text-white py-24">
      <div className=" px-30 mx-auto ">
        <div className="flex gap-20 items-center ">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-6xl lg:text-7xl font-light leading-tight">
                <TextAnimH1>Our</TextAnimH1>
                <span className="font-semibold block">
                  <TextAnimH1>tour in</TextAnimH1>
                </span>
                <span className="">
                  <TextAnimH1>numbers.</TextAnimH1>
                </span>
              </h1>
              <p className="text-zinc-300 text-lg">
                <TextAnimP1>
                  We work all over the world.
                </TextAnimP1>
              </p>
            </div>

            {/* Statistics */}
            <div className="flex gap-20 pt-8">
              <div>
                <div className="text-6xl lg:text-7xl font-semibold mb-2 flex gap-1">
                  <CountingAnimation>550</CountingAnimation> <span>+</span>
                </div>
                <p className="text-zinc-300 text-lg">
                  <TextAnimP1 >Web pages created</TextAnimP1>
                </p>
              </div>
              <div>
                <div className="text-6xl lg:text-7xl font-semibold mb-2 flex gap-1">
                  <CountingAnimation>50</CountingAnimation> <span>+</span>
                </div>
                <p className="text-zinc-300 text-lg">
                  <TextAnimP1 >Fixed support customers</TextAnimP1>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
            <TextAnimP1 >
              <Card
                heading="WordPress Expert"
                description="more than 500 sites developed"
              />
            </TextAnimP1>
          </div>
        </div>
      </div>
    </div>
  );
}

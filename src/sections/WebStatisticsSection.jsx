import React from "react";
import CountingAnimation from "../components/CountingAnimation";

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
                Our <span className="font-semibold block">tour in</span>
                <span className="">numbers.</span>
              </h1>
              <p className="text-zinc-300 text-lg">
                We work all over the world.
              </p>
            </div>

            {/* Statistics */}
            <div className="flex gap-20 pt-8">
              <div>
                <div className="text-6xl lg:text-7xl font-semibold mb-2 flex gap-1">
                  <CountingAnimation>550</CountingAnimation> <span>
                    +</span>
                </div>
                <p className="text-zinc-300 text-lg">Web pages created</p>
              </div>
              <div>
                <div className="text-6xl lg:text-7xl font-semibold mb-2 flex gap-1">
                  <CountingAnimation>50</CountingAnimation> <span>+</span>
                </div>
                <p className="text-zinc-300 text-lg">Fixed support customers</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
            <Card
              heading="WordPress Expert"
              description="more than 500 sites developed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

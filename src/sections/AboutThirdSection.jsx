import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const AboutThirdSection = () => {
  return (
    <div className="section h-screen w-full text-white px-30 pt-16">
      <div className=" w-full max-w-[1700px] mx-auto">
        {/* Our Core Values Section */}
        <div className="border-t border-gray-400/[.9] mt-10 py-16">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-7xl font-semibold">
                <TextAnimH1>Our Core</TextAnimH1>

                <TextAnimH1>Values</TextAnimH1>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed text-gray-300">
                <TextAnimP1>
                  The force della knowledge, the impact della creativity, the
                  pervasiveness della technology. With the consulting of
                  marketing and communication of Quamm, the value del your
                  business grows in the tempo. The force della knowledge, the
                  impact della creativity.
                </TextAnimP1>
              </p>
            </div>
          </div>
        </div>

        {/* Our Commitment Section */}
        <div className="py-16 border-t border-gray-400/[.9] ">
          <div className="flex flex-col items-start justify-between gap-12">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-7xl font-semibold mb-1">
                <TextAnimH1>Our Commitment</TextAnimH1>
              </h2>
              <div className="">
                <TextAnimP1>
                  <p className="text-lg text-zinc-400 leading-[1.1]">
                    Only the best in
                    <br />
                    their field
                  </p>
                </TextAnimP1>
              </div>
            </div>
            <div className="relative">
              <p className="text-lg leading-relaxed text-gray-300 mb-8">
                <TextAnimP1>
                  The force della knowledge, the impact della creativity, the
                  pervasiveness della technology. With the consulting of
                  marketing and communication of Quamm, the value del your
                  business grows in the tempo. The force della knowledge, the
                  impact della creativity, the pervasiveness della technology.
                  With the consulting of marketing and communication of Quamm,
                  the value del your business grows in the tempo.
                </TextAnimP1>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThirdSection;

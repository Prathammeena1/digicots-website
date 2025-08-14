import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const BrandingSection4 = () => {
  return (
    <div className="section h-screen w-full text-white px-30">
      <div className=" w-full max-w-[1700px] mx-auto">
        {/* Our Core Values Section */}
        <div className="border-b border-gray-400/[.9] mt-10 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-6xl font-light leading-[1.15]">
                <span className="font-semibold">
                  <TextAnimH1>Brand creation</TextAnimH1>{" "}
                </span>
                <TextAnimH1>specialists</TextAnimH1>
                <TextAnimH1>at the ready</TextAnimH1>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed text-gray-300">
                <TextAnimP1>

                With every insight we track down, our brand creation pack moves
                in-storytellers and visionaries who make your brand spark
                emotion and forge lasting connections. It’s more than words or a
                logo; our work gives your brand the strength and depth to lead
                the pack.
                </TextAnimP1>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-6xl font-light leading-[1.15]">
                <TextAnimH1>Taking your </TextAnimH1>
                <span className="font-semibold">
                  <TextAnimH1>brand message</TextAnimH1>
                </span>
                <TextAnimH1> to the world</TextAnimH1>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed text-gray-300">
                <TextAnimP1>
                  For the strongest brands, it’s not just what you say, it’s how
                  you say it. Our brand messaging pack makes sure your voice hits
                  with precision. We hunt down what makes you great, then turn it
                  into powerful copy and a voice that commands the world’s
                  attention.
                </TextAnimP1>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection4;

import React from "react";

const BrandingSection4 = () => {
  return (
    <div className="section h-screen w-full text-white px-12">
      <div className=" w-full max-w-[1700px] mx-auto">
        {/* Our Core Values Section */}
        <div className="border-b border-gray-400/[.9] mt-10 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-7xl font-light">
                <span className="font-semibold">Brand creation </span>
                <br />
                specialists <br />
                at the ready
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed text-gray-300">
                With every insight we track down, our brand creation pack moves
                in-storytellers and visionaries who make your brand spark
                emotion and forge lasting connections. It’s more than words or a
                logo; our work gives your brand the strength and depth to lead
                the pack.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-7xl font-light">
                Taking your <br />
                <span className="font-semibold">brand message</span> <br />
                to the world
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed text-gray-300">
                For the strongest brands, it’s not just what you say, it’s how
                you say it. Our brand messaging pack makes sure your voice hits
                with precision. We hunt down what makes you great, then turn it
                into powerful copy and a voice that commands the world’s
                attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection4;

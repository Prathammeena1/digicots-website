import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const BrandingSection4 = ({ data }) => {
  return (
    <div className="section h-screen w-full dark:text-white px-30">
      <div className=" w-full max-w-[1700px] mx-auto">
        {/* Our Core Values Section */}
        <div className="border-b border-gray-400/[.9] mt-10 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-6xl font-light leading-[1.15]">
                <span className="font-semibold">
                  <TextAnimH1>{data?.headings?.h1[0]}</TextAnimH1>{" "}
                </span>
                <TextAnimH1>{data?.headings?.h1[1]}</TextAnimH1>
                <TextAnimH1>{data?.headings?.h1[2]}</TextAnimH1>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed dark:text-gray-300 text-zinc-500">
                <TextAnimP1>

                {data?.p?.p1}
                </TextAnimP1>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-6xl font-light leading-[1.15]">
                <TextAnimH1>{data?.headings?.h2[0]}</TextAnimH1>
                <span className="font-semibold">
                  <TextAnimH1>{data?.headings?.h2[1]}</TextAnimH1>
                </span>
                <TextAnimH1> {data?.headings?.h2[2]}</TextAnimH1>
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-lg leading-relaxed dark:text-gray-300 text-zinc-500">
                <TextAnimP1>
                  {data?.p?.p2}
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

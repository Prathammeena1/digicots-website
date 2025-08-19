import React from "react";
import RollingImageEffect from "../components/RollingImageEffect";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const BrandingSection3 = ({data}) => {
  return (
    <div className="h-screen w-full flex items-center px-30 relative">
      <div className="h-[40vh] flex flex-col justify-between pt-30 gap-8 ">
        <h1 className="font-bold text-[6vw] leading-[1] opacity-30">
          <TextAnimH1>{data?.heading[0]}</TextAnimH1>
          <TextAnimH1>{data?.heading[1]}</TextAnimH1>
        </h1>
        <TextAnimP1>

        <button className="w-fit text-white py-3 px-8 border border-zinc-200">
          {data?.btn}
        </button>
        </TextAnimP1>
      </div>
      <div className="absolute right-0 bottom-0 w-[800px] h-[600px] ">
        <RollingImageEffect bgColor={data?.bgColor}>
          <img
            src={data?.img}
            className="object-cover w-full h-full"
            alt=""
          />
        </RollingImageEffect>
      </div>
    </div>
  );
};

export default BrandingSection3;

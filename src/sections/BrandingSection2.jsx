import React, { useRef } from "react";
import RollingImageEffect from "../components/RollingImageEffect.jsx";
import TextAnimH1 from "../components/TextAnimH1.jsx";
import TextAnimP1 from "../components/TextAnimP1.jsx";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const BrandingSection2 = ({ data }) => {
  return (
    <div className="h-screen w-full flex items-center px-30 relative ">
      <div className="h-[90vh] flex flex-col gap-5">
        <h1 className="font-light text-[6vw] leading-[1.15]">
          <TextAnimH1>{data?.heading[0]}</TextAnimH1>
          <span className="font-bold">
            <TextAnimH1>{data?.heading[1]}</TextAnimH1>
          </span>
          <TextAnimH1>{data?.heading[2]}</TextAnimH1>
        </h1>
        <p className="text-[20px] ">
          <TextAnimP1>{data?.p[0] || ""}</TextAnimP1>
        </p>
        <p className="text-[20px] ">
          <TextAnimP1>{data?.p[1] || ""}</TextAnimP1>
        </p>
      </div>
      {!data?.imgHidden && (
        <div className="absolute left-0 bottom-0 w-[600px] h-[400px]  translate-y-[70%]">
          <RollingImageEffect align="right" bgColor={data?.bgColor}>
            <img src={data.img} className="object-cover w-full h-full" alt="" />
          </RollingImageEffect>
        </div>
      )}
    </div>
  );
};

export default BrandingSection2;

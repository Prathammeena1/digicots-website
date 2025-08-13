import React from "react";
import RollingImageEffect from "../components/RollingImageEffect";

const BrandingSection3 = () => {
  return (
    <div className="h-screen w-full flex items-center px-20 relative">
      <div className="h-[40vh] flex flex-col justify-between pt-30 gap-8 ">
        <h1 className="font-bold text-[6vw] leading-[1] opacity-30">
          Have a <br />
          Query ?
        </h1>
        <button className="w-fit text-white py-3 px-8 border border-zinc-200">
          Get in touch
        </button>
      </div>
      <div className="absolute right-0 bottom-0 w-[800px] h-[600px] ">
        <RollingImageEffect>
          <img
            src="/images/branding-page/img3.png"
            className="object-cover w-full h-full"
            alt=""
          />
        </RollingImageEffect>
      </div>
    </div>
  );
};

export default BrandingSection3;

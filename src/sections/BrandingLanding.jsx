import React from "react";
import RollingImageEffect from "../components/RollingImageEffect";

const BrandingLanding = () => {
  return (
    <div className="h-screen w-full flex items-center px-20 relative">
      <div className="h-[60vh] flex flex-col justify-between">
        <h1 className="font-bold text-[8vw] leading-[1]">
          Create your <br /> Dream Brand
        </h1>
        <p className="text-base ">
          With all our in-house expertise and experience, our brand creation
          services <br /> gets our global clients noticed for all the right
          reasons.
        </p>
        <button className="w-fit text-white py-3 px-8 border border-zinc-200">
          Get in touch
        </button>
      </div>
      <div className="absolute right-0 bottom-0 w-[600px] h-[400px]  translate-y-1/2 overflow-hidden">
        <RollingImageEffect>
          <img
            src="/images/branding-page/img1.png"
            className="object-cover w-full h-full"
            alt=""
          />
        </RollingImageEffect>
      </div>
    </div>
  );
};

export default BrandingLanding;

import React from "react";
import RollingImageEffect from "../components/RollingImageEffect.jsx";
const BrandingSection2 = () => {
  return (
    <div className="h-screen w-full flex items-center px-20 relative">
      <div className="h-[90vh] flex flex-col gap-5">
        <h1 className="font-light text-[6vw] leading-[1]">
          Building <br />
          <span className="font-bold">authenticity</span> <br />
          and trust
        </h1>
        <p className="text-[22px] ">
          New to the wild? Or back on the hunt? We’re a brand creation agency
          with the instincts of a wolf—strategic, relentless,  and loyal
          to your success. We track, research, and craft strategies that make
          you own your territory.
        </p>
        <p className="text-[22px] ">
          Our pack works with precision, uniting your values and goals into a
          clear path. Whether claiming new ground or chasing 
          recognition, we shape perceptions and make your presence impossible to
          ignore.
        </p>
      </div>
      <div className="absolute left-0 bottom-0 w-[600px] h-[400px]  translate-y-1/2">
        <RollingImageEffect>
          <img
            src="/images/branding-page/img2.png"
            className="object-cover w-full h-full"
            alt=""
          />
        </RollingImageEffect>
      </div>
    </div>
  );
};

export default BrandingSection2;

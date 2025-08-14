import React, { memo } from "react";
import RollingImageEffect from "../components/RollingImageEffect";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const BrandingLanding = memo(() => {
  return (
    <div className="h-screen w-full flex items-center px-30 relative">
      <div className="h-[60vh] flex flex-col justify-between">
        <h1 className="font-bold text-[8vw] leading-[1.1] text-zinc-200">
          <TextAnimH1 isLanding={true}>Create your</TextAnimH1>
          <TextAnimH1 isLanding={true} delay={0.4}>
            Dream Brand
          </TextAnimH1>
        </h1>
        <TextAnimP1 isLanding={true} delay={0.6}>
          <p className="text-base ">
            With all our in-house expertise and experience, our brand creation
            services <br /> gets our global clients noticed for all the right
            reasons.
          </p>
        </TextAnimP1>
        <TextAnimP1 isLanding={true} delay={0.6}>
          <button className="w-fit text-white py-3 px-8 border border-zinc-200">
            Get in touch
          </button>
        </TextAnimP1>
      </div>
      <div className="absolute right-0 bottom-0 w-[600px] h-[400px] translate-y-1/2 overflow-hidden">
        <RollingImageEffect>
          <img
            src="/images/branding-page/img1.png"
            className="object-cover w-full h-full"
            alt="Branding"
          />
        </RollingImageEffect>
      </div>
    </div>
  );
});

BrandingLanding.displayName = 'BrandingLanding';

export default BrandingLanding;
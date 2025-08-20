import React, { memo } from "react";
import RollingImageEffect from "../components/RollingImageEffect";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";

const BrandingLanding = memo(({ data }) => {
  return (
    <div className="h-screen w-full flex items-center px-30 relative">
      <div className="h-[60vh] flex flex-col justify-between">
        <h1 className="font-bold text-[8vw] leading-[1.1] text-zinc-200">
          {/* <TextAnimH1 isLanding={true}>Create your</TextAnimH1>
          <TextAnimH1 isLanding={true} delay={0.4}>
            Dream Brand
          </TextAnimH1> */}
          {data?.heading?.map((line, index) => (
            <TextAnimH1 key={index} isLanding={true} delay={index * 0.4}>
              {line}
            </TextAnimH1>
          ))}
        </h1>
        <p className="text-base text-zinc-200 ">
          <TextAnimP1>
            <span
              dangerouslySetInnerHTML={{
                __html: data?.p || "",
              }}
            />
          </TextAnimP1>
        </p>
        <TextAnimP1 isLanding={true} delay={0.6}>
          <Button>Get in touch</Button>
        </TextAnimP1>
      </div>
      <div className="absolute right-0 bottom-0 w-[600px] h-[400px] translate-y-1/2 overflow-hidden">
        <RollingImageEffect bgColor={data?.bgColor || ""}>
          <img
            src={data?.img || ""}
            className="object-cover w-full h-full"
            alt="Branding"
          />
        </RollingImageEffect>
      </div>
    </div>
  );
});

BrandingLanding.displayName = "BrandingLanding";

export default BrandingLanding;

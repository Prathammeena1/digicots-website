import React from "react";
import BrandingLanding from "../sections/BrandingLanding";
import BrandingSection2 from "../sections/BrandingSection2";
import BrandingSection3 from "../sections/BrandingSection3";
import BrandingSection4 from "../sections/BrandingSection4";
import BrandingSection5 from "../sections/BrandingSection5";
// import UnrollingPaper from "../components/UnrollingPaper";

const Branding = () => {
  return (
    <div className="min-h-screen w-full text-zinc-200 relative z-10 pointer-events-none">
        {/* <UnrollingPaper /> */}
      <BrandingLanding />
      <BrandingSection2 />
      <BrandingSection3 />
      <BrandingSection4 />
      <BrandingSection5/>
    </div>
  );
};

export default Branding;
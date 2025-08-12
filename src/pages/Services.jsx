import React from "react";
import ServiceLanding from "../sections/ServiceLanding";
import ServiceLanding2 from "../sections/ServiceLanding2";

const Services = () => {
  return (
    <div className="h-full w-full bg-transparent relative z-10 pointer-events-none">
      {/* <ServiceLanding /> */}
      <ServiceLanding2
        // services={[
        //   {
        //     className:
        //       "heroHeading bg-red-200 flex justify-center items-center",
        //     initialWidth: "60vw",
        //     content: (
        //       <div className="p-8">
        //         <h1 className="text-white text-7xl font-bold mb-8">Services</h1>
        //         <p className="text-zinc-300 max-w-4xl">
        //           The force della knowledge, the impact della creativity...
        //         </p>
        //       </div>
        //     ),
        //   },
        //   { className: "bg-amber-200", initialWidth: "25vw", content: null },
        //   { className: "bg-sky-400", initialWidth: "15vw", content: null },
        //   { className: "bg-purple-400", initialWidth: "0vw", content: null },
        //   { className: "bg-pink-400", initialWidth: "0vw", content: null },
        //   { className: "bg-yellow-800", initialWidth: "0vw", content: null },
        //   { className: "bg-emerald-500", initialWidth: "0vw", content: null },
        // ]}
      />
    </div>
  );
};

export default Services;

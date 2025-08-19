import React, { useState } from "react";
import TextAnimP1 from "../components/TextAnimP1";

export default function WebsAndDigitalCaseStudySection() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const caseStudyData = [
    {
      id: 1,
      title: "Details of the case",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img1.png",
      position: "top-0",
    },
    {
      id: 2,
      title: "Opportunity",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img2.png",
      position: "top-[20%]",
    },
    {
      id: 3,
      title: "Implemented Solution",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img3.png",
      position: "top-[50%]",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <div className=" mx-auto px-30 py-26">
        <div className="grid lg:grid-cols-[1fr_1fr] items-center">
          {/* Left Side - Content */}
          <div className=" w-[55vw]">
            {caseStudyData.map((section, index) => (
              <React.Fragment key={section.id}>
                  <TextAnimP1>
                <div
                  className="flex gap-8 cursor-pointer transition-all duration-300 hover:bg-zinc-700/30 p-6 py-12 rounded-lg"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                    <div className="text-8xl font-bold text-gray-600 leading-none">
                      {section.id}.
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-6">
                        {section.title}
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                </div>
                  </TextAnimP1>

                {/* Add border after each section except the last one */}
                {index < caseStudyData.length - 1 && (
                  <div className="border-t border-gray-700"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right Side - Images */}
          <div className=" h-full w-full relative">
            {caseStudyData.map((section) => (
              <div
                key={`image-${section.id}`}
                className={`h-[45vh] absolute ${
                  section.position
                } w-full overflow-hidden transition-opacity duration-500 ${
                  hoveredSection === section.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  className="object-cover w-full h-full"
                  src={section.image}
                  alt={section.title}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import TextAnimP1 from "../components/TextAnimP1";

export default function HomeServiceSection() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const servicesData = [
    {
      id: 1,
      title: "Details of the case",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img1.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
    {
      id: 2,
      title: "Opportunity",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img2.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
    {
      id: 3,
      title: "Implemented Solution",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img3.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
    {
      id: 4,
      title: "Implemented Solution",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img3.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
    {
      id: 5,
      title: "Implemented Solution",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img3.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
    {
      id: 6,
      title: "Implemented Solution",
      description:
        "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and communication.",
      image: "/final-images/web/img3.png",
      position: "top-0",
      subServices:["Web Development", "App Development", "E-commerce Solutions"]
    },
  ];

  return (
    <div className="min-h-screen dark:text-white">
      <div className=" mx-auto px-30 py-26">
        <div className="grid lg:grid-cols-[1fr_1fr] items-center">
          {/* Left Side - Content */}
          <div className=" w-[55vw]">
            {servicesData.map((section, index) => (
              <React.Fragment key={section.id}>
                  <TextAnimP1>
                <div
                  className="flex gap-8 cursor-pointer transition-all duration-300 dark:hover:bg-zinc-700/30 hover:bg-zinc-700/10 p-6 py-6 rounded-lg"
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                    <div className="text-4xl font-bold dark:text-gray-600 leading-none">
                      {section.id}.
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">
                        {section.title}
                      </h2>
                      <p className="dark:text-gray-300 text-zinc-600 text-lg leading-relaxed">
                        {/* {section.description} */}
                      </p>
                    </div>
                </div>
                  </TextAnimP1>

                {/* Add border after each section except the last one */}
                {index < servicesData.length - 1 && (
                  <div className="border-t border-gray-700"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Right Side - Images */}
          <div className=" h-full w-full relative">
            {servicesData.map((section) => (
              <div
                key={`image-${section.id}`}
                className={`h-[45vh] absolute ${
                  section.position
                } w-full overflow-hidden transition-opacity duration-500 ${
                  hoveredSection === section.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <ul>
                    {section.subServices.map((service, index) => (
                      <li key={index} className="dark:text-gray-300 text-zinc-600 text-xl">
                        {service}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

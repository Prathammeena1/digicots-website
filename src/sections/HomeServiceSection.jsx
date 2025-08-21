import React, { useState } from "react";
import TextAnimP1 from "../components/TextAnimP1";
import TextAnimH1 from "../components/TextAnimH1";
import { Link } from "react-router-dom";

export default function HomeServiceSection() {
  const [hoveredSection, setHoveredSection] = useState(null);

  const caseStudyData = [
    {
      id: 1,
      image: "/final-images/home-services/Graphic.webp",
      category: "Solutions/Services",
      title: "Creatives & Graphics",
      description:
        "Creatives Solutions  |  Motion Design  |  Illustration Design  |  Print...",
      href: "/services/2",
      position: "top-[-5%]",
    },
    {
      id: 2,
      image: "/final-images/home-services/Branding.webp",
      category: "Solutions/Services",
      title: "Branding",
      description:
        "Logo Design  |  Brand Strategy  |  Visual Identity  |  Brand Guidelines  |  Na...",
      href: "/services/4",
      position: "top-[10%]",
    },
    {
      id: 3,
      image: "/final-images/home-services/WebnDigital.webp",
      category: "Solutions/Services",
      title: "Web & Digital",
      description:
        "Website Design | Website Development | UI/UX Design | Ecommerce Sol...",
      href: "/services/5",
      position: "top-[30%]",
    },
    {
      id: 4,
      image: "/final-images/home-services/DIgitalM.webp",
      category: "Solutions/Services",
      title: "Digital Marketing",
      description:
        "Logo Design | Brand Identity | Marketing Materials | Brand Strategy...",
      href: "/services/6",
      position: "top-[45%]",
    },
    {
      id: 5,
      image: "/final-images/home-services/Content.webp",
      category: "Solutions/Services",
      title: "Content Generation",
      description:
        "3D Modelling  |  Content Strategy  |  Copywriting  |  Photography   |  Anim...",
      href: "/services/1",
      position: "top-[62%]",
    },
    {
      id: 6,
      image: "/final-images/home-services/Production.webp",
      category: "Solutions/Services",
      title: "Production (Pre-Post)",
      description:
        "Creative Direction & Storyboarding  |  Scriptwriting & Copywriting  |  Cam...",
      href: "/services/3",
      position: "top-[78%]",
    },
  ];

  return (
    <div className="min-h-screen dark:text-white py-10">
      <div className="text-center mb-25">
        <h2 className="dark:text-white text-6xl md:text-7xl font-bold mb-5 relative z-20">
          Services
        </h2>
          <h2 className="dark:text-zinc-200 text-center font-semibold text-3xl  relative z-20">
            As global leaders in UX/UI, tech, and marketing, Digicots helps <br />
            businesses simplify, strengthen, and grow.
          </h2>
      </div>
      <div className=" mx-auto ">
        <div className="grid lg:grid-cols-[1fr_1fr] items-center">
          {/* Left Side - Content */}
          <div className=" w-[55vw]">
            {caseStudyData.map((section, index) => (
              <React.Fragment key={section.id}>
                <TextAnimP1>
                  <Link
                    to={section.href}
                    className="flex gap-8 cursor-pointer transition-all duration-300 dark:hover:bg-zinc-700/30 hover:bg-[#F5C0CF]/20 p-6 py-12 rounded-lg"
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className=" pl-30 text-8xl font-bold text-gray-600 leading-none">
                      {section.id}.
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-3">
                        {section.title}
                      </h2>
                      <p className="dark:text-gray-300 text-lg leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </Link>
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

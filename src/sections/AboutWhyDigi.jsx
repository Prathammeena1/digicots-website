import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";

const AboutWhyDigi = () => {
  // Data array for sections
  const sectionsData = [
    {
      id: "01",
      title: "Teams Led by Co-Founders",
      paragraphs: [
        "We differentiate ourselves from large agencies where junior talent typically handles most of the work, and interactions with design leaders are limited.",
        "At Clay, our co-founders lead dedicated, senior-level teams with cross-disciplinary expertise to ensure project success.",
      ],
      image: "/final-images/about-why-digi/img1.png",
      alt: "Professional businessman in office",
    },
    {
      id: "02",
      title: "Innovation-Driven Solutions",
      paragraphs: [
        "Our approach combines cutting-edge technology with creative problem-solving to deliver solutions that exceed client expectations.",
        "We stay ahead of industry trends and continuously invest in new tools and methodologies to provide the best results for our clients.",
      ],
      image: "/final-images/about-why-digi/img2.png",
      alt: "Innovation and technology workspace",
    },
    {
      id: "03",
      title: "Client-Centric Approach",
      paragraphs: [
        "Every project begins with understanding our client's unique challenges, goals, and vision to create tailored solutions.",
        "We maintain transparent communication throughout the process, ensuring clients are involved in every crucial decision and milestone.",
      ],
      image: "/final-images/about-why-digi/img3.png",
      alt: "Client collaboration meeting",
    },
  ];

  return (
    <div className="min-h-screen text-white py-20">
      <div className="mx-auto px-30">
        <div className="w-full flex justify-between mb-16">
          <h1 className="text-7xl font-semibold leading-[1.2] mb-8">
            <TextAnimH1>Why Digicots</TextAnimH1>
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed max-w-md">
            <TextAnimP1>
              The force della knowledge, the impact della creativity, the
              pervasiveness della technology.
            </TextAnimP1>
          </p>
        </div>

        {/* Repeat sections using map */}
        <div className="space-y-20">
          {sectionsData.map((section, index) => (
            <div
              key={section.id}
              className={`flex justify-between items-center ${
                index % 2 === 1 ? "flex-row-reverse" : ""
              }`}
            >
              {/* Content Section */}
              <div className="space-y-8">
                {/* Number and Title */}
                <div className="">
                  <span className="text-6xl font-semibold">
                    <TextAnimH1>{section.id}</TextAnimH1>
                  </span>
                  <h2 className="text-4xl lg:text-5xl font-semibold leading-tight mt-2">
                    <TextAnimH1>{section.title}</TextAnimH1>
                  </h2>
                </div>

                {/* Description Text */}
                <div className="space-y-6 text-gray-300 text-lg leading-relaxed w-[34vw]">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex}>
                      <TextAnimP1>{paragraph}</TextAnimP1>
                    </p>
                  ))}
                </div>
              </div>

              {/* Image Section */}
              <div className="relative">
                <TextAnimP1>
                  <div className="relative h-[500px] w-[30vw] rounded-lg overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TextAnimP1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutWhyDigi;

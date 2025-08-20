import React from "react";
import CurvedSlider from "../components/CurvedSlider";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";

const AboutSixthSection = () => {
  const websites = [
    {
      id: 1,
      image: "/final-images/about-images/img1.png", // Tennis website mockup
      title: "Tennis Website",
      rotation: "-15deg",
      position: "left",
    },
    {
      id: 2,
      image: "/final-images/about-images/img2.png", // La Revolution Fraiche website mockup
      title: "La Revolution Website",
      rotation: "8deg",
      position: "center",
    },
    {
      id: 3,
      image: "/final-images/about-images/img3.png", // Sound Unchained website mockup
      title: "Sound Unchained Website",
      rotation: "-12deg",
      position: "right",
    },
  ];

  return (
    <div className="min-h-screen w-full relative  dark:text-white py-20 overflow-hidden">
      {/* <div className="absolute top-20 bg-black/20 z-10 h-[85%] w-[90%] left-1/2 transform -translate-x-1/2 rounded-3xl"></div> */}
      {/* Floating Website Mockups */}
      <div className="absolute top-16 h-screen w-full inset-0 flex items-center justify-center z-10">
        <CurvedSlider />
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        {/* Background Gradient Overlay */}

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.1] mt-100">
              <TextAnimH1>Contact us to get website</TextAnimH1>
              <span className="dark:text-white">
                <TextAnimH1>of your dreams</TextAnimH1>
              </span>
            </h1>

            {/* Call to Action Button */}
            <div className="pt-6">
              <TextAnimP1>
                <Button className="text-xl px-20 py-5">
                  GET IN TOUCH
                </Button>
              </TextAnimP1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSixthSection;

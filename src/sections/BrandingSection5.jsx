import React, { useState, useEffect } from "react";
import RollingImageEffect from "../components/RollingImageEffect";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";
const BrandingSection5 = ({data}) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [lastHoveredItem, setLastHoveredItem] = useState(null);
  const [currentImage, setCurrentImage] = useState(
    "/images/branding-page/img1.png"
  ); // Default to first item
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Image mapping for each list item
  // const data?.imageMap = {
  //   "Research & Strategy": "/images/branding-page/img5.png",
  //   "Branding": "/images/branding-page/img6.png",
  //   "Content": "/images/branding-page/img7.png",
  //   "Advertising ": "/images/branding-page/img8.png",
  //   "Campaigns": "/images/branding-page/img9.png",
  //   "Website Design": "/images/branding-page/img10.png",
  // };

  // const data?.listItems = [
  //   "Research & Strategy",
  //   "Branding",
  //   "Content",
  //   "Advertising ",
  //   "Campaigns",
  //   "Website Design",
  // ];

  // Handle image transitions with fade effect
  useEffect(() => {
    let newImage;

    if (hoveredItem) {
      // Currently hovering - show hovered item
      newImage = data?.imageMap[hoveredItem];
    } else if (lastHoveredItem) {
      // Not hovering but have last hovered - keep showing last hovered
      newImage = data?.imageMap[lastHoveredItem];
    } else {
      // No hover history - show first item (Research & Strategy)
      newImage = data?.imageMap[data?.listItems[0]];
    }

    if (newImage !== currentImage) {
      setIsTransitioning(true);

      // Start fade out, then change image, then fade in
      setTimeout(() => {
        setCurrentImage(newImage);
        setIsTransitioning(false);
      }, 200); // Half of the transition duration for smooth crossfade
    }
  }, [hoveredItem, lastHoveredItem, currentImage, data?.imageMap, data?.listItems]);

  return (
    <div className="min-h-screen w-full">
      <div className="h-[50vh] w-full">
        <RollingImageEffect direction="vertical" bgColor={data?.bgColor}>
          <img
            src={data?.img}
            className="h-full w-full object-cover"
            alt=""
          />
        </RollingImageEffect>
      </div>

      <div className=" min-h-screen w-full py-20 px-30 relative">
        <div className="w-full flex flex-col gap-10">
          <h2 className="text-7xl font-light">
            <TextAnimH1>Brand and creative</TextAnimH1>
          </h2>
          <p className="text-lg leading-relaxed dark:text-gray-300 text-zinc-500">
            <TextAnimP1>
              We make the world sit up and take notice—crafting a brand voice,
              identity, and message <br /> as powerful as a wolf’s call, ready
              to be heard far and wide.
            </TextAnimP1>
          </p>

          <ul className="list-disc pl-20 space-y-4">
            {data?.listItems.map((item, index) => (
              <TextAnimP1>
                <li
                  key={index}
                  className="cursor-pointer transition-colors duration-300 hover:text-blue-400 pointer-events-auto w-fit"
                  onMouseEnter={() => {
                    setHoveredItem(item);
                    setLastHoveredItem(item); // Save as last hovered
                  }}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {item}
                </li>
              </TextAnimP1>
            ))}
          </ul>

          <TextAnimP1>
            <Button>
              Get in touch
            </Button>
          </TextAnimP1>
        </div>
        <div className="absolute right-0 bottom-0 w-[700px] h-[500px] overflow-hidden ">
          <div className="h-full w-full relative overflow-hidden z-20">
            <RollingImageEffect bgColor={data?.bgColor}>
              <div className="relative w-full h-full">
                <img
                  src={currentImage}
                  className={`absolute inset-0 object-cover w-full h-full transition-all duration-400 ease-in-out transform hover:scale-105 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                  alt={hoveredItem || "Branding"}
                />
                {/* Overlay for smoother transitions */}
                <div
                  className={`absolute inset-0 bg-white transition-opacity duration-200 ${
                    isTransitioning ? "opacity-20" : "opacity-0"
                  }`}
                />
              </div>
            </RollingImageEffect>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection5;

import React from "react";
import TextAnimP1 from "./TextAnimP1";

const alignment = {
  left: "text-left",
  right: "text-right",
};

const HomeFourthSectionCard = ({ align, content }) => {
  return (
    <div
      className={`text-white rounded-lg max-h-[100vh] flex flex-col justify-between min-h-[400px] mt-12 ${alignment[align]}`}
    >
      <TextAnimP1>
        {/* Top section with Pro-Development */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-300">Pro-Development</h3>
        </div>
      </TextAnimP1>

      <TextAnimP1>
        <div className="h-[50vh] w-full scale-[.9]">
          <img
            src={content.imgSrc}
            className="object-contain h-full w-full"
            alt=""
          />
        </div>
      </TextAnimP1>

      {/* Bottom section with content */}
      <TextAnimP1>
        <div className="space-y-4">
          {/* DEVELOPMENT label */}
          <div className={`my-3 ${alignment[align]}`}>
            <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              DEVELOPMENT
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-2xl font-bold leading-tight mb-4">
            Solutions that are adapt to your company.
          </h2>

          {/* Description text */}
          <p className="text-gray-300 text-sm leading-relaxed">
            We develop customised systems and solutions that optimise the
            technological and management processes in your company.
          </p>
        </div>
      </TextAnimP1>
    </div>
  );
};

export default HomeFourthSectionCard;

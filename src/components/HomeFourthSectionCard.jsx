import React from "react";
import TextAnimP1 from "./TextAnimP1";

const alignment = {
  left: "text-left",
  right: "text-right",
};

const HomeFourthSectionCard = ({ align, content }) => {
  return (
    <div
      className={`text-white rounded-lg max-h-[100vh] flex flex-col justify-between `}
    >
        {/* Top section with Pro-Development */}
      {/* <TextAnimP1>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-300">Pro-Development</h3>
        </div>
      </TextAnimP1> */}

      {/* <TextAnimP1> */}
      {/* Main heading */}

        <div className="h-[60vh] w-full overflow-hidden">
          <img
            src={content.imgSrc}
            className="object-contain w-full"
            style={{
              scale: align === "right" ? ".8" : ".8",
            }}
            alt=""
          />
        </div>
          <div className={`my-3 `}>
            <span className="text-xs font-semibold text-gray-600 tracking-wider uppercase">
              {content.h2}
            </span>
          </div>
            <h2
              className="text-2xl font-semibold "
              dangerouslySetInnerHTML={{ __html: content.dHead }}
            />
      {/* Bottom section with content */}
        <div className="space-y-4">
          {/* DEVELOPMENT label */}

          

          {/* Description text */}
          <p className="text-gray-300 text-lg mt-4">
            {content.dParagraph}
          </p>
        </div>
      {/* </TextAnimP1> */}
    </div>
  );
};

export default HomeFourthSectionCard;

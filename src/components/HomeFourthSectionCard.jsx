import React from "react";
import TextAnimP1 from "./TextAnimP1";

const alignment = {
  left: "text-left",
  right: "text-right",
};

const HomeFourthSectionCard = ({ align, content }) => {
  return (
    <div
      className={`dark:text-white rounded-lg max-h-[100vh] flex flex-col justify-between min-h-[400px] mt-20 ${alignment[align]}`}
    >
        {/* Top section with Pro-Development */}
      {/* <TextAnimP1>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-300">Pro-Development</h3>
        </div>
      </TextAnimP1> */}

      {/* <TextAnimP1> */}
      {/* Main heading */}
      <h2
        className="text-2xl font-bold leading-tight mb-4"
        dangerouslySetInnerHTML={{ __html: content.dHead }}
      />

        <div className="h-[60vh] w-full">
          <img
            src={content.imgSrc}
            className="object-contain w-full"
            alt=""
          />
        </div>
      {/* Bottom section with content */}
        <div className="space-y-4">
          {/* DEVELOPMENT label */}
          {/* <div className={`my-3 ${alignment[align]}`}>
            <span className="text-xs font-semibold dark:text-gray-400 text-zinc-800 tracking-wider uppercase">
              {content.h2}
            </span>
          </div> */}

          

          {/* Description text */}
          <p className="dark:text-gray-300 text-md leading-relaxed mt-4">
            {content.dParagraph}
          </p>
        </div>
      {/* </TextAnimP1> */}
    </div>
  );
};

export default HomeFourthSectionCard;

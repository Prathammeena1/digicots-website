import React from "react";

const WolfMaskSVG = React.memo(() => (
  <svg
    className="absolute top-0 left-0 pointer-events-none h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <mask id="wolf-mask">
        <rect width="100%" height="100%" fill="white" />
        <image
          href="/images/wolf.svg"
          className="h-full w-full object-cover"
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: "invert(1)" }}
          width="100%"
          height="auto"
        />
      </mask>
    </defs>
    <g mask="url(#wolf-mask)">
      <rect width="100%" height="100%" fill="black" />
    </g>
  </svg>
));

WolfMaskSVG.displayName = 'WolfMaskSVG';

export default WolfMaskSVG;

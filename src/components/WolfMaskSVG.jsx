import React from "react";

const WolfMaskSVG = React.memo(() => (
  <svg
    className="absolute top-0 left-0 pointer-events-none h-full w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <mask id="wolf-mask">
        <rect width="100%" height="100%" fill="white" />
        <image
          href="/images/wolf.svg"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          style={{ filter: "invert(1)" }}
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

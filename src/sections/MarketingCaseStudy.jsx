// Card component
const CaseStudyCard = ({ imgSrc, imgHeight, overlayColor }) => (
  <div className="card w-full">
    <div className={`h-[${imgHeight}] w-full overflow-hidden relative group`}>
      <img
        src={imgSrc}
        className="object-cover w-full h-full"
        alt="Case Study"
      />
      <div className="absolute z-10 top-0 h-full w-full bg-gradient-to-t from-black via-black/5 to-transparent pointer-events-none"></div>
      <div
        className={`overlay flex justify-center items-center text-4xl text-white font-semibold absolute z-10 top-0 h-full w-full ${overlayColor} pointer-events-none group-hover:opacity-0 transition-all duration-300 ease-in-out`}
      >
        Brand name
      </div>
    </div>
    <div className="my-5">
      <h2 className="text-md font-semibold mb-1">Brand Name</h2>
      <h4>
        With every insight we track down, our brand creation pack moves
        in-storytellers and visionaries.
      </h4>
    </div>
  </div>
);

// Row component
const CaseStudyRow = ({ cards, reverse }) => (
  <div
    className={`flex gap-20 h-[70vh] w-full mt-10${
      reverse ? " flex-row-reverse" : ""
    }`}
  >
    {cards.map((card, idx) => (
      <CaseStudyCard key={idx} {...card} />
    ))}
  </div>
);

const MarketingCaseStudy = () => {
  // Card data
  const cardData = [
    [
      {
        imgSrc: "/images/branding-page/img1.png",
        imgHeight: "50%",
        overlayColor: "bg-[#BC80BB]",
      },
      {
        imgSrc: "/images/branding-page/img1.png",
        imgHeight: "80%",
        overlayColor: "bg-[#669ACA]",
      },
    ],
    [
      {
        imgSrc: "/images/branding-page/img1.png",
        imgHeight: "50%",
        overlayColor: "bg-[#BC80BB]",
      },
      {
        imgSrc: "/images/branding-page/img1.png",
        imgHeight: "80%",
        overlayColor: "bg-[#669ACA]",
      },
    ],
  ];

  return (
    <div className="relative z-10 px-30 min-h-screen">
      <div className="flex justify-between items-end ">
        <h2 className="text-7xl">
          <span className="font-semibold ">Case</span> <br /> Study
        </h2>
        <p className="w-[50%] leading-[1.3]">
          With every insight we track down, our brand creation pack moves
          in-storytellers and visionaries who make your brand spark emotion and
          forge lasting connections.
        </p>
      </div>
      <CaseStudyRow cards={cardData[0]} />
      <CaseStudyRow cards={cardData[1]} reverse />
    </div>
  );
};

export default MarketingCaseStudy;

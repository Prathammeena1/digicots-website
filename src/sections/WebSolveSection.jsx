import React from "react";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";

const cardData = [
  {
    img: "/final-images/web/img4.png",
    title: "Wordpress Expert",
    desc: "more than 500 sites developed",
  },
  {
    img: "/final-images/web/img5.png",
    title: "Wordpress Expert",
    desc: "more than 500 sites developed",
  },
  {
    img: "/final-images/web/img6.png",
    title: "Wordpress Expert",
    desc: "more than 500 sites developed",
  },
];

const WebSolveSection = () => {
  return (
    <div className=" min-h-screen py-10 px-0">
      <div className="mx-auto flex flex-col lg:flex-row gap-0">
        {/* Right Content */}
        <div className="w-full  flex flex-col justify-center px-8">
          <div className="pt-8 w-full  text-right flex flex-col items-end pb-6">
            <h1 className="text-6xl lg:text-7xl font-light mb-6">
              <TextAnimH1>
                We <span className="font-bold">Solve</span> Problem
              </TextAnimH1>
            </h1>
            <p className="text-gray-300 text-lg mb-8 w-[50%]">
              <TextAnimP1>
                New to the wild? Or back on the hunt? We’re a brand creation
                agency with the instincts of a wolf—strategic, relentless, and
                loyal to your success. We track, research, and craft strategies
                that make you own your territory.
              </TextAnimP1>
            </p>
            <TextAnimP1>
              <Button>
                Get in touch
              </Button>
            </TextAnimP1>
          </div>

          {/* Cards Row */}
          <div className="flex flex-row gap-[10vw] justify-center">
            {cardData.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#232323] rounded-xl overflow-hidden w-[260px] h-[340px] flex flex-col justify-end relative shadow-lg"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="absolute top-0 left-0 w-full h-full object-cover z-0"
                  style={{ borderRadius: "16px" }}
                />
                <div className="relative z-10 p-6 flex flex-col justify-end h-[80%] bg-gradient-to-t from-black/80 to-transparent">
                  <div className="mb-4 w-[15%]">
                    <img src="/final-images/utils/cellphone.png" alt="" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-md">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebSolveSection;

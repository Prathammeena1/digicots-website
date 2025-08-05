import React from "react";

const AboutFifthSection = () => {
  const creators = [
    [
      {
        id: 1,
        name: "Moulik Saxena",
        role: "Co-Founder",
        image: "/images/man1.png", // Replace with actual image path
        isHighlighted: false,
      },
      {
        id: 2,
        name: "Amit Kumar",
        role: "Co-Founder",
        image: "/images/man2.png", // Replace with actual image path
        isHighlighted: true,
      },
      {
        id: 3,
        name: "Pratham Meena",
        role: "Full-Stack Developer",
        image: "/images/man3.png", // Replace with actual image path
        isHighlighted: false,
      },
    ],
    [
      {
        id: 1,
        name: "Moulik Saxena",
        role: "Co-Founder",
        image: "/images/man1.png", // Replace with actual image path
        isHighlighted: false,
      },
      {
        id: 2,
        name: "Amit Kumar",
        role: "Co-Founder",
        image: "/images/man2.png", // Replace with actual image path
        isHighlighted: true,
      },
      {
        id: 3,
        name: "Pratham Meena",
        role: "Full-Stack Developer",
        image: "/images/man3.png", // Replace with actual image path
        isHighlighted: false,
      },
    ],
  ];

  return (
    <div className="h-[200vh]  w-full relative text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Content Container */}
        <div className="">
          {/* Top Side - Text Content */}
          <div className="flex w-full items-center justify-between mb-10">
            <div className="w-fit">
              <h2 className="text-6xl lg:text-7xl font-bold leading-[1] mt-2">
                Our Fundamental
                <br />
                <span className="text-white">Creators</span>
              </h2>
            </div>

            <div className="w-fit">
              <p className="text-lg text-gray-300 leading-[1.6]">
                We craft data-driven strategies aligned with <br /> your goals
                to drive growth and keep you <br /> competitive in a changing
                market. To drive <br /> growth and keep you competitive.
              </p>
            </div>
          </div>

          {/* Bottom Side - Creators Grid */}
          {creators.map((arr) => {
            return (
              <>
                <div className="flex justify-between">
                  {arr.map((c , i) => {
                    return (
                        <>
                            <div 
                                className="card h-[65vh] w-fit relative overflow-hidden" 
                                key={c.id}
                                style={{ marginTop: `${i * 4}rem` }}
                            >
                                <div className="img">
                                    <img
                                        src={c.image}
                                        alt={c.name}
                                        className="w-[22vw] h-full object-cover rounded-lg"
                                    />
                                    <div className="content ">
                                        <p className="text-lg text-gray-300">
                                            {c.role}
                                        </p>
                                        <h3 className="text-2xl font-semibold">
                                            {c.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutFifthSection;

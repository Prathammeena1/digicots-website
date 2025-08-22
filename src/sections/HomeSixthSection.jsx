import gsap from "gsap";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";
import TwistedTextEffect from "../components/TwistedTextEffect";

const HomeSixthSection = () => {
  // State variable containing all approach data
  const approachSteps = [
    {
      id: 1,
      stepNumber: "STEP 1",
      title: "Discovery & Vision Sync",
      image: "/images/approach1.png",
      description: `We sniff out every detail, dig deep into your goals, your challenges, your hidden potential.`,
      d2: `Your vision becomes our obsession.`,
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fallbackText: "Office Scene",
    },
    {
      id: 2,
      stepNumber: "STEP 2",
      title: "Strategy & Creativity ",
      image: "/images/approach2.png",
      description: `We design systems that cut through the noise and help us predict the next big opportunity.`,
      d2: `Our instinct is your advantage.`,
      fallbackGradient:
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      fallbackText: "Creative Scene",
    },
    {
      id: 3,
      stepNumber: "STEP 3",
      title: "Set the Pack in Motion",
      image: "/images/approach3.png",
      description: `We create workflows that adapt, endure and drive momentum balancing creativity & practicality.`,
      d2: `Our duality gives you the edge.`,
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fallbackText: "Team Results",
    },
  ];
  // Refs for the screens
  const screen1Ref = React.useRef(null);
  const screen2Ref = React.useRef(null);

  const navigate = useNavigate();

  // Function to handle image error and set fallback
  const handleImageError = (e, step) => {
    e.target.style.background = step.fallbackGradient;
    e.target.style.display = "flex";
    e.target.style.alignItems = "center";
    e.target.style.justifyContent = "center";
    e.target.innerHTML = `<div class="text-white text-lg font-bold">${step.fallbackText}</div>`;
  };

  const handleClick = (step) => {
    gsap.fromTo(
      screen1Ref.current,
      {
        top: "-50%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
      },
      {
        top: "0%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
      }
    );
    gsap.fromTo(
      screen2Ref.current,
      {
        top: "100%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
      },
      {
        top: "50%",
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.2,
        onComplete: () => {
          navigate(`/approach/${step}`);
          //   gsap.to(screen1Ref.current, {
          //     top: "100%",
          //     duration: 1.6,
          //     ease: "power3.inOut",
          //     delay: 0.2,
          //   });
          //   gsap.to(screen2Ref.current, {
          //     top: "100%",
          //     duration: 1.6,
          //     ease: "power3.inOut",
          //     delay: 0.2,
          //   });
        },
      }
    );
  };

  return (
    <div className="bg-transparent pt-10 relative overflow-hidden ">
      <div className="fixed z-20 ">
        <div
          ref={screen1Ref}
          className="screen1 top-[-50%] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
        ></div>
        <div
          ref={screen2Ref}
          className="screen2 top-[100%] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
        ></div>
      </div>
      <div className="relative z-10 mx-auto ">
        {/* Main heading */}
        <div className="text-center mt-10 px-30">
          <div className="text-center">
            <h2 className="dark:text-white  text-6xl md:text-7xl font-bold tracking-wide mb-5 capitalize">
              The alpha edge
            </h2>
            <h2 className="dark:text-zinc-200 text-center font-semibold text-3xl w-full">
              Our Alpha Edge represents innovation, precision, and relentless
              drive that empowers businesses to lead, adapt, and thrive in a
              competitive digital world.
            </h2>
          </div>
        </div>

        <TwistedTextEffect />

        {/* Dynamic steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-160 px-30">
          {approachSteps.map((step) => (
            <div key={step.id} className="relative">
              <TextAnimP1>
                {/* <div className="mb-6">
                  <span className="dark:text-gray-400 text-sm font-medium tracking-wider uppercase">
                    {step.stepNumber}
                  </span>
                </div> */}

                <h3 className="text-2xl font-semibold mb-6 text-center">
                  {step.title}
                </h3>

                {/* Image container */}
                <div className="relative mb-6 overflow-hidden h-54">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, step)}
                  />
                </div>

                <p className="dark:text-gray-300 text-md text-center">
                  {step.description}
                </p>
                <p className="dark:text-gray-300 text-md text-center">
                  {step.d2}
                </p>

                <Button
                  onClick={() => handleClick(step.id)}
                  className=" font-medium w-full pointer-events-auto mt-6 cursor-pointer"
                >
                  SEE HOW
                </Button>
              </TextAnimP1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSixthSection;

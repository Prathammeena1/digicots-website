import gsap from "gsap";
import React from "react";
import { useNavigate } from "react-router-dom";
import TextAnimH1 from "../components/TextAnimH1";
import TextAnimP1 from "../components/TextAnimP1";
import Button from "../components/Button";

const HomeSixthSection = () => {
  // State variable containing all approach data
  const approachSteps = [
    {
      id: 1,
      stepNumber: "STEP 1",
      title: "Smell the Wind ",
      image: "/images/approach1.png",
      description:
        "We sniff out every detail, dig deep – your goals, your challenges, your hidden opportunities.",
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fallbackText: "Office Scene",
    },
    {
      id: 2,
      stepNumber: "STEP 2",
      title: "Sharpen the Claws",
      image: "/images/approach2.png",
      description:
        "We craft systems that are precise, powerful and purpose-driven.",
      fallbackGradient:
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      fallbackText: "Creative Scene",
    },
    {
      id: 3,
      stepNumber: "STEP 3",
      title: "Set the Pack in Motion",
      image: "/images/approach3.png",
      description:
        "We balance creativity with practicality – our duality gives you the edge.",
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
    <div className="bg-transparent min-h-screen py-10 px-30 relative overflow-hidden pointer-events-none">
      <div className="fixed z-20">
        <div
          ref={screen1Ref}
          className="screen1 top-[-50%] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
        ></div>
        <div
          ref={screen2Ref}
          className="screen2 top-[100%] h-[50vh] w-screen left-0 right-0 z-20 fixed bg-black"
        ></div>
      </div>
      <div className="relative z-10 mx-auto">
        {/* Main heading */}
        <div className="text-center my-10">
          <h2 className="dark:text-white text-6xl md:text-7xl font-bold tracking-wide">
            <TextAnimH1>THE ALPHA EDGE</TextAnimH1>
          </h2>
        </div>

        {/* Dynamic steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {approachSteps.map((step) => (
            <div key={step.id} className="relative">
              <div className="mb-6">
                <span className="dark:text-gray-400 text-sm font-medium tracking-wider uppercase">
                  <TextAnimP1>{step.stepNumber}</TextAnimP1>
                </span>
              </div>

              <h3 className="dark:text-white text-2xl md:text-3xl font-bold mb-6">
                <TextAnimP1>{step.title}</TextAnimP1>
              </h3>

              {/* Image container */}
              <div className="relative mb-6 overflow-hidden h-54">
                <TextAnimP1>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, step)}
                  />
                </TextAnimP1>
              </div>

              <TextAnimP1>
              <p className="dark:text-gray-300 text-sm leading-relaxed text-center mb-8">
                {step.description}
              </p>

                <Button
                  onClick={() => handleClick(step.id)}
                  className=" font-medium w-full pointer-events-auto"
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

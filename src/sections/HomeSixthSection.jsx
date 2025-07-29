import gsap from "gsap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useApproachAnimation } from "../context/ApprachAnimationContext";

const HomeSixthSection = () => {
  // State variable containing all approach data
  const approachSteps = [
    {
      id: 1,
      stepNumber: "STEP 1",
      title: "Customised Approach",
      image: "/images/approach1.png",
      description:
        "We thoroughly analyse your needs to crate digital solution that reflect the essences of your brand and meet your needs with your specific objectives.",
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fallbackText: "Office Scene",
    },
    {
      id: 2,
      stepNumber: "STEP 2",
      title: "Innovative & Creativity",
      image: "/images/approach2.png",
      description:
        "We use modern technology and creative design to develop unique digital experiences that stand out in a competitive market.",
      fallbackGradient:
        "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)",
      fallbackText: "Creative Scene",
    },
    {
      id: 3,
      stepNumber: "STEP 3",
      title: "Measurable Results",
      image: "/images/approach3.png",
      description:
        "We focus on delivering tangible results, optimising each project to ensure a return on investment that drives your growth.",
      fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fallbackText: "Team Results",
    },
  ];
  // Refs for the screens
  const { screen1Ref, screen2Ref } = useApproachAnimation();

  console.log(screen1Ref.current, screen2Ref.current);

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
        duration: .8,
        ease: "power2.inOut",
        delay: 0.2,
      },
      {
        top: "0%",
        duration: .8,
        ease: "power2.inOut",
        delay: 0.2,
      }
    );
    gsap.fromTo(
      screen2Ref.current,
      {
        top: "100%",
        duration: .8,
        ease: "power2.inOut",
        delay: 0.2,
      },
      {
        top: "50%",
        duration: .8,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: () => {
          navigate(`/approach/${step}`);
          gsap.to(screen1Ref.current, {
            top: "100%",
            duration: 1.6,
            ease: "power2.inOut",
            delay: 0.2,
          });
          gsap.to(screen2Ref.current, {
            top: "-50%",
            duration: 1.6,
            ease: "power2.inOut",
            delay: 0.2,
          });
        },
      }
    );
  };

  return (
    <div className="bg-transparent min-h-screen py-10 px-8 relative overflow-hidden pointer-events-none">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main heading */}
        <div className="text-center my-10">
          <h2 className="text-white text-6xl md:text-7xl font-bold tracking-wide">
            APPROACH
          </h2>
        </div>

        {/* Dynamic steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {approachSteps.map((step) => (
            <div key={step.id} className="relative">
              <div className="mb-6">
                <span className="text-gray-400 text-sm font-medium tracking-wider uppercase">
                  {step.stepNumber}
                </span>
              </div>

              <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
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

              <p className="text-gray-300 text-sm leading-relaxed text-center mb-8">
                {step.description}
              </p>

              <button
                onClick={() => handleClick(step.id)}
                className="border text-sm cursor-pointer pointer-events-auto border-gray-500 text-gray-400 px-8 py-3 rounded-full hover:bg-gray-500 hover:text-white transition-colors duration-300 font-medium w-full"
              >
                SEE HOW
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSixthSection;

import React, { useState } from "react";
import MySwiper from "../components/MySwiper";

const HomeNinthSection = () => {
  const [currentSlide, setCurrentSlide] = useState(85);
  const totalSlides = 156;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Image container with blue border */}
      <div className="w-full  h-[75vh] bg-transparent flex items-center justify-center mb-8 absolute top-[22vh] px-16 ">
        <img
          src="/images/service6.png"
          className="object-cover w-full h-full brightness-50"
          alt=""
        />
      </div>
      {/* Content */}
      <div className="relative z-10 h-full px-16">
        {/* Heading */}
        <h1 className="text-white text-5xl font-bold text-center mt-20">
          Customer Feedback
        </h1>

        {/* Card */}
        <MySwiper />
      </div>
    </div>
  );
};

export default HomeNinthSection;

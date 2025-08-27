import React, { useState } from "react";
import MySwiper from "../components/MySwiper";
import HomeSliderCxFeedback from "../components/HomeSliderCxFeedback";

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
    <div className="w-full pt-20 relative overflow-hidden pointer-events-none text-white">
     
      <HomeSliderCxFeedback />
    </div>
  );
};

export default HomeNinthSection;

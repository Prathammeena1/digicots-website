// src/components/MySwiper.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import "./MySwiper.css";

const MySwiper = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [swiperRef, setSwiperRef] = useState(null);
  const totalSlides = 5;

  const nextSlide = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };

  return (
    <div className="relative mt-[26vh]">
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
        loop={true}
        spaceBetween={-100}
        slidesPerView={1.5}
        centeredSlides={true}
        className="mySwiper"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide key={i} className="swiper-slide-custom">
            <div className="slide-content bg-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-5 w-full flex h-[45vh] transition-all duration-300">
              <div className="w-[45%] flex flex-col justify-between p-2">
                {/* Logo */}
                <div className="flex items-center mb-6 mt-20">
                  <h2 className="text-white text-5xl font-bold">verbo</h2>
                  <div className="ml-2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  </div>
                </div>

                {/* User profile */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="/images/profile-placeholder.jpg"
                      alt="Vijay Adhikari"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM2MzYzNjMiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyMCIgcj0iOCIgZmlsbD0iI0FBQUFBQSIvPgo8cGF0aCBkPSJNOCAzNmMwLTggOC04IDE2LThzMTYgMCAxNiA4IiBmaWxsPSIjQUFBQUFBIi8+Cjwvc3ZnPgo=";
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">
                      Vijay Adhikari
                    </h4>
                    <p className="text-white/60 text-sm">Client</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-black/20 backdrop-blur-sm rounded-lg w-full ">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#FFD700"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-white/90 leading-[1.8] mb-6 text-xs tracking-wider">
                  Digicots is a reliable digital agency delivering creative
                  solutions with professionalism and efficiency. Their team is
                  responsive, innovative, and focused on results. A great
                  partner for digital growth and branding.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
    
    {/* Custom Navigation Controls */}
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* Previous button */}
      <button
        onClick={prevSlide}
        className="text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      {/* Slide counter */}
      <span className="text-white/70 text-lg">
        {currentSlide} of {totalSlides}
      </span>

      {/* Next button */}
      <button
        onClick={nextSlide}
        className="text-white/70 hover:text-white transition-colors cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        </svg>
      </button>
    </div>
  </div>
  );
};

export default MySwiper;

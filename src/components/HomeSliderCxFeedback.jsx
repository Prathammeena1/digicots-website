import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import TextAnimP1 from "./TextAnimP1";

const slides = [
  {
    text: `Digicots knows how to strike a balance among knowledge, humor & relatability.
They really know how to keep our viewers engaged.`,
    name: "Glocal Edits",
    role: "VP of Product, Wealth",
  },
  {
    text: `It feels like having a team that can flawlessly harmonize with our vision, mission and values.
They thoroughly understand how we want the world to see us; and they make it happen.`,
    name: "Head Field Solutions",
    role: "Head of Marketing",
  },
  {
    text: `The design sense perfectly aligns with the vision we have.
Having Digicots is like having a therapist who gets you.`,
    name: "Taste & Beyond",
    role: "Product Manager",
  },
  {
    text: `They are data-driven and that is where our visions align.
Their ability to blend data, tech & creativity is truly exceptional.`,
    name: "ArtifiQ ",
    role: "CEO, TechNova",
  },
  {
    text: `It is phenomenal how easily they dive into details and grab the gap.
    They really do know when, where and how to strike.`,
    name: "Glocal BPO",
    role: "CEO, Glocal BPO",
  },
];

export default function HomeSliderCxFeedback() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setFade(true);
    }, 200);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(true);
    }, 200);
  };

  const { text, name, role } = slides[current];

  return (
    <TextAnimP1>
      <div className="pointer-events-none text-white flex items-center justify-center px-30">
        <div className="w-full py-10 relative flex min-h-[50vh] justify-between items-start">
          <div
            className={`transition-opacity duration-300 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Text */}
            <p className="text-xl sm:text-2xl font-semibold md:max-w-xl ">
              “{text}”
            </p>

            {/* Author */}
            <div className="mt-6">
              <p className="font-semibold">{name}</p>
              <p className="text-gray-400 text-sm">{role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="transform flex gap-3">
            <button
              onClick={prevSlide}
              className="bg-transparent p-2 hover:opacity-75 transition pointer-events-auto cursor-pointer"
            >
              <BsArrowLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent p-2 hover:opacity-75 transition pointer-events-auto cursor-pointer"
            >
              <BsArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </TextAnimP1>
  );
}

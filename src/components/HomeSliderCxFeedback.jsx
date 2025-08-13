import { useState, useEffect } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const slides = [
    {
        text: `We needed a partner who saw our vision and pushed us to new levels, from ideation to implementation. Clay's deep bench of athletes and expertise allowed us to deliver on target early on and scale for future expansion.`,
        name: "Hanna Byers",
        role: "VP of Product, Wealth",
    },
    {
        text: `Clay's collaborative approach and creative thinking were instrumental in helping us achieve our product goals on time and with exceptional quality.`,
        name: "John Smith",
        role: "Head of Marketing",
    },
    {
        text: `From strategy to execution, Clay provided the guidance and expertise we needed to excel in a highly competitive market.`,
        name: "Sarah Johnson",
        role: "Product Manager",
    },
    {
        text: `The team's dedication and professionalism exceeded our expectations. We look forward to working together again.`,
        name: "Michael Brown",
        role: "CEO, TechNova",
    },
    {
        text: `Clay's ability to understand our vision and turn it into reality made all the difference in our project's success.`,
        name: "Emma Wilson",
        role: "CTO, FinEdge",
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
        <div className="pointer-events-none text-white flex items-center justify-center min-h-screen">
            <div className="w-6xl xl:w-8xl px-6 py-10 relative flex min-h-[50vh] justify-between items-start">
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
    );
}

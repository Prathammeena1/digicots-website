import gsap from 'gsap';
import React from 'react'


const approachSteps = [
    {
        id: 1,
        stepNumber: "STEP 1",
        title: "Discovery & Vision Sync",
        image: "/final-images/approach/s1.webp",
        description: `We sniff out every detail, dig deep into your goals, your challenges, your hidden potential.`,
        d2: `Your vision becomes our obsession.`,
        fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fallbackText: "Office Scene",
    },
    {
        id: 2,
        stepNumber: "STEP 2",
        title: "Strategy & Creativity ",
        image: "/final-images/approach/s2.webp",
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
        image: "/final-images/approach/s3.webp",
        description: `We create workflows that adapt, endure and drive momentum balancing creativity & practicality.`,
        d2: `Our duality gives you the edge.`,
        fallbackGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fallbackText: "Team Results",
    },
];
const HomeApproachSection = () => {


    const [currentStep, setCurrentStep] = React.useState(0);
    const card1 = React.useRef(null);
    const card2 = React.useRef(null);
    const card3 = React.useRef(null);

    const clickHandler = (step, e) => {
        setCurrentStep(step);
        // Animate cards with GSAP
        if (step === 0) {
            gsap.to(card1.current, { x: "-100%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card2.current, { x: "-50%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card3.current, { x: "0%", duration: 0.6, ease: "power3.inOut" });
        }
        if (step === 1) {
            gsap.to(card1.current, { x: "-150%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card2.current, { x: "-50%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card3.current, { x: "0%", duration: 0.6, ease: "power3.inOut" });
        }
        if (step === 2) {
            gsap.to(card1.current, { x: "-150%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card2.current, { x: "-100%", duration: 0.6, ease: "power3.inOut" });
            gsap.to(card3.current, { x: "0%", duration: 0.6, ease: "power3.inOut" });
        }
    }


    return (
        <div className='min-h-screen py-10 w-full flex px-30 relative overflow-hidden pointer-events-auto'>
            <div ref={card1} onClick={(e) => clickHandler(0, e)} className='absolute top-0 left-1/2 -translate-x-[100%] z-30 h-[100vh] w-[42.5%] bg-black shadow-white/6 shadow-[30px_0px_40px] text-white space-y-4 py-10 pr-6'>
                <div className='text-zinc-600 font-semibold text-md '>
                    {approachSteps[0].stepNumber}
                </div>
                <div className='font-bold text-4xl'>
                    {approachSteps[0].title}
                </div>
                <div className='text-md w-[80%] opacity-60 mb-10'>
                    {approachSteps[0].description}
                </div>
                <div className='h-full w-full relative overflow-hidden'>
                    <img className='h-full w-full object-cover' src={approachSteps[0].image} alt="" />
                </div>
            </div>
            <div ref={card2} onClick={(e) => clickHandler(1, e)} className='absolute top-0 left-1/2 -translate-x-1/2 z-20 h-[100vh] w-[42.5%] bg-black shadow-white/6 shadow-[30px_0px_40px] text-white space-y-4 py-10 pr-6'>
                <div className='text-zinc-600 font-semibold text-md pl-10 '>
                    {approachSteps[1].stepNumber}
                </div>
                <div className='font-bold text-4xl pl-10'>
                    {approachSteps[1].title}
                </div>
                <div className='text-md w-[80%] opacity-60 mb-10 pl-10'>
                    {approachSteps[1].description}
                </div>
                <div className='h-full w-full relative overflow-hidden'>
                    <img className='h-full w-full object-cover' src={approachSteps[1].image} alt="" />
                </div>
            </div>
            <div ref={card3} onClick={(e) => clickHandler(2, e)} className='absolute top-0 left-1/2  z-10 h-[100vh] w-[42.5%] bg-black  text-white space-y-4 py-10 pr-6'>
                <div className='text-zinc-600 font-semibold text-md pl-10 '>
                    {approachSteps[2].stepNumber}
                </div>
                <div className='font-bold text-4xl pl-10'>
                    {approachSteps[2].title}
                </div>
                <div className='text-md w-[80%] opacity-60 mb-10 pl-10'>
                    {approachSteps[2].description}
                </div>
                <div className='h-full w-full relative overflow-hidden'>
                    <img className='h-full w-full object-cover' src={approachSteps[2].image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HomeApproachSection
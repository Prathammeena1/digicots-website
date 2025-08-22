import React from "react";

const CaseStudy = () => {
  return (
    <>
      <div className="h-[80vh] w-full">
        {/* Background Image - Futuristic Portrait */}
        <div className="w-[70%] h-[60vh] relative">
          <img
            src="https://images.unsplash.com/photo-1635003913011-95971abba560"
            alt="Futuristic portrait of person with tech elements"
            className="object-cover w-full h-full object-top"
          />
          {/* Case Study Button - Top Right */}
          <div className="absolute top-5 right-5">
            <button className="border border-white/20 rounded-full px-6 py-2 text-white/90 text-sm hover:bg-white/10 transition-all duration-300">
              Case Study
            </button>
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-b from-[#2d1e30]/50 to-[#2d1e30]/90"></div> */}
        </div>

        {/* Content Container */}
        <div className=" inset-0 flex flex-col py-10 justify-end pointer-events-auto">
          {/* Bottom Content */}

          <div className="flex items-center justify-between gap-4 w-[70%]">
            <div className="flex flex-col w-[80%]">
              {/* Title Area */}
              <div className="flex items-end mb-6">
                <h2 className="text-4xl font-bold dark:text-white mr-4">
                  The Varallo Group
                </h2>
                <span className="dark:text-zinc-200 text-xl">|</span>
                <span className="dark:text-zinc-200 text-xl ml-4">
                  Immersive, 3D
                </span>
              </div>
              {/* Description */}
              <p className="dark:text-gray-300 text-zinc-600 text-md w-[70%]">
                The force della knowledge, the impact della creativity, the
                technology. With the consulting of marketing and commu of Quamm,
                the value del your business grows in the tempo.
              </p>
            </div>

            {/* View Project Button */}
            <div className="w-18 h-18">
              {/* <button className="group flex items-center space-x-2 text-white hover:text-white/80 transition-colors"> */}
              <img
                src="/images/arrow.png"
                className="h-full w-full object-contain"
                alt=""
              />
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ServicesSectionOtherSections3 = () => {
  return (
    <div className="px-30 min-h-screen relative z-20 py-20 space-y-20 bg-white">
      <CaseStudy />
      <CaseStudy />
      <CaseStudy />
    </div>
  );
};

export default ServicesSectionOtherSections3;

// <div
//   ref={section2Ref}
//   className="top-0 absolute h-[300vh] w-full z-10"
//   style={{ cursor: "none" }}
// >
//   <div className="flex items-center justify-between h-screen px-16 lg:px-24">
//     {/* Left Content */}
//     <div className="w-3/4 dark:text-white h-full  overflow-hidden ">

//       {/* Slider Container */}

//       <div
//         ref={(el) => (section2SubSectionsRef.current[2] = el)}
//         className="h-[100%] w-[80%] relative overflow-hidden"
//       >

//       </div>
//     </div>
//     <div className="w-1/4 flex flex-col items-center justify-center relative">
//       {/* Mouse Follower Circular Button */}
//       <div
//         ref={mouseFollowerRef}
//         className="fixed top-0 left-0 z-50 pointer-events-none"
//         style={{ transform: "translate(50%, 50%)" }}
//       >
//         <div
//           style={{
//             width: 120,
//             height: 120,
//             borderRadius: "50%",
//             border: "2px solid #fff",
//             background: "rgba(100,100,100,0.25)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
//           }}
//         >
//           {/* Left arrow */}
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             style={{
//               position: "absolute",
//               left: 8,
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           >
//             <polygon points="16,6 8,12 16,18" fill="#fff" />
//           </svg>
//           {/* Right arrow */}
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             fill="none"
//             style={{
//               position: "absolute",
//               right: 8,
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           >
//             <polygon points="8,6 16,12 8,18" fill="#fff" />
//           </svg>
//           {/* Center dot */}
//           <div
//             style={{
//               width: 16,
//               height: 16,
//               borderRadius: "50%",
//               background: "#e5e5e5",
//               zIndex: 2,
//             }}
//           />
//         </div>
//       </div>

//       {/* Navigation Progress Dots */}
//       <div className="absolute top-0 right-0 flex flex-col space-y-8 items-center">
//         {/* Section 1 Dot */}
//         <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
//           <span
//             className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
//               activeSection === 0
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-4"
//             }`}
//           >
//             Section 1
//           </span>
//           <div
//             className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
//               activeSection === 0
//                 ? "border-white bg-transparent scale-110"
//                 : activeSection > 0
//                 ? "border-white scale-100 opacity-55"
//                 : "border-gray-600 scale-100"
//             }`}
//           >
//             {/* Progress Circle - Only for active section */}
//             {activeSection === 0 && (
//               <svg
//                 className="absolute inset-0 w-6 h-6 -rotate-90"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="11"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeDasharray={`${2 * Math.PI * 11}`}
//                   strokeDashoffset={`${
//                     2 * Math.PI * 11 * (1 - overallProgress)
//                   }`}
//                   className="transition-all duration-100 ease-out"
//                 />
//               </svg>
//             )}
//             {/* Inner dot */}
//             <div
//               className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
//                 activeSection === 0
//                   ? "bg-white scale-110"
//                   : activeSection > 0
//                   ? "bg-transparent scale-0"
//                   : "bg-gray-500 scale-90"
//               }`}
//             ></div>
//           </div>
//         </div>

//         {/* Section 2 Dot */}
//         <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
//           <span
//             className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
//               activeSection === 1
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-4"
//             }`}
//           >
//             Section 2
//           </span>
//           <div
//             className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
//               activeSection === 1
//                 ? "border-white bg-transparent scale-110"
//                 : activeSection > 1
//                 ? "border-white scale-100 opacity-55"
//                 : "border-gray-600 scale-100"
//             }`}
//           >
//             {/* Progress Circle - Only for active section */}
//             {activeSection === 1 && (
//               <svg
//                 className="absolute inset-0 w-6 h-6 -rotate-90"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="11"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeDasharray={`${2 * Math.PI * 11}`}
//                   strokeDashoffset={`${
//                     2 * Math.PI * 11 * (1 - overallProgress)
//                   }`}
//                   className="transition-all duration-100 ease-out"
//                 />
//               </svg>
//             )}
//             {/* Inner dot */}
//             <div
//               className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
//                 activeSection === 1
//                   ? "bg-white scale-110"
//                   : activeSection > 1
//                   ? "bg-transparent scale-0"
//                   : "bg-gray-500 scale-90"
//               }`}
//             ></div>
//           </div>
//         </div>

//         {/* Section 3 Dot */}
//         <div className="flex items-center space-x-4 transition-all duration-500 ease-in-out">
//           <span
//             className={`text-gray-400 text-sm font-medium tracking-wider transition-all duration-300 ease-in-out transform ${
//               activeSection === 2
//                 ? "opacity-100 translate-x-0"
//                 : "opacity-0 translate-x-4"
//             }`}
//           >
//             Section 3
//           </span>
//           <div
//             className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ease-in-out transform relative ${
//               activeSection === 2
//                 ? "border-white bg-transparent scale-110"
//                 : activeSection > 2
//                 ? "border-white scale-100 opacity-55"
//                 : "border-gray-600 scale-100"
//             }`}
//           >
//             {/* Progress Circle - Only for active section */}
//             {activeSection === 2 && (
//               <svg
//                 className="absolute inset-0 w-6 h-6 -rotate-90"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="11"
//                   fill="none"
//                   stroke="white"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeDasharray={`${2 * Math.PI * 11}`}
//                   strokeDashoffset={`${
//                     2 * Math.PI * 11 * (1 - overallProgress)
//                   }`}
//                   className="transition-all duration-100 ease-out"
//                 />
//               </svg>
//             )}
//             {/* Inner dot */}
//             <div
//               className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out relative z-10 ${
//                 activeSection === 2
//                   ? "bg-white scale-110"
//                   : activeSection > 2
//                   ? "bg-transparent scale-0"
//                   : "bg-gray-500 scale-90"
//               }`}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

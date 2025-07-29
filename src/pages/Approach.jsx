import React, { useEffect } from "react";
import ApproachFirstSection from "../sections/ApproachFirstSection";
import ApproachSecondSection from "../sections/ApproachSecondSection";
import { useApproachAnimation } from "../context/ApprachAnimationContext";
import gsap from "gsap";
import { useNavigate, useParams } from "react-router-dom";

const Approach = () => {
  // Import the context to access the refs
  const { screen1Ref, screen2Ref } = useApproachAnimation();

  const navigate = useNavigate();
  const {id} = useParams();


  // useEffect(() => {
  //   return () => {
  //     if (screen1Ref.current && screen2Ref.current) {
  //       gsap.fromTo(
  //         screen1Ref.current,
  //         {
  //           top: "100%",
  //           duration: 1.6,
  //           ease: "power2.inOut",
  //           delay: 0.2,
  //         },
  //         {
  //           top: "0%",
  //           duration: 1.6,
  //           ease: "power2.inOut",
  //           delay: 0.2,
  //         }
  //       );
  //       gsap.fromTo(
  //         screen2Ref.current,
  //         {
  //           top: "-50%",
  //           duration: 1.6,
  //           ease: "power2.inOut",
  //           delay: 0.2,
  //         },
  //         {
  //           top: "50%",
  //           duration: 1.6,
  //           ease: "power2.inOut",
  //           delay: 0.2,
  //           onComplete: () => {
  //             gsap.to(screen1Ref.current, {
  //               top: "-50%",
  //               duration: .8,
  //               ease: "power2.inOut",
  //               delay: 0.2,
  //             });
  //             gsap.to(screen2Ref.current, {
  //               top: "100%",
  //               duration: .8,
  //               ease: "power2.inOut",
  //               delay: 0.2,
  //               onComplete: () => {
  //                 navigate(`/`);
  //               },
  //             });
  //           },
  //         }
  //       );
  //     }
  //   };
  // }, []);

  return (
    <div className="px-8">
      <ApproachFirstSection />
      <ApproachSecondSection />
    </div>
  );
};

export default Approach;

import ApproachFirstSection from "../sections/ApproachFirstSection";
import ApproachSecondSection from "../sections/ApproachSecondSection";
import { useNavigate, useParams } from "react-router-dom";
import ApproachThirdSection from "../sections/ApproachThirdSection";

const Approach = () => {
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

  const {id} = useParams();
  const step = approachSteps.find((step) => step.id == parseInt(id));



  return (
    <div className="h-full w-full relative pointer-events-none">
      <ApproachFirstSection step={step} />
      <ApproachSecondSection step={step} />
      <ApproachThirdSection step={step} />
    </div>
  );
};

export default Approach;

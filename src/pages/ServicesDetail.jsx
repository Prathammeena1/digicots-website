import React from "react";
import { useLocation, useParams } from "react-router-dom";
import ServicesDetailLanding from "../sections/ServicesDetailLanding";
import ServicesSectionOtherSections from "../sections/ServicesSectionOtherSections";
import ServicesSectionOtherSections2 from "../sections/ServicesSectionOtherSections2";
import ServicesSectionOtherSections3 from "../sections/ServicesSectionOtherSections3";

// Services data array
const servicesData = [
  {
    id: "1",
    title: "Content Creation",
    src: "/final-images/services/Content.webp",
    width: "25vw",
    tags: ["web", "digital", "branding", "marketing", "graphics"],
    subCategories: [
      "sub-Cat 1",
      "sub-Cat 2",
      "sub-Cat 3",
      "sub-Cat 4",
      "sub-Cat 5",
    ],
    description:
      "We craft words and visuals that bite. Content designed to grab attention and keep your audience hooked. From blogs to campaigns, we make every message count.",
    href: "/services/1",
  },
  {
    id: "2",
    title: "Creative & Graphics",
    src: "/final-images/services/Graphic.webp",
    width: "15vw",
    tags: ["branding", "identity", "logo", "design"],
    subCategories: [
      "sub-Cat 1",
      "sub-Cat 2",
      "sub-Cat 3",
      "sub-Cat 4",
      "sub-Cat 5",
    ],
    description:
      "Designs that prowl ahead of trends, combining bold creativity with precision. Every visual tells your story with style and impact.",
    href: "/services/2",
  },
  {
    id: "3",
    title: "Production (Pre-Post)",
    src: "/final-images/services/Production.webp",
    width: "0vw",
    tags: ["marketing", "digital", "social", "strategy"],
    subCategories: [
      "sub-Cat 1",
      "sub-Cat 2",
      "sub-Cat 3",
      "sub-Cat 4",
      "sub-Cat 5",
    ],
    description:
      "From concept to final cut, we bring your ideas to life with cinematic quality. Sharp, sleek, and ready to dominate screens.",
    href: "/services/3",
  },
  {
    id: "4",
    title: "Branding",
    src: "/final-images/services/Branding.webp",
    width: "0vw",
    tags: ["content", "writing", "copywriting", "strategy"],
    subCategories: [
      "sub-Cat 1",
      "sub-Cat 2",
      "sub-Cat 3",
      "sub-Cat 4",
      "sub-Cat 5",
    ],
    description:
      "We build brands with presence and power-identities that stand tall in any market. Strategy meets storytelling in a way they’ll never forget.",
    href: "/services/4",
  },
  {
    id: "5",
    title: "Web & Digital",
    src: "/final-images/services/Web.webp",
    width: "0vw",
    tags: ["production", "video", "photography", "editing"],
    subCategories: [
      "sub-Cat 1",
      "sub-Cat 2",
      "sub-Cat 3",
      "sub-Cat 4",
      "sub-Cat 5",
    ],
    description:
      "Web experiences as smooth as a predator’s stride. Engaging, functional, and built to convert curiosity into loyalty.",
    href: "/services/5",
  },
  {
    id: "6",
    title: "Digital Marketing",
    src: "/final-images/services/Digital.webp",
    width: "0vw",
    tags: ["graphics", "creative", "design", "illustration"],
    subCategories: [],
    description:
      "We hunt for opportunities across the digital landscape. Targeted campaigns that find, attract, and win your ideal audience.",
    href: "/services/6",
  },
];

const ServicesDetail = () => {
  const { id } = useParams();

  return (
    <div className="">
      <div className="h-[70vh] w-full "></div>
      <ServicesDetailLanding
        servicesData={servicesData.find(
          (image) => image.href === `/services/${id}`
        )}
      />
      <ServicesSectionOtherSections />
      <ServicesSectionOtherSections2 />
      <ServicesSectionOtherSections3 />
        

    </div>
  );
};

export default ServicesDetail;

import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ServicesDetailLanding from '../sections/ServicesDetailLanding';



// Services data array
const servicesData = [
  {
    id: "1",
    title: "Content Creation",
    src: "/final-images/services/Content.webp",
    width: "25vw",
    tags: ["web", "digital", "branding", "marketing", "graphics"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/1"
  },
  {
    id: "2",
    title: "Creative & Graphics",
    src: "/final-images/services/Graphic.webp",
    width: "15vw",
    tags: ["branding", "identity", "logo", "design"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/2"
  },
  {
    id: "3",
    title: "Production (Pre-Post)",
    src: "/final-images/services/Production.webp",
    width: "0vw",
    tags: ["marketing", "digital", "social", "strategy"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/3"
  },
  {
    id: "4",
    title: "Branding",
    src: "/final-images/services/Branding.webp",
    width: "0vw",
    tags: ["content", "writing", "copywriting", "strategy"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/4"
  },
  {
    id: "5",
    title: "Web & Digital",
    src: "/final-images/services/Web.webp",
    width: "0vw",
    tags: ["production", "video", "photography", "editing"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/5"
  },
  {
    id: "6",
    title: "Digital Marketing",
    src: "/final-images/services/Digital.webp",
    width: "0vw",
    tags: ["graphics", "creative", "design", "illustration"],
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    href: "/services/6"
  },
];


const ServicesDetail = () => {

    const {id} = useParams();
    console.log(id);

  return (
    <div>
        <ServicesDetailLanding servicesData={servicesData.find(image => image.href === `/services/${id}`)} />
    </div>
  )
}

export default ServicesDetail
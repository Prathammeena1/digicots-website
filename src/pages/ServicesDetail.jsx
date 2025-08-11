import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ServicesDetailLanding from '../sections/ServicesDetailLanding';



// Services data array
const servicesData = [
  {
    id: "01",
    title: "Web & Digital",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service1.png",
    width: "25vw",
    hasBackground: false,
    containerWidth: "w-full",
    tags: ["web", "digital", "branding", "marketing", "graphics"],
    href: "/services/1"
  },
  {
    id: "02",
    title: "Branding",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service2.png",
    width: "15vw",
    hasBackground: false,
    containerWidth: "",
    tags: ["branding", "identity", "logo", "design"],
    href: "/services/2"
  },
  {
    id: "03",
    title: "Digital Marketing",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service3.png",
    width: "10vw",
    hasBackground: true,
    containerWidth: "",
    tags: ["marketing", "digital", "social", "strategy"],
    href: "/services/3"
  },
  {
    id: "04",
    title: "Content Generation",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service4.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "",
    tags: ["content", "writing", "copywriting", "strategy"],
    href: "/services/4"
  },
  {
    id: "05",
    title: "Production (Pre-Post)",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service5.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "",
    tags: ["production", "video", "photography", "editing"],
    href: "/services/5"
  },
  {
    id: "06",
    title: "Creative & Graphics",
    description:
      "The force della knowledge, the impact della creativity, the technology. With the consulting of marketing and.",
    src: "/images/service6.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "w-full",
    tags: ["graphics", "creative", "design", "illustration"],
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
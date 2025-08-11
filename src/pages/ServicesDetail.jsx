import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ServicesDetailLanding from '../sections/ServicesDetailLanding';



const serviceImagesConfig = [
  {
    src: "/images/service1.png",
    width: "25vw",
    hasBackground: false,
    containerWidth: "w-full",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/1"
  },
  {
    src: "/images/service2.png",
    width: "15vw",
    hasBackground: false,
    containerWidth: "",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/2"
  },
  {
    src: "/images/service3.png",
    width: "10vw",
    hasBackground: true,
    containerWidth: "",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/3"
  },
  {
    src: "/images/service4.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/4"
  },
  {
    src: "/images/service5.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/5"
  },
  {
    src: "/images/service6.png",
    width: "0vw",
    hasBackground: true,
    containerWidth: "w-full",
    title: "Web & Digital",
    tags:["web", "digital", "branding", "marketing", "graphics"],
    href:"/services/6"
  },
];



const ServicesDetail = () => {

    const {id} = useParams();
    console.log(id);

  return (
    <div>
        <ServicesDetailLanding imageConfig={serviceImagesConfig.find(image => image.href === `/services/${id}`)} />
    </div>
  )
}

export default ServicesDetail
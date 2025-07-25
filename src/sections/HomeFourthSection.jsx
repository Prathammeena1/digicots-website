import React from 'react'
import HomeFourthSectionCard from '../components/HomeFourthSectionCard'
import HomeFourthSectionCanvas from '../components/HomeFourthSectionCanvas'

const content = [
  {
    title:"Pro-Strategist ",
    imgSrc:"https://plus.unsplash.com/premium_photo-1681400699241-834781696dc6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    h2:"DEVELOPMENT",
    dHead:"Strategies that are tailored to your goals.",
    dParagraph:"We craft data-driven strategies aligned with your goals to drive growth and keep you competitive in a changing market."   
  },
  {
    title:"Pro-Strategist ",
    imgSrc:"https://plus.unsplash.com/premium_photo-1681400699241-834781696dc6?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    h2:"DEVELOPMENT",
    dHead:"Strategies that are tailored to your goals.",
    dParagraph:"We craft data-driven strategies aligned with your goals to drive growth and keep you competitive in a changing market."   
  }
]

const HomeFourthSection = () => {
  return (
    <div className='h-screen w-full bg-black relative overflow-hidden flex items-end justify-center gap-[50vw] px-10 '>
      <HomeFourthSectionCanvas />

      {
        content.map((item, index) => (
          <HomeFourthSectionCard 
            key={index} 
            align={index % 2 === 0 ? "left" : "right"} 
            content={item} 
          />
        ))
      }

    </div>
  )
}

export default HomeFourthSection
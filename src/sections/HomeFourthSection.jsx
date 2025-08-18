import React from 'react'
import HomeFourthSectionCard from '../components/HomeFourthSectionCard'
import HomeFourthSectionCanvas from '../components/HomeFourthSectionCanvas'

const content = [
  {
    title:"Pro-Strategist ",
    imgSrc:"/final-images/gif/1.gif",
    // imgSrc:"/final-images/gif/2.gif",
    h2:"DEVELOPMENT",
    dHead:"Strategies that are tailored to your goals.",
    dParagraph:"We craft data-driven strategies aligned with your goals to drive growth and keep you competitive in a changing market."   
  },
  {
    title:"Pro-Strategist ",
    imgSrc:"/final-images/gif/2.gif",
    h2:"DEVELOPMENT",
    dHead:"Strategies that are tailored to your goals.",
    dParagraph:"We craft data-driven strategies aligned with your goals to drive growth and keep you competitive in a changing market."   
  }
]

const HomeFourthSection = () => {
  return (
    <div className='h-screen w-full bg-black relative overflow-hidden flex items-start justify-center gap-[35vw] px-30 '>
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
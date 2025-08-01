import React from 'react'


const alignment ={
    left:"text-left",
    right:"text-right"
} 

const HomeFourthSectionCard = ({align,content}) => {

  return (
    <div className={`text-white p-8 rounded-lg max-h-[94vh] flex flex-col justify-between min-h-[400px] ${alignment[align]}`}>
      {/* Top section with Pro-Development */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-300">
          Pro-Development
        </h3>
      </div>

      <div className='h-[50vh] w-full'>
        <img src={content.imgSrc} className='object-cover h-full w-full' alt="" />
      </div>



      {/* Bottom section with content */}
      <div className="space-y-4">
        {/* DEVELOPMENT label */}
        <div className={`my-3 ${alignment[align]}`}>
          <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
            DEVELOPMENT
          </span>
        </div>

        {/* Main heading */}
        <h2 className="text-2xl font-bold leading-tight mb-4">
          Solutions that are adapt to your company.
        </h2>

        {/* Description text */}
        <p className="text-gray-300 text-sm leading-relaxed">
          We develop customised systems and solutions that optimise the 
          technological and management processes in your company.
        </p>
      </div>
    </div>
  )
}

export default HomeFourthSectionCard
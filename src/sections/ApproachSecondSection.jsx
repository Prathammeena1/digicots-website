import React from 'react'

const ApproachSecondSection = () => {
  return (
    <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Wolf Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl">
          {/* Wolf Image Container */}
          <img 
            src="/images/approach-wolf.png" 
            alt="" 
            className="object-contain w-full h-full" 
            style={{ 
              mixBlendMode: 'screen',
              filter: 'brightness(.5) contrast(1.5)',
            }} 
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
          Born to Hunt Bold Ideas
        </h1>
        
        <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          <p className="font-medium">
            Our ideas don't follow trends — they set them.
          </p>
          <p>
            Whether it's a disruptive campaign, a bold design system, or a striking narrative,
          </p>
          <p>
            we lead with creativity and sharpen it with innovation.
          </p>
          <p className="font-medium">
            We design with purpose, prototype with courage, and deliver with precision.
          </p>
        </div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  )
}

export default ApproachSecondSection
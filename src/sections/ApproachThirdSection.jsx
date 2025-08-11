import React from 'react'

// Service Card Component
const ServiceCard = ({ image, title, description, logoOrAccent }) => {
  return (
    <div className="flex flex-col max-w-md">
      <div className="relative overflow-hidden mb-6">
        <img 
          src={image} 
          alt={title}
          className="w-full h-[240px] object-cover"
        />
        {logoOrAccent && (
          <div className="absolute top-4 right-4">
            {title === "Brand Systems" ? (
              // Logo for Brand Systems
              <div className="text-white uppercase tracking-widest text-sm">
                AKSARI
                <div className="flex justify-center mt-1">
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                  <div className="w-1 h-1 bg-white rounded-full mx-0.5"></div>
                </div>
              </div>
            ) : (
              // Accent/button for Creative Campaigns
              <div className="px-3 py-2 text-xs font-medium text-black bg-yellow-500">
                DONATE TO MAKE A
                <br />
                DIFFERENCE
              </div>
            )}
          </div>
        )}
        {/* Overlay outline for creative campaigns */}
        {title === "Creative Campaigns" && (
          <div className="absolute inset-0 border-2 border-white/30 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-white/50"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-12 border border-white/50"></div>
          </div>
        )}
      </div>
      <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex items-center">
        <span className="text-white text-xs mr-2">View Services</span>
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
};

const ApproachThirdSection = () => {
  return (
    <div className='min-h-screen w-full bg-zinc-900 pointer-events-auto py-20 relative z-10 px-8 md:px-16 lg:px-24'>
      <div className="container mx-auto">
        {/* Section Title */}
        <h2 className="text-white text-4xl md:text-5xl font-bold mb-16">What We Create</h2>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Service Card 1 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1516110833967-9b9a010c7ce1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            title="Creative Campaigns"
            description="Bold narratives, story-first visuals"
            logoOrAccent={true}
          />
          
          {/* Service Card 2 */}
          <ServiceCard 
            image="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            title="Brand Systems"
            description="Logo, identity, voice — well-drawn & consistent."
            logoOrAccent={true}
          />
        </div>
      </div>
    </div>
  )
}

export default ApproachThirdSection
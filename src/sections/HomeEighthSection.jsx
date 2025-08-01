import React from 'react'
import KineticGrid from '../components/KineticGrid'

const HomeEighthSection = () => {
  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center '>
      <div className="text-center my-10 py-10 relative z-10 pointer-events-none">
          <h2 className="text-zinc-200 text-6xl md:text-7xl font-bold tracking-wide">
            Appreciations For
          </h2>
        </div>
      <KineticGrid />
    </div>
  )
}

export default HomeEighthSection
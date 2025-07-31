import React from 'react'
import ScrollTextMovementEffect from '../components/ScrollTextMovementEffect'
import TwistedTextEffect from '../components/TwistedTextEffect'

const HomeThirdSection = () => {
  return (
    <div className='w-full h-fit relative'>
      {/* <ScrollTextMovementEffect /> */}
      <p className='absolute top-34 left-1/2 -translate-x-1/2 z-30 text-zinc-200 text-center text-3xl '> We Squeeze Out the Best of Global Applied Marketing & Strategy to
          Drive Customer Loyalty</p>

      <TwistedTextEffect />

    </div>
  )
}

export default HomeThirdSection
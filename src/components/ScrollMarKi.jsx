import gsap from 'gsap'
import React, { useEffect } from 'react'

const ScrollMarKi = () => {
    const secRef = React.useRef(null)

    useEffect(()=>{
        gsap
    })


  return (
    <div className='w-full h-20 flex items-center justify-center overflow-hidden'>
        <div ref={secRef} className='whitespace-nowrap' >
            Some Marketing Text Here
        </div>
    </div>
  )
}

export default ScrollMarKi
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react'


gsap.registerPlugin(ScrollTrigger);
const RollingImageEffect = ({children}) => {
    const divRef = React.useRef(null);
    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: divRef.current,
                start: "top 60%",
                end: "top 40%",
                scrub: true,
            }
        })

        tl.fromTo(divRef.current, { width: '100%' }, {width:0, duration: 1 });

    },[divRef.current])

  return (
    <div className='h-full w-full relative overflow-hidden'>
        <div ref={divRef} className='w-full h-full absolute top-0 left-0 bg-black pointer-events-none'>

        </div>

        {children}
    </div>
  )
}

export default RollingImageEffect
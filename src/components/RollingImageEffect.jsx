import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react'


gsap.registerPlugin(ScrollTrigger);
const RollingImageEffect = ({children,direction = "horizontal",align="left"}) => {
    const divRef = React.useRef(null);
    useGSAP(()=>{
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: divRef.current,
                start: "top 60%",
                end: "top 40%",
                // scrub: true,
            }
        })

        if (direction === "horizontal") {
            tl.fromTo(divRef.current, { x: 0, alignSelf: align }, {x: align === "right" ? "100%" : "-100%", duration: 1.5, ease: "power3.inOut" });
        } else {
            tl.fromTo(divRef.current, { height: '100%', alignSelf: align }, {height:0, duration: 1.5, ease: "power3.inOut" });
        }

    },[divRef.current])

  return (
    <div className='h-full w-full relative overflow-hidden'>
        <div ref={divRef} className='w-full h-full absolute top-0 left-0 bg-black pointer-events-none z-30'>

        </div>

        {children}
    </div>
  )
}

export default RollingImageEffect
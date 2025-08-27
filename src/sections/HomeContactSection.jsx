import React from 'react'
import Button from '../components/Button';

const HomeContactSection = () => {
    return (
        <div className='flex px-30 items-center justify-between text-white py-20'>
            <div className='h-[70vh] w-[40vw] '>
                <img src="/final-images/gif/ai.gif" className='h-full w-full object-contain' alt="" />
            </div>

            <div className='h-[40vh] w-[40vw] space-y-5 '>
                <div className="">
                    <h3 className='text-md text-zinc-500 font-semibold'>DIGICOTS</h3>
                    <h1 className="text-4xl font-bold ">
                        Applied Artificial Intelligence <br />
                        to build customer loyalty.
                    </h1>
                </div>
                <div className="">
                    <p className="text-md text-zinc-200">We boost your online presence with digital marketing strategies that connect with your audience and maximise your engagement.</p>
                </div>
                <div>
                    <h2 className='text-md font-semibold'>Objectives Achieved</h2>
                </div>
                <Button>Get in touch</Button>

            </div>
        </div>
    )
}


export default HomeContactSection;
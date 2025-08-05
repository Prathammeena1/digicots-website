import React from 'react'

const AboutThirdSection = () => {
return (
    <div className='section h-screen w-full text-white px-8 pt-16'>
        <div className='max-w-7xl mx-auto'>
            {/* Our Core Values Section */}
            <div className='border-t border-gray-400/[.9] mt-10 py-16'>
                <div className='flex flex-col lg:flex-row items-start justify-between gap-12'>
                    <div className='lg:w-1/2'>
                        <h2 className='text-7xl font-semibold'>
                            Our Core
                            <br />
                            Values
                        </h2>
                    </div>
                    <div className='lg:w-1/2'>
                        <p className='text-lg leading-relaxed text-gray-300'>
                            The force della knowledge, the impact della creativity, the 
                            pervasiveness della technology. With the consulting of 
                            marketing and communication of Quamm, the value del 
                            your business grows in the tempo. The force della 
                            knowledge, the impact della creativity.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Commitment Section */}
            <div className='py-16 border-t border-gray-400/[.9] '>
                <div className='flex flex-col items-start justify-between gap-12'>
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='text-7xl font-semibold mb-1'>
                            Our Commitment
                        </h2>
                        <div className=''>
                            <p className='text-lg text-zinc-400 leading-[1.1]'>
                                Only the best in
                                <br />
                                their field
                            </p>
                        </div>
                    </div>
                    <div className='relative'>
                        <p className='text-lg leading-relaxed text-gray-300 mb-8 indent-16'>
                             The force della knowledge, the impact della creativity, the pervasiveness della technology. With the consulting of
                            marketing and communication of Quamm, the value del your business grows in the tempo. The force della knowledge,
                            the impact della creativity, the pervasiveness della technology. With the consulting of marketing and communication of 
                            Quamm, the value del your business grows in the tempo.
                        </p>                 
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default AboutThirdSection
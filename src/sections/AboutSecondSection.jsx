import React, { useRef, useEffect } from 'react'

const AboutSecondSection = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    const sectionElement = sectionRef.current;

    if (!videoElement || !sectionElement) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when section comes into view
            videoElement.play().catch((error) => {
              console.log('Video autoplay failed:', error);
            });
            
            // Disconnect observer after first play to ensure it only plays once
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px'
      }
    );

    // Start observing the section
    observer.observe(sectionElement);

    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className='section h-screen w-full flex items-center justify-center'
    >
       <div className='w-[80%] h-full overflow-hidden'>
         <video 
          ref={videoRef}
          src="/videos/aboutSection2.mp4" 
          className="object-contain h-full w-full scale-[1.1]"
          muted
          playsInline
          preload="metadata"
        />
       </div>
    </div>
  )
}

export default AboutSecondSection
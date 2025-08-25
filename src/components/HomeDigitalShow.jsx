import React from "react"
import { BiArrowFromLeft } from "react-icons/bi";
import { MdArrowRightAlt } from "react-icons/md";

function SocialMediaCard() {
  return (
    <div className="h-full w-[400px] shrink-0">
      <div className="h-[75%] w-full overflow-hidden">
        <img src="/final-images/services/Branding.webp" alt="" />
      </div>
      <div className="">
        <h2 className="text-xl">Head</h2>
        <p className="text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas veniam
          accusamus voluptas?
        </p>
      </div>
      <div className="flex items-center gap-3 ">
        <h3>View All</h3>
        <img className="h-2 object-contain relativen z-10 " src="/final-images/utils/long-arrow.png" alt="" />
        {/* <MdArrowRightAlt /> */}
      </div>
    </div>
  );
}


const HomeDigitalShow = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    console.log("Horizontal scroll component mounted");

    const onWheel = (e) => {
      // Only scroll horizontally if overflow is possible
      if (container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        
        // Smooth scrolling with momentum
        const scrollAmount = e.deltaY;
        container.scrollLeft += scrollAmount;
        
        // Optional: Add smooth scrolling behavior
        container.style.scrollBehavior = 'smooth';
        
        // Reset scroll behavior after a short delay
        setTimeout(() => {
          container.style.scrollBehavior = 'auto';
        }, 100);
      }
    };

    // Add wheel event listener with passive: false to allow preventDefault
    container.addEventListener('wheel', onWheel, { passive: false });

    // Cleanup function
    return () => {
      if (container) {
        container.removeEventListener('wheel', onWheel);
      }
    };
  }, []); // Remove containerRef.current from dependency array

  return (
    <div className=" ">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Digital Showcase</h2>
        <p className="text-gray-400">Scroll horizontally using your mouse wheel</p>
      </div>
      
      <div
        ref={containerRef}
        className="h-[60vh] w-full flex gap-5 overflow-x-auto scrollbar-hide"
      
      >
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
      </div>
      
    </div>
  );
};

export default HomeDigitalShow;
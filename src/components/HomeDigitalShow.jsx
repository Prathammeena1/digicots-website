import React from "react"
import { BiArrowFromLeft } from "react-icons/bi";
import { MdArrowRightAlt } from "react-icons/md";

function SocialMediaCard() {
  return (
    <div className="h-full w-[364px] shrink-0">
      <div className="h-[425px] w-[364px] overflow-hidden">
        <img className="h-full w-full object-cover" src="/final-images/services/Branding.webp" alt="" />
      </div>
      <div className=" mt-2">
        <h2 className="text-2xl font-semibold">Nueva Face</h2>
        <p className="text-md text-zinc-600/40">
          Project carried out withing digicots
        </p>
        <p className="text-md text-zinc-600/40">
          Branding
        </p>
      </div>
      <div className="flex items-center gap-3 ">
        <h3 className="text-md font-semibold text-zinc-400 ">View All</h3>
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
      
      <div
        ref={containerRef}
        className="h-[80vh] w-full flex gap-5 overflow-x-auto scrollbar-hide pointer-events-auto"
        style={{ scrollBehavior: 'smooth', overflowX: 'auto' }}
      >
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
        <SocialMediaCard />
      </div>
      
    </div>
  );
};

export default HomeDigitalShow;
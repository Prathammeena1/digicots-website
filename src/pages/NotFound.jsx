import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-full relative z-10 pointer-events-none flex flex-col items-center justify-center ">
      <img
        src="https://static.vecteezy.com/system/resources/previews/024/584/230/large_2x/3d-error-404-for-landing-page-free-png.png"
        alt="Not Found"
        className="object-contain w-[50%] h-[50%]"
      />
      <div className="text-center text-white">
        <h1 className="text-7xl font-bold">404 - Not Found</h1>
        <p className="mt-2 text-2xl">Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;

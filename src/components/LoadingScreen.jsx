import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';

const LoadingScreen = ({  onLoadingComplete }) => {
  const { loadingProgress, isLoading } = useLoading();
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-white dark:bg-black flex items-center justify-center will-change-auto">
      <div className="text-center">
        {/* <div className="mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            DIGICOTS
          </h1>
        </div> */}
        {/* Circular progress bar */}
        <div className="w-24 h-24 mx-auto flex items-center justify-center relative scale-[1]">

          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[.9]'>
            <img src="/final-images/gif/Loader.gif" alt="" />
          </div>

          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="#e5e7eb" // zinc-300
              strokeWidth="1"
            />
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="#000" // black
              strokeWidth="1"
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={2 * Math.PI * 42 * (1 - Math.min(loadingProgress, 100) / 100)}
              style={{ transition: 'stroke-dashoffset 0.2s linear' }}
            />
          </svg>
          <div className=" absolute w-24 h-24 flex items-center justify-center top-full left-0 pointer-events-none">
            <span className="text-lg font-semibold text-black dark:text-white">{Math.round(loadingProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

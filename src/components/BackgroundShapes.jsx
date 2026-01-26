import React from 'react';

export default function BackgroundShapes() {
  return (
    <>
<div
  className="
    absolute top-[18%] left-0
    w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[450px]
    h-40 sm:h-[900px] md:h-[1200px] lg:h-[1600px] xl:h-[1850px]
    bg-gradient-to-r from-blue-200 to-white
    z-0 blur-md opacity-40
    rounded-tr-[150px] rounded-br-[10px]
  "
/>
<img
  src="/shapes/shape_111.png"
  alt="Shape 111"
  className="
    absolute top-[88%] left-0
    w-32 sm:w-48 md:w-56 lg:w-72 xl:w-[350px]
    z-0
  "
/>

{/* 
  <img
    src="/shapes/shape_115.png"
    className="absolute top-[200%] left-[2%] z-0"
    alt="Shape 115"
  />
  <img
    src="/shapes/shape_123.png"
    className="absolute top-[185%] left-[4%] z-0"
    alt="Shape 12"
  /> */}
    </>
  );
}
 
import React from 'react';

export default function BackgroundShapes() {
  return (
    <>
      {/* Main Gradient Shape - Left Side */}
      <div
        className="
          absolute 
          top-[15%] sm:top-[18%] md:top-[20%] lg:top-[18%]
          left-0
          w-[250px] sm:w-[280px] md:w-[320px] lg:w-[380px] xl:w-[420px] 2xl:w-[480px]
          h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1400px] xl:h-[1700px] 2xl:h-[2000px]
          bg-gradient-to-r from-blue-200 via-blue-100 to-white
          z-0 
          blur-lg sm:blur-xl
          opacity-30 sm:opacity-35 md:opacity-40
          rounded-tr-[100px] sm:rounded-tr-[120px] md:rounded-tr-[150px] lg:rounded-tr-[180px]
          rounded-br-[8px] sm:rounded-br-[10px] md:rounded-br-[12px]
          pointer-events-none
        "
      />

      {/* Bottom Decorative Shape */}
      <img
        src="/shapes/shape_111.png"
        alt="Decorative shape"
        className="
          absolute 
          top-[85%] sm:top-[88%] md:top-[90%] lg:top-[88%]
          left-0
          w-24 sm:w-32 md:w-40 lg:w-56 xl:w-72 2xl:w-[350px]
          z-0
          opacity-70 sm:opacity-80 md:opacity-90
          pointer-events-none
        "
      />

      {/* Right Side Gradient Shape (Optional) */}
      <div
        className="
          absolute 
          top-[40%] sm:top-[45%] md:top-[50%]
          right-0
          w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px]
          h-[400px] sm:h-[600px] md:h-[800px] lg:h-[1000px] xl:h-[1200px] 2xl:h-[1400px]
          bg-gradient-to-l from-blue-100 via-blue-50 to-white
          z-0 
          blur-lg sm:blur-xl
          opacity-20 sm:opacity-25 md:opacity-30
          rounded-tl-[80px] sm:rounded-tl-[100px] md:rounded-tl-[120px] lg:rounded-tl-[150px]
          rounded-bl-[8px] sm:rounded-bl-[10px]
          pointer-events-none
        "
      />

      {/* Optional: Top Right Accent */}
      <div
        className="
          absolute 
          top-[5%] sm:top-[8%] md:top-[10%]
          right-[5%] sm:right-[8%] md:right-[10%]
          w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64
          h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64
          bg-gradient-to-br from-blue-200 to-transparent
          rounded-full
          blur-2xl sm:blur-3xl
          opacity-20 sm:opacity-25 md:opacity-30
          z-0
          pointer-events-none
        "
      />

      {/* Commented shapes - Uncomment if needed */}
      {/* 
      <img
        src="/shapes/shape_115.png"
        alt="Shape 115"
        className="
          absolute 
          top-[190%] sm:top-[195%] md:top-[200%] 
          left-[1%] sm:left-[2%] 
          w-20 sm:w-24 md:w-28 lg:w-32
          z-0
          opacity-60
          pointer-events-none
        "
      />
      <img
        src="/shapes/shape_123.png"
        alt="Shape 123"
        className="
          absolute 
          top-[180%] sm:top-[183%] md:top-[185%] 
          left-[3%] sm:left-[4%] 
          w-24 sm:w-28 md:w-32 lg:w-36
          z-0
          opacity-70
          pointer-events-none
        "
      />
      */}
    </>
  );
}
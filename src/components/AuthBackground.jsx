import React from 'react';

function AuthBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* ديكور يسار علوي (Mirror) */}
      {/* <div className="absolute top-85 left-135 transform -translate-y-1/2 w-28 h-40 md:w-36 md:h-48 lg:w-40 lg:h-52 z-50">
        <img src="/boyy.png" alt="Left Decoration" className="w-full h-full object-contain" />
      </div> */}

      {/* ديكور سفلي يمين */}
      <div className="absolute bottom-75 right-0 pl-85 w-[500px] h-[500px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px]">
        <img src="/Frame 1984078118.png" alt="Bottom Right Background" className="w-full h-full object-contain" />
      </div>

      {/* ديكور سفلي يسار */}
      <div className="absolute bottom-75 left-0 pr-103 w-[500px] h-[500px] md:w-[450px] md:h-[450px] lg:w-[650px] lg:h-[650px]">
        <img src="/Frame 1984078119.png" alt="Bottom Left Background" className="w-full h-full object-contain" />
      </div>

      {/* شخصية ثلاثية الأبعاد */}
      <div className="absolute bottom-20 right-8 md:right-16 lg:right-24 w-32 h-40 md:w-40 md:h-48 lg:w-44 lg:h-52">
        <img src="/3d-student-graduation-cap-books-stack 1.png" alt="Right Decorative Stack" className="w-full h-full object-contain drop-shadow-md" />
      </div>

      {/* عناصر زخرفية صغيرة */}
      <div className="absolute top-32 left-1/4 w-4 h-4 md:w-6 md:h-6">
        <div className="w-full h-full bg-yellow-400/60 rounded-full shadow-sm"></div>
      </div>

      <div className="absolute top-40 right-1/3 w-3 h-3 md:w-4 md:h-4">
        <div className="w-full h-full bg-blue-400/50 rotate-45 shadow-sm"></div>
      </div>

      <div className="absolute top-1/2 left-1/5 w-5 h-5 md:w-7 md:h-7">
        <div className="w-full h-full bg-purple-400/40 rounded-full shadow-sm"></div>
      </div>

      <div className="absolute top-2/3 right-1/4 w-4 h-4 md:w-5 md:h-5">
        <div className="w-full h-full bg-orange-400/50 rotate-45 rounded-sm shadow-sm"></div>
      </div>

      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 md:w-4 md:h-4">
        <div className="w-full h-full bg-green-400/50 rounded-full shadow-sm"></div>
      </div>

      {/* خطوط مائلة - أعلى يمين */}
      <div className="absolute top-1/4 right-1/5 w-16 h-16 md:w-20 md:h-20 opacity-20">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(45deg, #fbbf24 0px, #fbbf24 2px, transparent 2px, transparent 8px)'
        }}></div>
      </div>

      {/* خطوط مائلة - أسفل يسار */}
      <div className="absolute bottom-1/4 left-1/6 w-12 h-12 md:w-16 md:h-16 opacity-20">
        <div className="w-full h-full" style={{
          background: 'repeating-linear-gradient(-45deg, #8b5cf6 0px, #8b5cf6 2px, transparent 2px, transparent 8px)'
        }}></div>
      </div>
    </div>
  );
}

export default AuthBackground;

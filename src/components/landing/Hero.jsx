import React from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom"; 
import "./Hero.css";

function Hero() {
  const navigate = useNavigate(); 
  return (
    <div className="bg-[#F8F8F8] min-h-[512px] py-8 md:py-16 px-4 md:px-8 lg:px-16 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">

          {/* Left */}
          <div className="w-full md:w-1/4 flex flex-col items-center order-2 md:order-1 animate-fade-in-left">
            <img
              src="/laderBoy.png"
              alt="Education icon"
              className="w-12 h-12 md:w-16 md:h-16 mb-4 hidden md:block animate-float-slow"
            />

            <div className="hidden md:block h-24 lg:h-32" />

            <div className="hidden md:block">
              <img
                src="/girl.png"
                alt="Student"
                className="w-32 md:w-auto animate-gentle-sway"
              />
            </div>
          </div>

          {/* Center */}
          <div className="w-full md:w-2/4 text-center order-1 animate-fade-in-up">
            {/* Title with underlines */}
            <div className="flex items-center justify-center gap-6 mb-8 relative">
              {/* كلمة تعلم مع الخط */}
              <div className="flex flex-col items-start">
                <span className="text-yellow-400 text-4xl sm:text-5xl lg:text-6xl font-bold animate-color-yellow">
                  تعلم
                </span>
                <span className="block w-full h-1 bg-yellow-400 mt-2 rounded-full animate-expand-yellow"></span>
              </div>

              {/* حرف الواو في المنتصف */}
              <span className="text-gray-800 text-4xl sm:text-5xl lg:text-6xl font-bold mx-4">
                و
              </span>

              {/* كلمة أدرس مع الخط */}
              <div className="flex flex-col items-end">
                <span className="text-blue-500 text-4xl sm:text-5xl lg:text-6xl font-bold animate-color-blue">
                  أدرس
                </span>
                <span className="block w-full h-1 bg-blue-500 mt-2 rounded-full animate-expand-blue"></span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              في أي وقت وأي مكان
            </h2>

            <p className="text-gray-700 max-w-md mx-auto mb-10 leading-relaxed">
              نحن منصة تعليمية متكاملة تقدم محتوى مصمم للمراحل التعليمية المختلفة
            </p>

            {/* زر ابدأ الآن */}
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 mx-auto transition"
            >
              <GoArrowUpLeft />
              ابدأ الآن
            </button>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/4 flex flex-col items-center order-3 animate-fade-in-right">
            <div className="hidden md:block relative">
              <img
                src="/boy.png"
                alt="Boy"
                className="w-32 md:w-auto animate-gentle-bounce"
              />
            </div>

            <div className="hidden md:block h-24 lg:h-32" />

            <img
              src="/clock.png"
              alt="Clock"
              className="w-12 h-12 md:w-16 md:h-16 hidden md:block animate-rotate-slow"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;

import { ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./EducationStages.css";

export default function EducationStages() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 }
    );

    sectionRef.current && observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="bg-[#F8F8F8] rounded-lg shadow-md mx-auto p-12 overflow-hidden"
    >
      <div className="flex flex-col max-w-7xl mx-auto md:flex-row items-center justify-between">

        {/* Image */}
        <div
          className={`relative transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <div
            className={`absolute -z-10 w-44 h-44 bg-yellow-400 rounded-lg top-12 left-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />
          <img src="/edu-student.svg" alt="Student" className="w-[300px]" />
        </div>

        {/* Content */}
        <div dir="rtl" className="md:w-2/3 mt-6 md:mt-0">

          <h2
            className={`text-4xl font-bold text-blue-600 flex items-center gap-2 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            المراحل
            <span className="text-yellow-400 animate-gentle-bounce">
              التعليمية
            </span>
            <img src="/stars.png" className="w-8 animate-twinkle" />
          </h2>

          <p className="text-gray-600 text-lg mt-4 leading-relaxed">
            انضم إلينا اليوم واستفد من محتوى حصري، دعم مباشر، وموارد تعليمية متنوعة.
          </p>

          {/* Stages */}
          <div className="mt-6 space-y-3">
            {[
              { title: "المرحلة الابتدائية", bg: "bg-red-500" },
              { title: "المرحلة الإعدادية", bg: "bg-blue-600 ml-12" },
              { title: "المرحلة الثانوية", bg: "bg-yellow-400 ml-24" },
            ].map((stage, i) => (
              <div
                key={i}
                className={`${stage.bg} text-white px-6 py-4 rounded-lg flex items-center gap-4 shadow-md transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-20"
                }`}
              >
                <img src="/true.png" className="w-6 animate-check-bounce" />
                <span>{stage.title}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            onClick={() => navigate("/register")}
            className={`mt-8 bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-all ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            سجل الآن
            <ArrowRight className="animate-arrow-pulse" />
          </button>
        </div>
      </div>
    </section>
  );
}

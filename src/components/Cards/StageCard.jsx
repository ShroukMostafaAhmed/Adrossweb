import React from 'react';
import { useNavigate } from "react-router-dom";

function StageCard({ stage }) {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full
        max-w-[95%]
        sm:max-w-[300px]
        md:max-w-[500px]
        lg:max-w-[720px]
        h-[200px]
        sm:h-[100px]
        md:h-[250px]
        lg:h-[300px]
        rounded-3xl
        overflow-hidden
        mx-0
        my-4
        relative
      "
    >
      {/* صورة الخلفية */}
      <img
        src={stage.imagePath}
        alt={stage.title}
        className="w-full sm-w-100  h-70 pr-2 transition-transform duration-300 hover:scale-105"
      />

      {/* النصوص والزر */}
      <div className="absolute inset-0 flex flex-col justify-center items-start p-4 bg-gradient-to-l from-white/70 via-white/30 to-transparent  pr-7">
        <h3 className="text-white text-base sm:text-lg md:text-2xl font-bold mb-10 leading-tight">
          {stage.title}
        </h3>
        <p className="text-white text-xs sm:text-sm md:text-base mb-5 max-w-[75%] leading-snug">
          {stage.description}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate('/app/stage_details/' + stage.id, {
              state: {
                id: stage.id,
                title: stage.title,
                image: stage.imagePath
              }
            });
          }}
          className="bg-blue-600 text-white text-xs sm:text-sm md:text-base px-15 py-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          دخول الصف
        </button>
      </div>
    </div>
  );
}

export default StageCard;

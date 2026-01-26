import React from 'react';
import { useNavigate } from "react-router-dom";

function LevelsCard({ id, title, imagePath }) {
    const navigate = useNavigate();

    return (
        <div
className="relative w-full sm:w-72 md:w-80 lg:w-140 xl:w-170  rounded-xl overflow-hidden my-4 lg:my-0 lg:rounded-3xl"
        >
            {/* صورة الخلفية */}
            <img
                src={imagePath}
                alt={title}
                className="w-full h-40 sm:h-70 md:h-40 lg:h-80 xl:h-80 rounded-2xl transition-transform duration-300 hover:scale-105"
            />

             <div
    className="
      absolute 
      inset-0 
      flex 
      flex-col 
      justify-center 
      items-start 
      gap-4
      p-2
      lg:py-50
      xl:py-50
      lg:pr-10
      xl:pr-10
      text-right
     
    "
  >
    <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
      {title}
    </h3>

    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate('/app/level_Details/' + id, {
          state: { id, title }
        });
      }}
      className="
        bg-blue-600 
        text-white 
        text-sm 
        sm:text-base
        px-6 
        py-2 
        rounded-lg 
        hover:bg-blue-700 
        transition-colors 
        duration-200
        w-fit
      "
    >
      عرض الدروس
    </button>
  </div>
        </div>
    );
}

export default LevelsCard;

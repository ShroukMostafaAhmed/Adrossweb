import React from 'react';
import { useNavigate } from "react-router-dom";

function LevelsCard({ id, title, imagePath }) {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-60 lg:w-200 h-90 rounded-xl overflow-hidden my-4 lg:my-0 lg:rounded-3xl"
        >
            {/* صورة الخلفية */}
            <img
                src={imagePath}
                alt={title}
                className="w-3xl h-70 object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
            />

            {/* النصوص والزر - جهة اليمين */}
            <div className="absolute inset-0 flex flex-col justify-center items-start p-4 text-left bg-gradient-to-l from-white/70 via-white/30 to-transparent ">
                <h3 className="text-white text-3xl font-bold mb-15">{title}</h3>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate('/app/level_Details/' + id, {
                            state: { id, title }
                        });
                    }}
                    className="bg-blue-600 text-white text-lg px-4 py-2 w-80 rounded-md hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                >
                    عرض الدروس
                </button>
            </div>
        </div>
    );
}

export default LevelsCard;

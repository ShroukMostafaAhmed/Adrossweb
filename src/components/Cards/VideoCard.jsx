import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            className="w-full rounded-lg sm:rounded-xl shadow-md hover:shadow-xl shadow-blue-100 hover:shadow-blue-200 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] group"
            onClick={() => navigate(`${video.href}`, { state: { id: video.id, title: video.title } })}
        >
            {/* Thumbnail Section */}
            <div className="relative">
                <img
                    src={video?.thumbnailUrl || "/video-default.jpg"}
                    alt={video.title || "thumbnail"}
                    className="w-full aspect-video object-cover"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                    <button 
                        className="bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                        aria-label="تشغيل الفيديو"
                    >
                        <img
                            src="/icon.png"
                            alt="Play Icon"
                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                        />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 md:p-5 bg-white">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate mb-1 sm:mb-2">
                    {video.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {video.desc}
                </p>
            </div>
        </div>
    );
}
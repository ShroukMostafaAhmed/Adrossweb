import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[45%] 2xl:w-[350px] 
                       
                       rounded-xl shadow-lg shadow-blue-200 overflow-hidden cursor-pointer"
            onClick={() => navigate(`${video.href}`, { state: { id: video.id, title: video.title } })}
        >
            <div className="relative">
                <img
                    src={video?.thumbnailUrl || "/video-default.jpg"}
                    alt="thumbnail"
                    className="w-full aspect-video object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white rounded-full shadow-lg ">
                        <img
                            src="/icon.png"
                            alt="Play Icon"
                            className="w-12 h-12"
                        />
                    </button>
                </div>
            </div>

            <div className="p-4 bg-white">
                <h3 className="text-lg font-bold text-gray-900 truncate">{video.title}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{video.desc}</p>
            </div>
        </div>
    );
}

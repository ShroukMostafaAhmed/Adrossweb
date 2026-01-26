import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import useGetVideoById from "../../hooks/useVideos/useGetVideoById.js";
import useToggleWatchLater from "../../hooks/useVideos/useToggleWatchLater.jsx";
import { Bookmark, BookmarkCheck } from 'lucide-react';

function VideoDetails() {
  const { videoId } = useParams();

  const { fetchVideoById, videoData, isLoading, error } = useGetVideoById();
  const { toggleWatchLater, isLoading: isTogglingWatchLater } = useToggleWatchLater();

  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    if (videoId) {
      fetchVideoById(videoId);
    }
  }, [videoId]);
  
useEffect(() => {
  if (videoData) {
    setIsWatchLater(videoData.isWatchLater);
  }
}, [videoData]);


  const handleToggleWatchLater = async () => {
    if (isTogglingWatchLater || !videoId) return;

    try {
      const data = await toggleWatchLater(videoId);
      setIsWatchLater(data.watchLater);
    } catch (err) {
      console.error("Toggle Watch Later Error:", err);
    }
  };

  const items = [
    { label: "الرئيسية", href: "/" },
    { label: "الدروس", href: "/lessons" },
    {
      label: videoData?.title || "الفيديو",
      href: `/app/video_details/${videoId}`
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-xl text-red-600">
          حدث خطأ في تحميل الفيديو
        </div>
        <button
          onClick={() => fetchVideoById(videoId)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">لم يتم العثور على الفيديو</div>
      </div>
    );
  }

  const thumbnailUrl = videoData.thumbnailUrl?.startsWith("https")
    ? videoData.thumbnailUrl
    : `https://adros-mrashed.runasp.net${videoData.thumbnailUrl}`;

  const teacherDescription = videoData.teacherName
    ? `الأستاذ ${videoData.teacherName}${
        videoData.teacherAbout ? ` - ${videoData.teacherAbout}` : ""
      }`
    : "لم يتم تعيين مدرس لهذا الدرس بعد";

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Breadcrumb items={items} />

      <div className="w-full max-w-screen-3xl px-35 py-10">
        <div dir="rtl" className="px-4 lg:px-12">
          <div className="relative">
           <VideoPlayer
  videoUrl={videoData.url}
  videoId={videoId}   
  thumbnailUrl={thumbnailUrl}
  title={videoData.title}
/>


            <button
              onClick={handleToggleWatchLater}
              disabled={isTogglingWatchLater}
              className={`absolute top-4 left-10 p-3 rounded-full transition-all duration-200 ${
                isWatchLater
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600"
              } shadow-lg backdrop-blur-sm`}
            >
              {isWatchLater ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div dir="rtl" className="px-4 lg:px-12 pt-10">
          <DetailsCard
            title="شرح الدرس"
            icon="lesson-icon.png"
            description={videoData.description || "لا يوجد وصف متاح"}
          />
        </div>

        <div dir="rtl" className="px-4 lg:px-12 pt-6">
          <DetailsCard
            title="المدرس"
            icon="profile-icon.png"
            description={teacherDescription}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;

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
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-lg sm:text-xl text-gray-700">جاري التحميل...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3 sm:gap-4 px-4">
        <div className="text-lg sm:text-xl text-red-600 text-center">
          حدث خطأ في تحميل الفيديو
        </div>
        <button
          onClick={() => fetchVideoById(videoId)}
          className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-lg sm:text-xl text-gray-700 text-center">
          لم يتم العثور على الفيديو
        </div>
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
    <div className="flex flex-col gap-3 sm:gap-4 pb-6 sm:pb-10">
      {/* Breadcrumb */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <Breadcrumb items={items} />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Video Player Section */}
        <div dir="rtl" className="mb-6 sm:mb-8 lg:mb-10">
          <div className="relative">
            <VideoPlayer
              videoUrl={videoData.url}
              videoId={videoId}   
              thumbnailUrl={thumbnailUrl}
              title={videoData.title}
            />

            {/* Watch Later Button */}
            <button
              onClick={handleToggleWatchLater}
              disabled={isTogglingWatchLater}
              className={`absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-200 ${
                isWatchLater
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white/90 text-gray-700 hover:bg-white hover:text-blue-600"
              } shadow-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={isWatchLater ? "إزالة من المشاهدة لاحقاً" : "إضافة للمشاهدة لاحقاً"}
            >
              {isWatchLater ? (
                <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Lesson Description Card */}
        <div dir="rtl" className="mb-4 sm:mb-5 md:mb-6">
          <DetailsCard
            title="شرح الدرس"
            icon="lesson-icon.png"
            description={videoData.description || "لا يوجد وصف متاح"}
          />
        </div>

        {/* Teacher Card */}
        <div dir="rtl">
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
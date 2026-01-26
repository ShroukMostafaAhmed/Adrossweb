import React, { useEffect, useMemo, useRef } from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import VideoCard from "../../components/Cards/VideoCard.jsx";
import useGetWatchLaterVideos from "../../hooks/useVideos/useGetWatchLaterVideos.jsx";

function WatchLater() {

  const {
    fetchWatchLaterVideos,
    videos,
    isLoading,
    error
  } = useGetWatchLaterVideos();

  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;

    fetchWatchLaterVideos();
    fetchedRef.current = true;
  }, []);

  const transformedVideos = useMemo(() => {
    if (!videos || videos.length === 0) return [];

    return videos.map(video => ({
      id: video.id, 
      title: video.videoName || video.title,
      desc: video.description || "شرح الدرس",
      thumbnailUrl: video.thumbnailUrl?.startsWith("https")
        ? video.thumbnailUrl
        : `https://adros-mrashed.runasp.net${video.thumbnailUrl}`,
      href: `/app/video_details/${video.videoId}`, 
      duration: video.duration,
    }));
  }, [videos]);

  return (
    <div className="flex flex-col w-full min-h-screen" dir="rtl">
      
      {/* Banner Section */}
      <div className="w-full flex justify-center items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <div className="w-full max-w-7xl">
          <BannerCard
            imageSrc="/OnlineLearningCourseLandscapeBanner1.png"
            imageAlt="Watch Later"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <p className="text-base sm:text-lg md:text-xl text-gray-700">
            جاري تحميل الفيديوهات...
          </p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-red-600 mb-4">
            حدث خطأ في تحميل الفيديوهات
          </p>
          <button
            onClick={() => fetchWatchLaterVideos()}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && transformedVideos.length === 0 && (
        <div className="text-center py-12 sm:py-16 md:py-20 px-4">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600">
            لا يوجد فيديوهات في المفضلة
          </p>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            ابدأ بإضافة فيديوهات لمشاهدتها لاحقاً
          </p>
        </div>
      )}

      {/* Videos Grid */}
      {!isLoading && !error && transformedVideos.length > 0 && (
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-6 sm:py-8 md:py-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {transformedVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchLater;
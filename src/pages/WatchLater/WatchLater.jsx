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
      id: video.id, // watchLaterId (لـ key فقط)
      title: video.videoName || video.title,
      desc: video.description || "شرح الدرس",
      thumbnailUrl: video.thumbnailUrl?.startsWith("https")
        ? video.thumbnailUrl
        : `https://adros-mrashed.runasp.net${video.thumbnailUrl}`,
      href: `/app/video_details/${video.videoId}`, // ✅ ID الفيديو الحقيقي
      duration: video.duration,
    }));
  }, [videos]);

  return (
    <div className="flex flex-col w-full" dir="rtl">

      <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-10 lg:px-15 xl:px-35">
        <div className="w-full max-w-screen-2xl">
          <BannerCard
            imageSrc="/OnlineLearningCourseLandscapeBanner1.png"
            imageAlt="Watch Later"
          />
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-20 text-xl">
          جاري تحميل الفيديوهات...
        </div>
      )}

      {!isLoading && !error && transformedVideos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl font-semibold text-gray-600">
            لا يوجد فيديوهات في المفضلة
          </p>
        </div>
      )}

      {!isLoading && !error && transformedVideos.length > 0 && (
        <div className="flex flex-wrap gap-6 mt-10 px-6 pr-35 max-w-10xl">
          {transformedVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchLater;

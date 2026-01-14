import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import useGetVideoById from "../../hooks/useVideos/useGetVideoById.js";

function VideoDetails() {
    const { id } = useParams();
    const { fetchVideoById, videoData, isLoading, error } = useGetVideoById();

    useEffect(() => {
        if (id) {
            console.log('Fetching video with ID:', id);
            fetchVideoById(id);
        }
    }, [id]);

   
    useEffect(() => {
        if (videoData) {
            console.log('Video data loaded:', videoData);
        }
    }, [videoData]);

 
    useEffect(() => {
        if (error) {
            console.error('Error occurred:', error);
        }
    }, [error]);

    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الصف الاول", href: "/stage_details" },
        { label: "اللغه العربية", href: "/level_details" },
        { label: "الدروس", href: "/lessons" },
        { label: "الدرس الاول", href: "/lesson_details" },
        { label: videoData?.title || "الفيديو", href: `/video_details/${id}` }
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
                <div className="text-sm text-gray-600">
                    {error}
                </div>
                <button 
                    onClick={() => fetchVideoById(id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

    
    const thumbnailUrl = videoData.thumbnailUrl?.startsWith('http') 
        ? videoData.thumbnailUrl 
        : `http://adros-mrashed.runasp.net${videoData.thumbnailUrl}`;

    return (
        <>
            <div className="flex flex-col gap-4 pb-10">
                <Breadcrumb items={items} />
                <div className='w-full max-w-screen-3xl px-35 py-10'>
                    <div dir="rtl" className="px-4 lg:px-12">
                        <VideoPlayer 
                            videoUrl={videoData.url}
                            thumbnailUrl={thumbnailUrl}
                            title={videoData.title}
                        />
                    </div>

                    <div dir="rtl" className="px-4 lg:px-12 pt-10">
                        <DetailsCard
                            title="شرح الدرس"
                            icon="lesson-icon.png"
                            description={videoData.description || "لا يوجد وصف متاح"}
                        />
                    </div>

                   {/* <div dir="rtl">
                <DetailsCard
                    title="المدرس"
                    icon="profile-icon.png"
                    // teacherName={lesson.teacherName ? `الأستاذ / ${lesson.teacherName}` : "لم يتم تعيين مدرس"}
                    description={video.teacherName ? `الأستاذ ${video.teacherName} هو مدرس متميز...` : "لم يتم تعيين مدرس لهذا الدرس بعد"}
                />
            </div>   */}
                </div>
            </div>
        </>
    );
}

export default VideoDetails;
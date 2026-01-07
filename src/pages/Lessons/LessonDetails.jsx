import React, { useEffect } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import VideoCard from "../../components/Cards/VideoCard.jsx";
import useGetLessonById from "../../hooks/useLessons/useGetLessonById.js";

function LessonDetails() {
    const location = useLocation();
    const { id } = useParams();
    const { getLessonById, lesson, loading, error } = useGetLessonById();


    useEffect(() => {
        if (id) {
            getLessonById(id);
        }
    }, [id, getLessonById]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl">جاري تحميل الدرس...</div>
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-xl text-red-600">حدث خطأ أثناء تحميل الدرس</div>
            </div>
        );
    }


    if (!lesson) {
        return null;
    }


    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الصف الاول", href: "/stage_details" },
        { label: "اللغه العربية", href: "/level_details" },
        { label: "الدروس", href: "/lessons" },
        { label: lesson.title || "الدرس", href: "/lesson_details" }
    ];


    const transformedAttachments = lesson.attachments?.map((attachment, index) => ({
        id: attachment.id || index + 1,
        title: attachment.title || "الملفات المرفقة",
        href: attachment.fileUrl || "#",
        color: "blue",
        image: <img src='lesson1.png' alt='attachment' className='w-8 h-8' />,
        text: attachment.fileName || "ملف مرفق"
    })) || [];


    const transformedVideos = lesson.videos?.map((video, index) => ({
        id: video.id || index + 1,
        img: video.thumbnailUrl || "/video-default.jpg",
        title: video.title || `Video ${index + 1}`,
        desc: video.description || "شرح الدرس",
        href: video.videoUrl || "/video_details"
    })) || [];

    const handleCardClick = (attachment) => {
        console.log('Attachment clicked:', attachment);

        if (attachment.href && attachment.href !== "#") {
            window.open(attachment.href, '_blank');
        }
    }

    return (
        <>
            <Breadcrumb items={items} />
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
                <BannerCard
                    imageSrc="/stage1.png"
                    imageAlt="Stage Banner"
                    title={lesson.title}
                />
            </div>

            <div dir="rtl">
                <DetailsCard
                    title="شرح الدرس"
                    icon="lesson-icon.png"
                    description={lesson.description || "لا يوجد وصف متاح"}
                />
            </div>

            <div dir="rtl">
                <DetailsCard
                    title="المدرس"
                    icon="profile-icon.png"
                    teacherName={lesson.teacherName ? `الأستاذ / ${lesson.teacherName}` : "لم يتم تعيين مدرس"}
                    description={lesson.teacherName ? `الأستاذ ${lesson.teacherName} هو مدرس متميز...` : "لم يتم تعيين مدرس لهذا الدرس بعد"}
                />
            </div>

            {transformedAttachments.length > 0 && (
                <div className="flex flex-col gap-4 px-6">
                    <div className="flex flex-row justify-start items-center gap-6">
                        <img src="attachmennts.png" alt='attachmennts' className="w-12 h-12" />
                        <h2 className="text-3xl font-bold py-4">المرفقات</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                        {transformedAttachments.map((attachment) => (
                            <Card
                                key={attachment.id}
                                id={attachment.id}
                                href={attachment.href}
                                color={attachment.color}
                                text={attachment.text}
                                number={attachment.image}
                                onClick={() => handleCardClick(attachment)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {transformedVideos.length > 0 && (
                <div className="flex flex-col gap-4 px-6">
                    <div className="flex flex-row justify-start items-center gap-6">
                        <img src="lessonss.png" alt='lessonss' className="w-12 h-12" />
                        <h2 className="text-3xl font-bold py-4">شرح الدرس</h2>
                    </div>
                    <div className="flex flex-wrap gap-6 mt-6 mx-4 max-w-5xl">
                        {transformedVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                            />
                        ))}
                    </div>
                </div>
            )}

            {transformedAttachments.length === 0 && transformedVideos.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-600">لا توجد مرفقات أو فيديوهات متاحة لهذا الدرس حالياً</p>
                </div>
            )}
        </>
    );
}

export default LessonDetails;
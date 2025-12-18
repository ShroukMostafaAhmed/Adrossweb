import React, { useState } from 'react';
import { useLocation } from "react-router-dom"; // ✅ هنا
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import VideoCard from "../../components/Cards/VideoCard.jsx";
import useGetLessonById from "../../hooks/useLessons/useGetLessonById.js";

function LessonDetails() {
    const location = useLocation();
    const state = location.state || {}; // ✅ تعريف الـ state المستلم

    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الصف الاول", href: "/stage_details" },
        { label: "اللغه العربية", href: "/level_details" },
        { label: "الدروس", href: "/lessons" },
        { label: "الدرس الاول", href: "/lesson_details" }
    ];

    const attachments = [
        { id: 1, title: "الملفات المرفقة", href: "#", color: "blue", image: <img src='lesson1.png' alt='litter' className='w-8 h-8' />, text: "كراسة التلميذ" },
        { id: 2, title: "ملف جديد", href: "#", color: "blue", image: <img src='lesson1.png' alt='litter' className='w-8 h-8' />, text: "كتاب التلميذ" },
    ];

    const videos = [
        { id: 1, img: "/video1.jpg", title: "Video 1", desc: "Description for Video 1", href: "/video_details" },
        { id: 2, img: "/video2.jpg", title: "Video 2", desc: "Description for Video 2", href: "/video_details" },
        { id: 3, img: "/video3.jpg", title: "Video 3", desc: "Description for Video 3", href: "/video_details" },
    ];

    const handleCardClick = (sub) => {
        console.log('Attachment clicked:', sub);
    }

    return (
        <>
            <Breadcrumb items={items} />

            <BannerCard
                imageSrc="/stage1.png"
                imageAlt="Stage Banner"
                title={state.title}
            />

            <div dir="rtl">
                <DetailsCard
                    title="شرح الدرس"
                    icon="lesson-icon.png"
                    description="المجموعات هي تجمــيــعـات من العناصر..."
                />
            </div>

            <div dir="rtl">
                <DetailsCard
                    title="المدرس"
                    icon="profile-icon.png"
                    teacherName="الأستاذ / فوزي مفتاح"
                    description="الأسـتـاذ فــوزي مــفــتـاح هـو أسـتاذ لـمـادة الـريــاضيــات..."
                />
            </div>

            <div className="flex flex-col gap-4 px-6">
                <div className="flex flex-row justify-start items-center gap-6">
                    <img src="attachmennts.png" alt='attachmennts' className="w-12 h-12" />
                    <h2 className="text-3xl font-bold py-4">المرفقات</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {attachments.map((sub) => (
                        <Card
                            key={sub.id}
                            id={sub.id}
                            href={"/lessons"}
                            color={sub.color}
                            text={sub.text}
                            number={sub.image}
                            onClick={() => handleCardClick(sub)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 px-6">
                <div className="flex flex-row justify-start items-center gap-6">
                    <img src="lessonss.png" alt='lessonss' className="w-12 h-12" />
                    <h2 className="text-3xl font-bold py-4">شرح الدرس</h2>
                </div>
                <div className="flex flex-wrap gap-6 mt-6 mx-4 max-w-5xl">
                    {videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LessonDetails;

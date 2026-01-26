import React, { useEffect, useState } from 'react';
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
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        if (id) {
            getLessonById(id);
        }
    }, [id, getLessonById]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen px-4">
                <div className="text-base sm:text-lg md:text-xl text-gray-700">
                    جاري تحميل الدرس...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen gap-3 sm:gap-4 px-4">
                <div className="text-base sm:text-lg md:text-xl text-red-600 text-center">
                    حدث خطأ أثناء تحميل الدرس
                </div>
                <button
                    onClick={() => getLessonById(id)}
                    className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
                >
                    إعادة المحاولة
                </button>
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

    const BASE_FILE_URL = "https://api.example.com/";

    const transformedAttachments = lesson.attachments?.map((attachment, index) => {
        const fileUrl = attachment.url
            ? attachment.url.startsWith("https")
                ? attachment.url
                : `${BASE_FILE_URL}${attachment.url}`
            : null;

        let fileName = attachment.title || "ملف مرفق";
        let fileExtension = "";

        if (fileUrl) {
            const parts = fileUrl.split(".");
            fileExtension = parts.length > 1 ? parts.pop().toLowerCase() : "";
        }

        const isPDF = fileExtension === "pdf";

        return {
            id: attachment.id || index + 1,
            title: attachment.title || "الملفات المرفقة",
            fileUrl,
            isPDF,
            fileName: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`,
            color: isPDF ? "red" : "blue",
            image: <img src="/logo.png" className="w-8 h-8" alt="logo" />,
            text: attachment.title || fileName,
        };
    });

    const transformedVideos = lesson.videos?.map((video, index) => ({
        id: video.id || index + 1,
        title: video.videoName || `Video ${index + 1}`,
        desc: video.description || "شرح الدرس",
        href: `/app/video_details/${video.id}`,
        videoUrl: video.url,
        thumbnailUrl: video.thumbnailUrl,
    })) || [];

    const handleCardClick = async (attachment) => {
        console.log('Attachment clicked:', attachment);

        if (!attachment.fileUrl) {
            console.error('No file URL provided');
            return;
        }

        setDownloading(attachment.id);

        try {
            const link = document.createElement('a');
            link.href = attachment.fileUrl;
            
            let fileName = attachment.fileName;
            
            if (attachment.isPDF && !fileName.toLowerCase().endsWith('.pdf')) {
                fileName = fileName.includes('.') 
                    ? fileName.replace(/\.[^/.]+$/, ".pdf")
                    : fileName + '.pdf';
            }
            
            link.download = fileName;
            link.target = '_blank'; 
            
            document.body.appendChild(link);
            link.click();
            
            setTimeout(() => {
                document.body.removeChild(link);
                setDownloading(null);
            }, 100);
            
            console.log('File download initiated:', fileName);
            
        } catch (error) {
            console.error('Error with direct download:', error);
            
            try {
                const response = await fetch(attachment.fileUrl);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.status}`);
                }
                
                const blob = await response.blob();
                const blobUrl = window.URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = attachment.fileName || 'download';
                
                document.body.appendChild(link);
                link.click();
                
                setTimeout(() => {
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(blobUrl);
                    setDownloading(null);
                }, 100);
                
            } catch (fetchError) {
                console.error('Error with fetch download:', fetchError);
                
                window.open(attachment.fileUrl, '_blank');
                setDownloading(null);
            }
        }
    };

    return (
        <div className="min-h-screen pb-6 sm:pb-8 md:pb-10">
            {/* Download Indicator */}
            {downloading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-xl max-w-sm w-full">
                        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
                            <p className="text-base sm:text-lg font-medium text-center">جاري تنزيل الملف...</p>
                            <p className="text-xs sm:text-sm text-gray-600 text-center">يرجى الانتظار</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="px-3 sm:px-4 md:px-6 lg:px-8">
                <Breadcrumb items={items} />
            </div>

            {/* Banner Section */}
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 mb-6 sm:mb-8 md:mb-10">
                <BannerCard
                    imageSrc="/stage1.png"
                    imageAlt="Stage Banner"
                    title={lesson.title}
                />
            </div>

            {/* Main Content */}
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                
                {/* Lesson Details Section */}
                <div dir="rtl" className="mb-8 sm:mb-10 md:mb-12">
                    <div className="flex flex-row justify-start items-center mb-4 sm:mb-5 md:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">تفاصيل الدرس</h2>
                    </div>
                    <DetailsCard 
                        icon="lesson-icon.png"
                        description={lesson.description || "لا يوجد وصف متاح"}
                    />
                </div>

                {/* Attachments Section */}
                {transformedAttachments && transformedAttachments.length > 0 && (
                    <div dir="rtl" className="mb-8 sm:mb-10 md:mb-12">
                        <div className="flex flex-row justify-start items-center mb-4 sm:mb-5 md:mb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">المرفقات</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            {transformedAttachments.map((attachment) => (
                                <div 
                                    key={attachment.id}
                                    className={`group cursor-pointer transition-transform duration-200 hover:scale-105 ${
                                        downloading === attachment.id ? 'opacity-50 pointer-events-none' : ''
                                    }`}
                                    onClick={() => handleCardClick(attachment)}
                                    title={attachment.text}
                                >
                                    <Card
                                        id={attachment.id}
                                        href={attachment.url}
                                        color='blue'
                                        text={attachment.title}
                                        number={attachment.image}
                                        onClick={() => {}}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Videos Section */}
                {transformedVideos.length > 0 && (
                    <div dir="rtl" className="mb-8 sm:mb-10 md:mb-12">
                        <div className="flex flex-row justify-start items-center mb-4 sm:mb-5 md:mb-6">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">شرح الدرس</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                            {transformedVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {transformedAttachments.length === 0 && transformedVideos.length === 0 && (
                    <div className="text-center py-10 sm:py-12 md:py-16 px-4">
                        <p className="text-base sm:text-lg md:text-xl text-gray-600">
                            لا توجد مرفقات أو فيديوهات متاحة لهذا الدرس حالياً
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LessonDetails;
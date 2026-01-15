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

 const BASE_FILE_URL = "https://api.example.com/";

const transformedAttachments = lesson.attachments?.map((attachment, index) => {
  const fileUrl = attachment.url
  ? attachment.url.startsWith("http")
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
    image: <img src="/logo.png" className="w-8 h-8" />,
    text: attachment.title || fileName,
  };
});

    const transformedVideos = lesson.videos?.map((video, index) => ({
        id: video.id || index + 1,
        title: video.videoName || `Video ${index + 1}`,
        desc: video.description || "شرح الدرس",
        href: `/video_details/${video.id}`,
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
        <>
            {/* مؤشر التنزيل */}
            {downloading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex flex-col items-center space-y-3">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="text-lg font-medium">جاري تنزيل الملف...</p>
                            <p className="text-sm text-gray-600">يرجى الانتظار</p>
                        </div>
                    </div>
                </div>
            )}

            <Breadcrumb items={items} />
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
                <BannerCard
                    imageSrc="/stage1.png"
                    imageAlt="Stage Banner"
                    title={lesson.title}
                />
            </div>
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
                <div dir="rtl">
                    <div className="flex flex-row justify-start items-center gap-6">
                        <h2 className="text-3xl font-bold px-6">تفاصيل الدرس</h2>
                    </div>
                    <DetailsCard 
                        icon="lesson-icon.png"
                        description={lesson.description || "لا يوجد وصف متاح"}
                    />
                </div>

               {transformedAttachments.length > 0 && (
    <div className="flex flex-col gap-4 px-6">
        <div className="flex flex-row justify-start items-center gap-6">
            <h2 className="text-3xl font-bold py-4">المرفقات</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
            {transformedAttachments.map((attachment) => (
                <div 
                    key={attachment.id}
                    className="group"
                >
                    <div 
                        className={`cursor-pointer ${downloading === attachment.id }`}
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
                </div>
            ))}
        </div>
    </div>
)}

                {transformedVideos.length > 0 && (
                    <div className="flex flex-col gap-4 px-6 ">
                        <div className="flex flex-row justify-start items-center gap-6">
                            <h2 className="text-3xl font-bold py-4">شرح الدرس</h2>
                        </div>
                        <div className="flex  gap-6 mt-6 max-w-5xl">
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
            </div>
        </>
    );
}

export default LessonDetails;
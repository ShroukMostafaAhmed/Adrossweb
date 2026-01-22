import React from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import LessonsSlider from "../../components/Slider/LessonSlider.jsx";

function Downloads() {
    const lessons = [
        { id: 1, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 2, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true, image: "/lessonImg.png" },
        { id: 3, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true, image: "/lessonImg.png" },
        { id: 4, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 5, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 6, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
    ];

    return (
        <div className="flex flex-col w-full" dir="rtl">
            {/* Banner container - Responsive padding */}
            <div className="w-full flex justify-center items-center px-4 sm:px-6 md:px-10">
                <div className="w-full max-w-screen-2xl">
                    <BannerCard
                        imageSrc="/OnlineLearningCourseLandscapeBanner1.png"
                        imageAlt="Online Learning Course Landscape Banner 1"
                    />
                </div>
            </div>

            {/* Slider container - Responsive padding */}
            <div className="flex flex-col w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35 pt-6 sm:pt-10">
                <LessonsSlider lessons={lessons}/>
            </div>
        </div>
    );
}

export default Downloads;
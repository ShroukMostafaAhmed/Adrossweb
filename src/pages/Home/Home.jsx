import React, { useEffect } from 'react';
import Slider from "../../components/Slider/Slider.jsx";
import LevelsCard from "../../components/LevelsCard.jsx";
import WeeklyCalendar from "../../components/Calendar/WeeklyCalendar.jsx";
import VideoCard from "../../components/Cards/VideoCard.jsx";
import useGetHomeData from '../../hooks/useHome/useGetHomeData.js';
import useGetAllSkills from '../../hooks/useSkills/useGetAllSkills.js';
import BackgroundShapes from "../../components/BackgroundShapes.jsx";
import SideImages from "../../components/SideImages.jsx";

function Home() {
  const { fetchHomeData, data, isLoading, error } = useGetHomeData();
  const { skills, loading: loadingSkills, error: skillsError } = useGetAllSkills();

  useEffect(() => {
    fetchHomeData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Home Data Loaded:", data);
    }
  }, [data]);

  const sortedBanners = Array.isArray(data?.banners)
    ? [...data.banners].sort((a, b) => a.order - b.order)
    : [];

  if (isLoading) {
    return <div className="text-center py-10">جاري التحميل...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        حدث خطأ: {error.message}
      </div>
    );
  }

  return (
    <div dir="rtl" className="overflow-x-hidden">

      <div className="hidden sm:block">
        <BackgroundShapes />
        <SideImages />
      </div>

      <div className="my-6 pb-8 relative z-10 w-full">
        <Slider products={sortedBanners} />
      </div>

      <div className="my-4 space-y-6 sm:space-y-10 px-6 sm:px-6 md:px-12 lg:px-20 xl:px-40 relative z-10">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 mt-8 text-center sm:text-right">
            ابدأ دروسك الأن
          </h2>
          {data?.levels ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <LevelsCard
                key={data.levels.id}
                id={data.levels.id}
                title={data.levels.title}
                imagePath={data.levels.imagePath}
              />
            </div>
          ) : (
            <div className="text-gray-500">لا توجد مستويات تعليمية حالياً</div>
          )}



        </div>

        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 mt-12 sm:mt-20 text-center sm:text-right pb-5">
            التقويم الأسبوعي
          </h2>

          <WeeklyCalendar
            calendarData={Array.isArray(data?.calenders) ? data.calenders : []}
          />
        </section>

  
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 mt-12 sm:mt-20 text-center sm:text-right">
            المهارات المتنوعة
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-0 max-w-screen-xl">
            {loadingSkills ? (
              <div className="px-4 text-gray-500">
                جاري تحميل المهارات...
              </div>
            ) : skillsError ? (
              <div className="px-4 text-red-500">
                حدث خطأ أثناء تحميل المهارات
              </div>
            ) : skills.length > 0 ? (
              skills.map((skill) => (
                <VideoCard
                  key={skill.id}
                  video={{
                    id: skill.id,
                   thumbnailUrl: skill.thumbnailUrl,
                    title: skill.title,
                    desc: skill.description,
                    href: `skill_details/${skill.id}`,
                  }}
                />
              ))
            ) : (
              <div className="px-4 text-gray-500">
                لا توجد مهارات حالياً.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;

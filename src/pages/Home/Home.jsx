import React, { useEffect } from 'react';
import Slider from "../../components/Slider/Slider.jsx";
import StageCard from "../../components/Cards/StageCard.jsx";
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

  // ✅ ترتيب البانرز حسب order
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

      {/* ✅ خلفيات و عناصر جانبية */}
      <div className="hidden sm:block">
        <BackgroundShapes />
        <SideImages />
      </div>

      {/* ✅ البانرز */}
      <div className="my-6 pb-8 relative z-10 w-full">
        <Slider products={sortedBanners} />
      </div>

      {/* ✅ المحتوى الرئيسي */}
      <div className="my-4 space-y-6 sm:space-y-10 px-6 sm:px-6 md:px-12 lg:px-20 xl:px-40 relative z-10">

        {/* ✅ المراحل التعليمية */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 mt-8 text-center sm:text-right">
            ابدأ دروسك الأن
          </h2>

          <div>
            {Array.isArray(data?.levels) && data.levels.length > 0 ? (
              <StageCard level={data.levels[0]} />
            ) : (
              <div className="text-gray-500">
                لا توجد مراحل تعليمية متاحة حالياً.
              </div>
            )}
          </div>
        </div>

        {/* ✅ التقويم الأسبوعي */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-4 mt-12 sm:mt-20 text-center sm:text-right pb-5">
            التقويم الأسبوعي
          </h2>

          <WeeklyCalendar
            calendarData={Array.isArray(data?.calenders) ? data.calenders : []}
          />
        </section>

        {/* ✅ المهارات */}
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
                    img: skill.imageUrl,
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

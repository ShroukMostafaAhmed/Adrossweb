import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useGetLessonsByUnitId from "../../hooks/useLessons/useGetLessonsByUnitId";

function Lessons() {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, data, error, getLessonsByUnitId } = useGetLessonsByUnitId();
  
  const state = useMemo(() => {
    const savedState = localStorage.getItem("lessonState");
    const initialState =
      location.state || (savedState ? JSON.parse(savedState) : {});
    localStorage.setItem("lessonState", JSON.stringify(initialState));
    return initialState;
  }, [location.state]);

  useEffect(() => {
    if (state?.unitId) {
      getLessonsByUnitId(state.unitId);
    }
  }, [state?.unitId, getLessonsByUnitId]);

  const lessons = data?.lessons ?? [];
  const unitTitle = data?.unitTitle ?? state.unitTitle ?? "الوحدة";
  const unitDescription =
    data?.unitDescription ?? state.unitDescription ?? "لا يوجد وصف متاح";

  const items = [
    { label: "الرئيسية", href: "/" },
    {
      label: state.stageTitle || "المرحلة",
      href: "/stage_details",
      state: { title: state.stageTitle },
    },
    {
      label: state.levelTitle || "المستوى",
      href: `/level_details/${state.levelId}`,
      state,
    },
    {
      label: state.subjectTitle || "المادة",
      href: `/units/${state.subjectId}`,
      state,
    },
    { label: unitTitle },
  ];

  const handleCardClick = (lesson) => {
    navigate(`/app/lesson_details/${lesson.id}`, {
      state: { title: lesson.title },
    });
  };

  return (
    <div className="min-h-screen pb-8 sm:pb-12 md:pb-16">
      {/* Breadcrumb */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <Breadcrumb items={items} />
      </div>

      {/* Banner Section */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <BannerCard
            imageSrc="/stage1.png"
            imageAlt="Stage Banner"
            title={unitTitle}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Unit Description Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-5 md:p-6 lg:p-8">
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800 mb-3 sm:mb-4">
                هذه الوحدة تتحدث عن:
              </h2>

              {loading ? (
                <div className="text-sm sm:text-base md:text-lg text-gray-600 animate-pulse">
                  جاري تحميل الوصف...
                </div>
              ) : (
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {unitDescription}
                </p>
              )}
            </div>
          </div>

          {/* Lessons Section Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 text-gray-800">
            اختر الدرس
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                جاري تحميل الدروس...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 gap-3 sm:gap-4">
              <p className="text-base sm:text-lg md:text-xl text-red-600 text-center">
                ⚠️ {error}
              </p>
              <button
                onClick={() => getLessonsByUnitId(state.unitId)}
                className="px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && lessons.length === 0 && (
            <div className="flex items-center justify-center py-12 sm:py-16 md:py-20">
              <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
                لا توجد دروس متاحة لهذه الوحدة حالياً
              </p>
            </div>
          )}

          {/* Lessons Grid */}
          {!loading && !error && lessons.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  color="blue"
                  text={lesson.title}
                  number={
                    <img
                      src="/logo.png"
                      alt={lesson.title}
                      className="w-10 h-10 sm:w-12 sm:h-12"
                    />
                  }
                  onClick={() => handleCardClick(lesson)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lessons;
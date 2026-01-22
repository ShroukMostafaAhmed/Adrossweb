import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useGetLessonsByUnitId from "../../hooks/useLessons/useGetLessonsByUnitId";

function Lessons() {
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, data, error, getLessonsByUnitId } =
    useGetLessonsByUnitId();
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
    <>
      <Breadcrumb items={items} />

      {/* Banner */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={unitTitle}
        />
      </div>

      {/* Unit Details */}
      <div className="max-w-6xl mx-35 mb-10 px-6">
        <div className="text-gray-700 mb-8 leading-relaxed">
          <span className="font-bold text-2xl text-gray-800 block">
            هذه الوحدة تتحدث عن:
          </span>

          {loading ? (
            <div className="pt-5 text-xl">جاري تحميل الوصف...</div>
          ) : (
            <div className="pt-5 text-xl">{unitDescription}</div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-6">اختر الدرس</h2>

        {loading && (
          <div className="text-center py-10 text-xl">
            جاري تحميل الدروس...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-red-600 text-xl">
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && lessons.length === 0 && (
          <div className="text-center py-10 text-gray-600 text-xl">
            لا توجد دروس متاحة لهذه الوحدة حالياً
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              color="blue"
              text={lesson.title}
              number={
                <img
                  src="/logo.png"
                  alt={lesson.title}
                  className="w-12 h-12"
                />
              }
              onClick={() => handleCardClick(lesson)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Lessons;

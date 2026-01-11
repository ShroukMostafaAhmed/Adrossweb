import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import useGetLessonsByUnitId from "../../hooks/useLessons/useGetLessonsByUnitId";

function Lessons() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, lessons, error, getLessonsByUnitId } = useGetLessonsByUnitId();

  const state = useMemo(() => {
    const savedState = localStorage.getItem("lessonState");
    const initialState = location.state || (savedState ? JSON.parse(savedState) : {});
    localStorage.setItem("lessonState", JSON.stringify(initialState));
    return initialState;
  }, [location.state]);

  const items = [
    { label: "الرئيسية", href: "/" },
    { label: state.stageTitle || "المرحلة", href: "/stage_details", state: { title: state.stageTitle } },
    { label: state.levelTitle || "المستوى", href: `/level_details/${state.levelId}`, state },
    { label: state.subjectTitle || "المادة", href: `/units/${state.subjectId}`, state },
    { label: state.unitTitle || "الوحدة" }
  ];

  useEffect(() => {
    if (!state?.unitId) return;
    getLessonsByUnitId(state.unitId);
  }, [state?.unitId, getLessonsByUnitId]);

  const handleCardClick = (lesson) => {
    navigate(`/lesson_details/${lesson.id}`, { state: { title: lesson.title } });
  };

  // Extract unit info from lessons response
  const unitTitle = lessons.length > 0 ? state.unitTitle : null;
  const unitDescription = state.unitDescription || "هذا الوصف للاختبار";

  return (
    <>
      <Breadcrumb items={items} />

      {/* Banner */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={state.unitTitle || "الوحدة"}
        />
      </div>

      {/* Unit Details Section */}
      <div className="max-w-6xl mx-35 mb-10 px-6">
        {!loading && !error && (

          <div>
            <p className="text-gray-700  mb-4 leading-relaxed">
              <span className="font-bold text-2xl  text-gray-800">هذه الوحدة تتحدث عن:</span> <br />
              <div className=" pt-5 text-xl">{unitDescription}</div>
            </p>
          </div>

        )}
        <br />

        <h2 className="text-2xl font-bold mb-6">اختر الدرس</h2>

        {loading && (
          <div className="text-center py-10 text-xl">جاري تحميل الدروس...</div>
        )}

        {error && (
          <div className="text-center py-10 text-red-600 text-xl">⚠️ {error}</div>
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
              id={lesson.id}
              color="blue"
              text={lesson.title}
              number={<img src="/logo.png" alt={lesson.title} className="w-12 h-12" />}
              onClick={() => handleCardClick(lesson)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Lessons;
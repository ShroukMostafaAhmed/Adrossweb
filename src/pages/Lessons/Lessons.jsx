import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useGetLessonsByUnitId from '../../hooks/useLessons/useGetLessonsByUnitId';

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
    { label: state.title || "المرحلة", href: "/stage_details", state: { title: state.title } },
    { label: state.subtitle || "المستوى", href: "/level_details/" + state.levelId, state },
    { label: state.text || "المادة" }
  ];

  useEffect(() => {
    if (!state?.id) return;
    getLessonsByUnitId(state.id);
  }, [state?.id, getLessonsByUnitId]);

  const handleCardClick = (lesson) => {
    navigate(`/lesson_details/${lesson.id}`, { state: { title: lesson.title } });
  };

  return (
    <>
      <Breadcrumb items={items} />
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={state.title}
        />
      </div>

      <div className="flex flex-col gap-4 px-6 pr-35">
        <h2 className="text-2xl font-bold py-4">اختر الدرس</h2>

        {loading && <p>جاري تحميل الدروس...</p>}
        {error && <p className="text-red-600">⚠️ {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10 mx-auto">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              id={lesson.id}
              color="blue"
              text={lesson.title}
              number={<img src="/english.png" alt={lesson.title} className="w-12 h-12" />}
              onClick={() => handleCardClick(lesson)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Lessons;

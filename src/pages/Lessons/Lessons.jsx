import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useLessonBySubjectId from '../../hooks/useLessons/useGetLessonBySubjectId.jsx';

function Lessons() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, levels: lessons, error, getLessonBySubjectId } = useLessonBySubjectId();

  const [state] = useState(() => {
    const savedState = localStorage.getItem("lessonState");
    return location.state || (savedState ? JSON.parse(savedState) : {});
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state) {
      localStorage.setItem("lessonState", JSON.stringify(state));
      setItems([
        { label: "الرئيسية", href: "/" },
        { label: state.title || "المرحلة", href: "/stage_details", state: { title: state.title } },
        { label: state.subtitle || "المستوى", href: "/level_details/" + state.levelId, state },
        { label: state.text || "المادة" }
      ]);
    }
  }, [state]);

  useEffect(() => {
    if (state?.id) {
      getLessonBySubjectId(state.id);
    }
  }, [state, getLessonBySubjectId]);
  const handleCardClick = (lesson) => {
    navigate(`/lesson_details/${lesson.id}`, { state: { title: lesson.name } });
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

      <div className="flex flex-col gap-4 px-6">
        <h2 className="text-2xl font-bold py-4">اختر الدرس</h2>

        {loading && <p>جاري تحميل الدروس...</p>}
        {error && <p className="text-red-600">⚠️ {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
          {(lessons || []).map((lesson) => (
            <Card
              key={lesson.id}
              id={lesson.id}
              color="blue"
              text={lesson.name}
              number={<img src={lesson.imageUrl || "/lesson.png"} alt={lesson.name} className="w-8 h-8" />}
              onClick={() => handleCardClick(lesson)}
              href="/lesson_details"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Lessons;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useSubjectByLevelId from "../../hooks/useSubjects/useSubjectByLevelId.js";

function LevelDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { levels: subjects, loading, error, getSubjectByLevelId } = useSubjectByLevelId();

  const [items, setItems] = useState([]);

  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem("levelDetailsState");
    return location.state || (savedState ? JSON.parse(savedState) : {});
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem("levelDetailsState", JSON.stringify(state));
      setItems([
        { label: "الرئيسية", href: "/" },
        { label: state.title || "المرحلة", href: "/stage_details", state: { title: state.title } },
        { label: state.text || "المستوى" }
      ]);
    }
  }, [state]);

  useEffect(() => {
    getSubjectByLevelId(id);
  }, [id, getSubjectByLevelId]);

  const handleCardClick = (sub) => {
    const newState = {
      id: sub.id,
      title: location.state?.title || JSON.parse(localStorage.getItem("stageDetailsState"))?.title,
      subtitle: location.state?.text || "",
      text: sub.title
    };
    setState(newState);
    navigate(`/app/units/${sub.id}`, { state: newState });
  };

  useEffect(() => {
    if (!state?.title) {
      const savedState = JSON.parse(localStorage.getItem("stageDetailsState"));
      if (savedState) {
        setState(savedState);
      }
    }
  }, []);

  return (
    <div className="min-h-screen pb-8">
      {/* Breadcrumb */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8">
        <Breadcrumb items={items} />
      </div>

      {/* Banner */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 mb-6 sm:mb-8">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={state.title || "المستوى"}
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div dir="rtl" className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
            اختر المادة
          </h2>

          {loading && (
            <p className="text-base sm:text-lg text-center py-6">جاري تحميل المواد...</p>
          )}
          {error && (
            <p className="text-base sm:text-lg text-red-600 text-center py-6">⚠️ {error}</p>
          )}
          {!loading && !error && (subjects || []).length === 0 && (
            <p className="text-base sm:text-lg text-gray-600 text-center py-6">
              لا توجد مواد متاحة لهذا المستوى حالياً
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-10">
            {(subjects || []).map((sub) => (
              <Card
                key={sub.id}
                id={sub.id}
                color="blue"
                text={sub.title}
                number={
                  <img
                    src="/logo.png"
                    alt={sub.title}
                    className="w-10 h-10 sm:w-12 sm:h-12"
                  />
                }
                onClick={() => handleCardClick(sub)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LevelDetails;

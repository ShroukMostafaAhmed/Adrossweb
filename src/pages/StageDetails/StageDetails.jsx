import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import LevelsCard from "../../components/LevelsCard.jsx";

import useGetLevelsByStageId from "../../hooks/useLevels/useGetLevelsByStageId.jsx";

function StageDetails() {
  const { id } = useParams(); // stage id from URL
  const navigate = useNavigate();
  const location = useLocation();

  const { levels, loading, error, getLevelsByStageId } =
    useGetLevelsByStageId();

  const [items, setItems] = useState([]);

  // ✅ get state from navigate OR localStorage
  const [state] = useState(() => {
    const savedState = localStorage.getItem("stageDetailsState");
    return location.state || (savedState ? JSON.parse(savedState) : {});
  });

  // ✅ FIX: GET levels ONLY when id changes
  useEffect(() => {
    if (!id) return;
    getLevelsByStageId(id);
  }, [id]); // ❌ removed getLevelsByStageId from deps

  // breadcrumb + persist state
  useEffect(() => {
    if (state?.title) {
      localStorage.setItem("stageDetailsState", JSON.stringify(state));
      setItems([
        { label: "الرئيسية", href: "/" },
        { label: state.title },
      ]);
    }
  }, [state]);

  const handleCardClick = (level) => {
    navigate("/app/level_details/" + level.id, {
      state: {
        id: level.id,
        title: state.title,
        text: level.title,
        imagePath: level.imagePath,
      },
    });
  };

  return (
    <div dir="rtl">
      <Breadcrumb items={items} />

      {/* Banner */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={state?.title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <h2 className="text-xl sm:text-2xl font-bold py-6">
          الصف الدراسي
        </h2>

        {loading ? (
          <p className="text-center py-8">جاري التحميل...</p>
        ) : error ? (
          <p className="text-red-600 text-center py-8">
            حدث خطأ أثناء جلب الصفوف
          </p>
        ) : levels?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level) => (
              <LevelsCard
                key={level.id}
                id={level.id}
                title={level.title}
                image={level.imagePath}
                description={level.description}
                onClick={() => handleCardClick(level)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-8">لا توجد صفوف للعرض</p>
        )}
      </div>
    </div>
  );
}

export default StageDetails;

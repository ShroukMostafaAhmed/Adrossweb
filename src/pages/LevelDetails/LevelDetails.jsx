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
      title: location.state?.title || localStorage.getItem("stageDetailsState"),
      subtitle: location.state?.text || "",
      text: sub.title
    };
    setState(newState);
    navigate('/Units', { state: newState });
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
        <h2 className="text-2xl font-bold py-4">اختر المادة</h2>

        {loading && <p>جاري تحميل المواد...</p>}
        {error && <p className="text-red-600">⚠️ {error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10 ">
          {(subjects || []).map((sub) => (
            <Card
              key={sub.id}
              id={sub.id}
              href={"/Units"}
              color="blue"
              text={sub.title}
              number={<img src="/english.png" alt={sub.name} className="w-12 h-12" />}
              onClick={() => handleCardClick(sub)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default LevelDetails;

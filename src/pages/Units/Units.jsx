import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useGetUnitsBySubjectId from "../../hooks/useUnits/useGetUnitsBySubjectId.jsx";

function Units() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, units, error, getUnitsBySubjectId } =
        useGetUnitsBySubjectId();

    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem("unitState");
        return location.state || (savedState ? JSON.parse(savedState) : {});
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        const finalState = {
            ...state,
            subjectId: id || state?.subjectId,
        };

        setState(finalState);
        localStorage.setItem("unitState", JSON.stringify(finalState));

        setItems([
            { label: "الرئيسية", href: "/" },
            {
                label: finalState.stageTitle || "المرحلة",
                href: "/stage_details",
                state: { title: finalState.stageTitle },
            },
            {
                label: finalState.levelTitle || "المستوى",
                href: `/level_details/${finalState.levelId}`,
                state: finalState,
            },
            { label: finalState.subjectTitle || "المادة" },
        ]);
    }, [id]);

    useEffect(() => {
        const subjectId = id || state?.subjectId;
        if (subjectId) {
            getUnitsBySubjectId(subjectId);
        }
    }, [id, state?.subjectId, getUnitsBySubjectId]);

    const handleCardClick = (unit) => {
        navigate(`/app/lessons/${unit.id}`, {
            state: {
                ...state,
                unitId: unit.id,
                unitTitle: unit.title,
            },
        });
    };

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
                    imageAlt="Subject Banner"
                    title={state.subjectTitle || "الوحدات الدراسية"}
                />
            </div>

            {/* Content */}
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
                <div dir="rtl" className="mb-6 sm:mb-8">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                        اختر الوحدة
                    </h2>

                    {loading && (
                        <div className="text-center py-10 text-base sm:text-lg">
                            جاري تحميل الوحدات...
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-10 text-red-600 text-base sm:text-lg">
                            ⚠️ {error}
                        </div>
                    )}

                    {!loading && !error && units.length === 0 && (
                        <div className="text-center py-10 text-gray-600 text-base sm:text-lg">
                            لا توجد وحدات متاحة لهذه المادة حالياً
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {units.map((unit) => (
                            <Card
                                key={unit.id}
                                id={unit.id}
                                color="blue"
                                text={unit.title}
                                number={
                                    <img
                                        src="/logo.png"
                                        alt={unit.title}
                                        className="w-10 h-10 sm:w-12 sm:h-12"
                                    />
                                }
                                description={
                                    unit.description
                                        ? `${unit.description.slice(0, 50)}...`
                                        : "لا يوجد وصف"
                                }
                                onClick={() => handleCardClick(unit)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Units;

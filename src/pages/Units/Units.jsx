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

    // جلب الوحدات حسب subjectId
    useEffect(() => {
        const subjectId = id || state?.subjectId;
        if (subjectId) {
            getUnitsBySubjectId(subjectId);
        }
    }, [id, state?.subjectId, getUnitsBySubjectId]);

    // الانتقال لصفحة الدروس
    const handleCardClick = (unit) => {
        navigate(`/lessons/${unit.id}`, {
            state: {
                ...state,
                unitId: unit.id,
                unitTitle: unit.title,
            },
        });
    };

    return (
        <>
            <Breadcrumb items={items} />

            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
                <BannerCard
                    imageSrc="/stage1.png"
                    imageAlt="Subject Banner"
                    title={state.subjectTitle || "الوحدات الدراسية"}
                />
            </div>

            <div className="flex flex-col gap-4 px-6 pr-35">
                <h2 className="text-2xl font-bold py-4">اختر الوحدة</h2>

                {loading && (
                    <div className="text-center py-10 text-xl">
                        جاري تحميل الوحدات...
                    </div>
                )}

                {error && (
                    <div className="text-center py-10 text-red-600 text-xl">
                        ⚠️ {error}
                    </div>
                )}

                {!loading && !error && units.length === 0 && (
                    <div className="text-center py-10 text-gray-600 text-xl">
                        لا توجد وحدات متاحة لهذه المادة حالياً
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
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
                                    className="w-12 h-12"
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
        </>
    );
}

export default Units;

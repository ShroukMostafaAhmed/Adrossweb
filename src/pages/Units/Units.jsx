import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useUnitsBySubjectId from '../../hooks/useUnits/useGetUnitsBySubjectId.jsx';

function Units() {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading, units, error, getUnitsBySubjectId } = useUnitsBySubjectId();

    const [state] = useState(() => {
        const savedState = localStorage.getItem("unitState");
        return location.state || (savedState ? JSON.parse(savedState) : {});
    });

    const [items, setItems] = useState([]);

    useEffect(() => {
        if (state) {
            localStorage.setItem("unitState", JSON.stringify(state));
            setItems([
                { label: "الرئيسية", href: "/" },
                { label: state.stageTitle || "المرحلة", href: "/stage_details", state: { title: state.stageTitle } },
                { label: state.levelTitle || "المستوى", href: "/level_details/" + state.levelId, state },
                { label: state.subjectTitle || "المادة" }
            ]);
        }
    }, [state]);

    useEffect(() => {
        if (state?.subjectId) {
            getUnitsBySubjectId(state.subjectId);
        }
    }, [state, getUnitsBySubjectId]);

    const handleCardClick = (unit) => {
        navigate(`/unit/${unit.id}`, {
            state: {
                ...state,
                unitTitle: unit.title,
                unitId: unit.id
            }
        });
    };

    return (
        <>
            <Breadcrumb items={items} />
            <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
                <BannerCard
                    imageSrc="/stage1.png"
                    imageAlt="Stage Banner"
                    title={state.subjectTitle || "الوحدات الدراسية"}
                />
            </div>

            <div className="flex flex-col gap-4 px-6 pr-35">
                <div className="flex flex-row justify-start items-center gap-6">

                    <h2 className="text-2xl font-bold py-4">اختر الوحدة</h2>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-10">
                        <p className="text-xl">جاري تحميل الوحدات...</p>
                    </div>
                )}

                {error && (
                    <div className="text-red-600 text-center py-4">
                        <p className="text-xl">⚠️ {error}</p>
                    </div>
                )}

                {!loading && !error && units && units.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-xl text-gray-600">لا توجد وحدات متاحة لهذه المادة حالياً</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {(units || []).map((unit) => (
                        <Card
                            key={unit.id}
                            id={unit.id}
                            color="blue"
                            text={unit.title}
                            number={<img src="/unit-icon.png" alt={unit.title} className="w-12 h-12" />}
                            description={unit.description ? `${unit.description.substring(0, 50)}...` : ''}
                            onClick={() => handleCardClick(unit)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Units;
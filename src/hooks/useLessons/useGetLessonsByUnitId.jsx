// useGetLessonsByUnitId.jsx
import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetLessonsByUnitId() {

    const [loading, setLoading] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null);

    const getLessonsByUnitId = useCallback(async (unitId) => {
        if (!unitId) return;

        setLoading(true);
        setError(null);

        try {
            const res = await AxiosInstance.get(
                `/api/Lessons/Get-Lessons-by-UnitId/${unitId}`
            );

            if (res.data.statusCode === 200) {
                const data = res.data.data;
                setLessons(Array.isArray(data.lessons) ? data.lessons : []);
            } else {
                throw new Error(res.data.message || "فشل في جلب الدروس");
            }

        } catch (err) {
            setError(err.message || "حدث خطأ أثناء جلب الدروس");
            setLessons([]);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, lessons, error, getLessonsByUnitId };
}

export default useGetLessonsByUnitId;

import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetUnitsBySubjectId() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState([]);

    const getUnitsBySubjectId = useCallback(async (subjectId) => {
        if (!subjectId) return;

        setLoading(true);
        setError(null);

        try {
            const res = await AxiosInstance.get(
                `/api/Units/Get-Units-by-subject/${subjectId}`
            );
            if (res.data?.statusCode === 200) {
                setUnits(Array.isArray(res.data.data) ? res.data.data : []);
            } else {
                throw new Error(res.data?.message || "فشل في جلب الوحدات");
            }
        } catch (err) {
            setUnits([]);
            setError(
                err.response?.data?.message ||
                err.message ||
                "حدث خطأ أثناء تحميل الوحدات"
            );
            console.error("Get Units Error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        getUnitsBySubjectId,
        units,
        loading,
        error,
    };
}

export default useGetUnitsBySubjectId;

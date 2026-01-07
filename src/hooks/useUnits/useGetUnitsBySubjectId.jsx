import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetUnitsBySubjectId() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [units, setUnits] = useState([]);

    const getUnitsBySubjectId = useCallback(async (subjectId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await AxiosInstance.get(`/api/Units/subject/${subjectId}`);
            if (res.data && res.data.statusCode === 200) {
                setUnits(res.data.data || []);
            } else {
                throw new Error(res.data?.message || "فشل في جلب الوحدات");
            }
        } catch (err) {
            setError(err.message || "حدث خطأ أثناء تحميل الوحدات");
            console.error("Error fetching units:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    return { getUnitsBySubjectId, units, loading, error };
}

export default useGetUnitsBySubjectId;
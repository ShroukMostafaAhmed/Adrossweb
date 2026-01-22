import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetLessonsByUnitId() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getLessonsByUnitId = useCallback(async (unitId) => {
    if (!unitId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await AxiosInstance.get(
        `/api/Lessons/Get-Lessons-by-UnitId/${unitId}`
      );

      if (res.data?.statusCode === 200) {
        setData(res.data.data); 
      } else {
        throw new Error(res.data?.message || "فشل في جلب الدروس");
      }
    } catch (err) {
      setData(null);
      setError(
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ أثناء جلب الدروس"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, data, error, getLessonsByUnitId };
}


export default useGetLessonsByUnitId;

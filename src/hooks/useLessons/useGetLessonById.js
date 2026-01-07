import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetLessonById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lesson, setLesson] = useState(null);

  const getLessonById = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`/api/Lessons/${lessonId}`);
      if (res.data && res.data.statusCode === 200) {
        setLesson(res.data.data);
      } else {
        throw new Error(res.data?.message || "فشل في جلب بيانات الدرس");
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تحميل الدرس");
      console.error("Error fetching lesson:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getLessonById, lesson, loading, error, setLesson };
}

export default useGetLessonById;
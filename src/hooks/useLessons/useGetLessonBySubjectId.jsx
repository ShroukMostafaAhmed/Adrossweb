// useGetLevelsByStageId.jsx
import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useLessonBySubjectId() {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);

  const getLessonBySubjectId = useCallback(async (subjectId) => {
    if (!subjectId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`/Lesson/by-subject/${subjectId}`);

      // نفترض الـ API يرجع statusCode = 0 للنجاح
      if (res.data.statusCode === 200) {
        setLevels(res.data.data || []);
      } else {
        throw new Error(res.data.message || "فشل في جلب الصفوف");
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء جلب الصفوف");
      setLevels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, levels, error, getLessonBySubjectId };
}

export default useLessonBySubjectId;

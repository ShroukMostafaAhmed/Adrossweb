import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetLessonById() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lesson, setLesson] = useState(null);

  const getLessonById = async (lessonId) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get(`/api/Lessons/${lessonId}`);
      setLesson(res.data.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching lesson:", err);
    } finally {
      setLoading(false);
    }
  };

  return { getLessonById, lesson, loading, error };
}

export default useGetLessonById;

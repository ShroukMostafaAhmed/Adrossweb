import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useUpdateLesson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLesson = async (lessonId, data) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.put(`/Lessons/update/${lessonId}`, data);
      if (
        res.data.statusCode === 200 ||
        res.data.message?.toLowerCase().includes("updated")
      ) {
        Swal.fire({
          icon: "success",
          title: "تم تعديل الدرس بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "خطاء في تعديل الدرس",
        text: err.response?.data.title || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { updateLesson, loading, error };
}

export default useUpdateLesson;

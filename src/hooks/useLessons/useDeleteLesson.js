import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useDeleteLesson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLesson = async (lessonId) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.delete(`/Lessons/delete/${lessonId}`);
      if (
        res.data.statusCode === 200 ||
        res.data.message?.toLowerCase().includes("deleted")
      ) {
        Swal.fire({
          icon: "success",
          title: "تم حذف الدرس بنجاح",
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
        title: "خطاء في حذف الدرس",
        text: err.response?.data.title || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { deleteLesson, loading, error };
}

export default useDeleteLesson;

import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useUpdateSubject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSubject = async (id, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.put(`/Subjects/${id}`, data);
      if (
        res.data.statusCode === 200 ||
        res.data.message?.toLowerCase().includes("updated")
      ) {
        Swal.fire({
          icon: "success",
          title: "تم تعديل المادة بنجاح",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "خطأ في التعديل",
        text: err.response?.data.title || err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSubject, isLoading, error };
}

export default useUpdateSubject;

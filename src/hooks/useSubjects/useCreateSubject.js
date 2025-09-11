import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useCreateSubject() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSubject = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.post("/Subjects", data);
      if (
        res.data.statusCode === 201 ||
        res.data.message?.toLowerCase().includes("created")
      ) {
        Swal.fire({
          icon: "success",
          title: "تم إضافة المادة بنجاح",
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
        title: "خطأ في الإضافة",
        text: err.response?.data.title || err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createSubject, isLoading, error };
}

export default useCreateSubject;

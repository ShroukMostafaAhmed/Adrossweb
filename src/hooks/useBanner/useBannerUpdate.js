import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useBannerUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateBanner = async (bannerId, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.put(`api/Banners/update/${bannerId}`, data);
      if (
        res.data.statusCode === 200 ||
        res.data.message?.toLowerCase().includes("updated")
      ) {
        Swal.fire({
          icon: "success",
          title: "تم تحديث البانر بنجاح",
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
        title: "خطاء في تحديث البانر",
        text: err.response?.data.title || err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { updateBanner, isLoading, error };
}

export default useBannerUpdate;

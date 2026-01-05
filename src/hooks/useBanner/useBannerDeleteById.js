import { useState } from "react";
import Swal from "sweetalert2";
import useBannerViewAll from "./useBannerViewAll.js";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function UseBannerDeleteById() {
  const { gettingAllBanners } = useBannerViewAll();

  // States
  const [loading, setLoading] = useState(false);

  const deleteBannerById = async (bannerId) => {
    setLoading(true);
    await AxiosInstance.delete(`api/Banners/delete/${bannerId}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "تم حذف البانر بنجاح",
            showConfirmButton: true,
            timer: 3500,
          }).then(() => {
            gettingAllBanners();
          });
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // Catch errors that happen during the request or response parsing
        Swal.fire({
          icon: "error",
          title: "خطاء في حذف البانر",
          text:
            err.response.data.title ||
            err.response.data.message ||
            "Request failed",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { deleteBannerById, loading };
}

export default UseBannerDeleteById;

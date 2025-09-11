import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import useBannerViewAll from "./useBannerViewAll.js";
import Swal from "sweetalert2";

function useAddBanner() {
  const { gettingAllBanners } = useBannerViewAll();

  // States
  const [loading, setLoading] = useState(false);

  const addBanner = async (data) => {
    setLoading(true);
    await AxiosInstance.post("/banners/create", data)
      .then((res) => {
        console.log(res);

        if (res.data.statusCode === 201) {
          Swal.fire({
            icon: "success",
            title: "تم اضافة البانر بنجاح",
            showConfirmButton: true,
            timer: 3500,
          }).then(() => {
            gettingAllBanners(); // Fetch updated banners
          });
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // Catch errors that happen during the request or response parsing
        Swal.fire({
          icon: "error",
          title: "خطاء في اضافة البانر",
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

  return { loading, addBanner };
}

export default useAddBanner;

import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useBannerViewAll() {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  const gettingAllBanners = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get("api/Banners");
      if (res.data.statusCode === 200 || res.data.message === "Banner List") {
        setBanners(res.data.data);
      } else {
        throw new Error(res.data.message || "فشل في جلب البيانات");
      }
    } catch (err) {
      setBanners([]);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { banners, isLoading, error, gettingAllBanners };
}

export default useBannerViewAll;

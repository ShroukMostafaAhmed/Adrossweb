import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useBannerById() {
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState(null);
  const [error, setError] = useState(null);

  const getBannerById = async (bannerId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`/Banners/${bannerId}}`);
      if (res.data.statusCode === 200) {
        setBanner(res.data.data);
      } else {
        throw new Error(res.data.message || "فشل في جلب البانر");
      }
    } catch (err) {
      setBanner(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { banner, isLoading, error, getBannerById };
}

export default useBannerById;

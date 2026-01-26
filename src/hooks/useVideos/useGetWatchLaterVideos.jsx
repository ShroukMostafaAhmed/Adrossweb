import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetWatchLaterVideos() {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const fetchWatchLaterVideos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await AxiosInstance.get("api/Video/watchlater");

      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        setVideos([]);
        throw new Error("فشل في تحميل فيديوهات المفضلة");
      }

    } catch (err) {
      console.error("Error fetching watch later videos:", err);
      setVideos([]);
      setError(
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ في تحميل فيديوهات المفضلة"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchWatchLaterVideos,
    videos,
    isLoading,
    error,
  };
}

export default useGetWatchLaterVideos;

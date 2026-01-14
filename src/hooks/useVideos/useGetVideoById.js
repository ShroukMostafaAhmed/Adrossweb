import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetVideoById() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  const fetchVideoById = async (videoId) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`api/Video/${videoId}`);
     
      if (res.data && res.data.id) {
        setVideoData(res.data);
      } else {
        throw new Error("فشل في تحميل الفيديو");
      }
    } catch (err) {
      console.error("Error fetching video:", err);
      setVideoData(null);
      setError(err.response?.data?.message || err.message || "حدث خطأ في تحميل الفيديو");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchVideoById, videoData, isLoading, error };
}

export default useGetVideoById;
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
      const res = await AxiosInstance.get(`/Video/${videoId}`);
      if (res.data.statusCode === 200) {
        setVideoData(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setVideoData(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchVideoById, videoData, isLoading, error };
}

export default useGetVideoById;

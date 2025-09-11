import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetHomeData() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get("/Home");
      if (res.data.statusCode === 200) {
        setData(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setData(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchHomeData, data, isLoading, error };
}

export default useGetHomeData;

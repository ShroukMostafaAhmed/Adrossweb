import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

const useGetProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/api/Student/profile");
        setData(response.data.data || {});
      } catch (err) {
        console.error(err);
        setError("فشل تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetProfile;

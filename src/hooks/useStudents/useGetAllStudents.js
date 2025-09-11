import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetAllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllStudents = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/Students");
      setStudents(response.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return { students, loading, error };
}

export default useGetAllStudents;

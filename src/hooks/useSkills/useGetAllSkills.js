import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useGetAllSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get("/api/Skills/GetAllSkills");
      setSkills(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return { skills, loading, error, refetch: fetchSkills };
}

export default useGetAllSkills;

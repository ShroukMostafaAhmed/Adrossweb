import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetSubjects() {
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const getSubjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get("/Subjects");
      if (res.data.statusCode === 200) {
        setSubjects(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setSubjects([]);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getSubjects, subjects, isLoading, error };
}

export default useGetSubjects;

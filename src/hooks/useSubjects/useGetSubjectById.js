import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetSubjectById() {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(null);

  const getSubjectById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`/Subjects/${id}`);
      if (res.data.statusCode === 200) {
        setSubject(res.data.data);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      setSubject(null);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getSubjectById, subject, isLoading, error };
}

export default useGetSubjectById;

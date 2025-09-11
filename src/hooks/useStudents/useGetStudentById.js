// src/hooks/useStudents/useGetStudentById.js
import { useEffect, useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetStudentById(id) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getStudent = async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get(`/Students/${id}`);
      setStudent(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getStudent();
  }, [id]);

  return { student, loading, error };
}

export default useGetStudentById;

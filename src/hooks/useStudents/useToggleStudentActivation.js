// src/hooks/useStudents/useToggleStudentActivation.js
import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useToggleStudentActivation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleActivation = async (id) => {
    setLoading(true);
    try {
      const response = await AxiosInstance.patch(`/Students/${id}/activation`);

      if (!response) {
        throw new Error("No response from server");
      }

      const statusCode = response.status;

      if ([200, 201, 204].includes(statusCode)) {
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          error: new Error(`Unexpected status code: ${statusCode}`),
        };
      }
    } catch (err) {
      setError(err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { toggleActivation, loading, error };
}

export default useToggleStudentActivation;

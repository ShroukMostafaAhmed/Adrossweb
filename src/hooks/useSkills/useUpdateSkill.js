import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useUpdateSkill() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSkill = async (skillId, data) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.put(`/Skills/update/${skillId}`, data);
      return res.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateSkill, loading, error };
}

export default useUpdateSkill;

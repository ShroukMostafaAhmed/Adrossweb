import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useCreateSkill() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSkill = async (data) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.post("/api/Skills/CreateSkill", data);
      return res.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { createSkill, loading, error };
}

export default useCreateSkill;

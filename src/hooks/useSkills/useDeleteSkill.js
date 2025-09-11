import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useDeleteSkill() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteSkill = async (skillId) => {
    setLoading(true);
    try {
      await AxiosInstance.delete(`/Skills/delete/${skillId}`);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteSkill, loading, error };
}

export default useDeleteSkill;

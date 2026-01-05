import { useState, useEffect, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useGetSkillById(skillId) {
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSkill = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get(`/api/Skills/${skillId}`);
      setSkill(res.data); // only use the "data" key
      setError(null); // clear any previous error
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [skillId]);

  useEffect(() => {
    if (skillId) fetchSkill();
  }, [skillId, fetchSkill]);

  return { skill, loading, error };
}

export default useGetSkillById;

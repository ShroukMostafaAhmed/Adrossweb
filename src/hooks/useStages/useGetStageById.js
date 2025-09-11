import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetStageById() {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState({});
  const [error, setError] = useState(null);

  const getStageById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await AxiosInstance.get(`/stages/${id}`);
      if (
        res.data.statusCode === 200 ||
        res.data.message === "Banner Retrieved Successfully"
      ) {
        setStage(res.data.data);
      } else {
        throw new Error(res.data.message || "فشل في جلب المرحلة");
      }
    } catch (err) {
      setError(err);
      setStage({});
    } finally {
      setLoading(false);
    }
  };

  return { loading, stage, error, getStageById };
}

export default useGetStageById;

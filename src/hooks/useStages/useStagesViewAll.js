import React, { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useStagesViewAll() {
  // حالة المراحل وقائمة تحميل
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllStages = async () => {
    setLoading(true);
    try {
      const res = await AxiosInstance.get("/stages/all");
      if (res.data.statusCode === 200 || res.data.message === "Stages List") {
        setStages(res.data.data);
      } else {
        throw new Error(res.data.message || "فشل في جلب المراحل");
      }
    } catch (err) {
      setStages([]);
      console.error(err); // ممكن تضيف لوغ للأخطاء
    } finally {
      setLoading(false);
    }
  };

  return { stages, loading, getAllStages };
}

export default useStagesViewAll;

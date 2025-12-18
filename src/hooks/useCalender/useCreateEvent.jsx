import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = async (eventData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Send data in the format expected by the API
      const response = await AxiosInstance.post("/api/StudentCalenders/Create", {
        date: eventData.date, // ISO date string
        notes: eventData.notes, // Keep as notes
        color: eventData.color, // Color value
      });

      console.log("Create event response:", response.data);
      setIsLoading(false);

      // Return the created event data
      return response.data.data || response.data;
    } catch (err) {
      console.error("Create event error:", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "حدث خطأ غير متوقع أثناء إرسال البيانات";
      setError(message);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  return {
    createEvent,
    isLoading,
    error,
  };
};

export default useCreateEvent;

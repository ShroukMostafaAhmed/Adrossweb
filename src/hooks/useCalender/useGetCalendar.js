import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetCalendar() {
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [error, setError] = useState(null);

  const fetchCalendarData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Use the correct endpoint from API documentation
      const res = await AxiosInstance.get("/api/Calenders");
      if (res.status === 200) {
        // The API returns an array directly, not wrapped in a data property
        const data = res.data;
        setCalendarData(Array.isArray(data) ? data : []);
        console.log("Fetched calendar data:", data);
      } else {
        throw new Error(res.data.message || "Failed to fetch calendar data");
      }
    } catch (err) {
      console.error("Fetch calendar error:", err);
      setCalendarData([]);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchCalendarData, calendarData, isLoading, error };
}

export default useGetCalendar;

import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function UseGettingAllLesson() {
  const [loading, setLoading] = useState(false);
  const [lessons, setLessons] = useState([]);

  const getAllLessons = async () => {
    setLoading(true);
    await AxiosInstance.get("/lessons")
      .then((res) => {
        if (
          res.data.statusCode == 200 ||
          res.data.statusCode == 201 ||
          res.data.message == "Lessons List"
        ) {
          setLessons(res.data.data);
        }
        if (res.data.statusCode != 200) {
          throw new Error(res.data.message);
        }
      })
      .catch(() => {
        setLessons([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, lessons, getAllLessons };
}

export default UseGettingAllLesson;

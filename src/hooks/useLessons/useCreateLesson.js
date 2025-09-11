import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function UseCreateLesson() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLesson = async (data) => {
    setLoading(true);
    await AxiosInstance.post("/lessons/create", data)
      .then((res) => {
        if (
          res.data.statusCode == 201 ||
          res.data.statusCode == 200 ||
          res.data.message == "Lesson created successfully."
        ) {
          // Then show success message
          Swal.fire({
            icon: "success",
            title: "تم اضافة الدرس بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          // we need to make the then functionality in here
        }

        if (
          res.data.statusCode !== 201 ||
          res.data.message !== "Lesson Created Successfully"
        ) {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        setError(err);
        Swal.fire({
          icon: "error",
          title: "خطاء في اضافة الدرس",
          text:
            err.response?.data.title || err.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { createLesson, loading, error };
}

export default UseCreateLesson;

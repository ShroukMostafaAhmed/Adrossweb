import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function UseCreateVideo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createVideo = async (data) => {
    setLoading(true);
    await AxiosInstance.post("/videos/create", data)
      .then((res) => {
        if (
          res.data.statusCode == 201 ||
          res.data.statusCode == 200 ||
          res.data.message == "Video created successfully."
        ) {
          // Then show success message
          Swal.fire({
            icon: "success",
            title: "تم اضافة الفيديو بنجاح",
            showConfirmButton: false,
            timer: 1500,
          });
          // we need to make the then functionality in here
        }

        if (
          res.data.statusCode !== 201 ||
          res.data.message !== "Video Created Successfully"
        ) {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        setError(err);
        Swal.fire({
          icon: "error",
          title: "خطاء في اضافة الفيديو",
          text:
            err.response?.data.title || err.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { createVideo, loading, error };
}

export default UseCreateVideo;

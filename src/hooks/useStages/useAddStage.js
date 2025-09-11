import React, { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import Swal from "sweetalert2";
import useStagesViewAll from "./useStagesViewAll.js";

function useAddStage() {
  const { getAllStages } = useStagesViewAll();
  const [loading, setLoading] = useState(false);

  // handle add stage
  const addStage = async (data) => {
    setLoading(true);
    await AxiosInstance.post("/stages/create", data)
      .then((res) => {
        if (
          res.data.statusCode == 201 ||
          res.data.statusCode == 200 ||
          res.data.message == "Stage Created Successfully"
        ) {
          // Then show success message
          Swal.fire({
            icon: "success",
            title: "تم اضافة المرحلة بنجاح",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            getAllStages();
          });
        }

        if (
          res.data.statusCode !== 201 ||
          res.data.message !== "Stage Created Successfully"
        ) {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "خطاء في اضافة المرحلة",
          text:
            err.response?.data.title || err.message || "Something went wrong!",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { loading, addStage };
}

export default useAddStage;

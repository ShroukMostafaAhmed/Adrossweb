import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import useStagesViewAll from "./useStagesViewAll.js";

function UseDeleteStage() {
  // getting all stages after deleting the selected one
  const { getAllStages } = useStagesViewAll();

  const [loading, setLoading] = useState(false);

  const deleteStageById = async (id) => {
    setLoading(true);
    await AxiosInstance.delete(`/stages/delete/${id}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "تم حذف المرحلة بنجاح",
            showConfirmButton: true,
            timer: 3500,
          }).then(() => {
            getAllStages();
          });
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        // Catch errors that happen during the request or response parsing
        Swal.fire({
          icon: "error",
          title: "خطاء في حذف المرحلة",
          text:
            err.response.data.title ||
            err.response.data.message ||
            "Request failed",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { deleteStageById, loading };
}

export default UseDeleteStage;

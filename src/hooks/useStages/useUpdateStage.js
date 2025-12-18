import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import Swal from "sweetalert2";
import useStagesViewAll from "./useStagesViewAll.js";

function UseUpdateStage() {
  // getting all stages
  const { getAllStages } = useStagesViewAll();

  const [isLoading, setIsLoading] = useState(false);

  const updateStage = async (id, data) => {
    setIsLoading(true);
    await AxiosInstance.put(`/api/stages/${id}`, data)
      .then((res) => {
        if (res.data.statusCode == 200 || res.data.message == "Stage Updated") {
          Swal.fire({
            icon: "success",
            title: "تم تعديل المرحلة بنجاح",
            showConfirmButton: false,
            timer: 2500,
          }).then(() => {
            getAllStages();
          });
        }
        if (res.data.statusCode != 200) {
          throw new Error(res.data.message);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "خطاء في تعديل المرحلة",
          text:
            error.response.data.title ||
            error.response.data.message ||
            "Request failed",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { isLoading, updateStage };
}

export default UseUpdateStage;

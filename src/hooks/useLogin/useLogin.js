import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const loginAPI = async (data) => {
    setLoading(true);
    try {
      const res = await AxiosInstance.post("/Auth/Login", data);

      if (res.data.message === "User does not exist!") {
        localStorage.removeItem("Token");
        localStorage.removeItem("role");
        return {
          success: false,
          error: res.data.message,
        };
      }

      if (
        res.data.message === "Login successful!" ||
        res.data.statusCode === 200
      ) {
        localStorage.setItem("Token", res.data.data.token);
        localStorage.setItem("role", res.data.data.role);
        localStorage.setItem("validTo", res.data.data.validTo);
        window.dispatchEvent(new Event("storage"));

        setUser(res.data.data);

        return {
          success: true,
          error: null,
        };
      }

      return {
        success: false,
        error: "فشل تسجيل الدخول، تحقق من البيانات",
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || "حدث خطأ أثناء تسجيل الدخول",
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, user, loginAPI };
}

export default useLogin;

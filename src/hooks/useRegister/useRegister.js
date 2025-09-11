import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import Swal from "sweetalert2";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const registerAPI = async (data) => {
    setLoading(true);

    try {
      // Log the data being sent for debugging
      console.log("Sending registration data:", data);

      // Ensure the data structure matches what the backend expects
      const payload = {
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        // email: data.email || "", // Ensure email is not null/undefined
        password: data.password,
        confirmPassword: data.confirmPassword,
        // duration: data.duration,
        // plan: data.plan,
      };

      const res = await AxiosInstance.post("/Auth/Register", payload);

      console.log("Registration response:", res.data);

      // Check for success based on different possible response formats
      if (
        res.data.statusCode === 201 ||
        res.data.statusCode === 200 ||
        res.data.message === "User registered successfully" ||
        res.data.success === true ||
        res.status === 201 ||
        res.status === 200
      ) {
        /*

        res = {
          data: {
            statusCode: 201,
            message: "User registered successfully",
            data: {
              id: "12345",
              phoneNumber: "1234567890",
              email: "
            "}
        }

        */

        setRegisteredUser(res.data.data || res.data);

        Swal.fire({
          icon: "success",
          title: "تم التسجيل بنجاح",
          text: "يمكنك الآن تسجيل الدخول",
          timer: 2000,
          showConfirmButton: false,
        });

        return { success: true, data: res.data };
      } else {
        throw new Error(res.data.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      console.error("Registration error:", err);

      let errorMessage = "حدث خطأ ما!";

      // Handle different error response formats
      if (err.response) {
        // Server responded with error status
        const errorData = err.response.data;

        if (errorData.errors) {
          // Validation errors (usually 400 status)
          const validationErrors = Object.values(errorData.errors).flat();
          errorMessage = validationErrors.join(", ");
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.title) {
          errorMessage = errorData.title;
        } else if (typeof errorData === "string") {
          errorMessage = errorData;
        }

        // Specific handling for common HTTP status codes
        switch (err.response.status) {
          case 400:
            if (!errorMessage || errorMessage === "حدث خطأ ما!") {
              errorMessage =
                "البيانات المدخلة غير صحيحة، يرجى المراجعة والمحاولة مرة أخرى";
            }
            break;
          case 409:
            errorMessage =
              "المستخدم موجود بالفعل، يرجى استخدام بريد إلكتروني أو رقم هاتف مختلف";
            break;
          case 422:
            errorMessage = "البيانات المدخلة غير مكتملة أو غير صحيحة";
            break;
          case 500:
            errorMessage = "خطأ في الخادم، يرجى المحاولة لاحقاً";
            break;
        }
      } else if (err.request) {
        // Network error
        errorMessage = "فشل الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت";
      } else {
        // Other error
        errorMessage = err.message || "حدث خطأ غير متوقع";
      }

      Swal.fire({
        icon: "error",
        title: "خطأ في التسجيل",
        text: errorMessage,
        confirmButtonText: "حسناً",
      });

      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { loading, registeredUser, registerAPI };
}

export default useRegister;

import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import Swal from "sweetalert2";

function useRegister() {
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const registerAPI = async (data) => {
    setLoading(true);

    try {
      console.log("Sending registration data:", data);

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email, 
        password: data.password,
        confirmPassword: data.confirmPassword,
        levelId: data.levelId,
        stageId: data.stageId,
      };

      console.log("Payload to send:", payload);

      const res = await AxiosInstance.post("api/Auth/Register", payload);

      console.log("Registration response:", res);
      console.log("Response data:", res.data);

      let isSuccess = false;

      if (res.data) {
        if (res.data.statusCode === 200 || res.data.statusCode === 201) {
          isSuccess = true;
        }
        else if (res.data.success === true) {
          isSuccess = true;
        }
        else if (
          res.data.message &&
          (res.data.message.includes("success") ||
            res.data.message.includes("تم") ||
            res.data.message.includes("نجاح"))
        ) {
          isSuccess = true;
        }
        else if (res.status === 200 || res.status === 201) {
          isSuccess = true;
        }
      }

      if (isSuccess) {
        setRegisteredUser(res.data.data || res.data);

        Swal.fire({
          icon: "success",
          title: "تم التسجيل بنجاح",
          text: "يمكنك الآن تسجيل الدخول",
          timer: 2000,
          showConfirmButton: false,
        });

        return {
          success: true,
          data: res.data,
          message: res.data.message || "تم التسجيل بنجاح"
        };
      } else {
        const errorMsg = res.data?.message ||
          res.data?.error ||
          "حدث خطأ غير معروف أثناء التسجيل";
        throw new Error(errorMsg);
      }
    } catch (err) {
      console.error("Registration error details:", err);
      console.error("Error response:", err.response);

      let errorMessage = "حدث خطأ أثناء التسجيل!";

      if (err.response) {
        const errorData = err.response.data;
        console.log("Error data from server:", errorData);

        if (errorData && typeof errorData === 'object') {
          if (errorData.errors && typeof errorData.errors === 'object') {
            const validationErrors = Object.values(errorData.errors).flat();
            errorMessage = validationErrors.join(", ");
          }
          else if (errorData.error) {
            errorMessage = errorData.error;
          }
          else if (errorData.message) {
            errorMessage = errorData.message;
          }
          else if (errorData.title) {
            errorMessage = errorData.title;
          }
          else if (Array.isArray(errorData)) {
            errorMessage = errorData.join(", ");
          }
          else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        }

        switch (err.response.status) {
          case 400:
            if (errorMessage.includes("حدث خطأ")) {
              errorMessage = "البيانات المدخلة غير صحيحة، يرجى التحقق والمحاولة مرة أخرى";
            }
            break;
          case 401:
            errorMessage = "غير مصرح بالدخول";
            break;
          case 403:
            errorMessage = "ليس لديك صلاحية للقيام بهذه العملية";
            break;
          case 404:
            errorMessage = "الخدمة غير متوفرة حالياً";
            break;
          case 409:
            errorMessage = "البريد الإلكتروني موجود بالفعل، يرجى استخدام بريد آخر";
            break;
          case 422:
            errorMessage = "البيانات غير صحيحة أو ناقصة";
            break;
          case 500:
            errorMessage = "خطأ في الخادم الداخلي، يرجى المحاولة لاحقاً";
            break;
          default:
            if (errorMessage.includes("حدث خطأ")) {
              errorMessage = `خطأ ${err.response.status}: فشل في التسجيل`;
            }
        }
      } else if (err.request) {
        console.error("Network error:", err.request);
        errorMessage = "فشل الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت";
      } else {
        console.error("Other error:", err.message);
        errorMessage = err.message || "حدث خطأ غير متوقع أثناء التسجيل";
      }

      errorMessage = errorMessage.replace(/[^\u0600-\u06FF\s\w\d\-_.,!?]/g, '');

      Swal.fire({
        icon: "error",
        title: "خطأ في التسجيل",
        html: `
          <div dir="rtl">
            <p class="mb-2">${errorMessage}</p>
            <p class="text-sm text-gray-500 mt-2">يرجى التحقق من البيانات والمحاولة مرة أخرى</p>
          </div>
        `,
        confirmButtonText: "حسناً",
        confirmButtonColor: "#d33",
      });

      return {
        success: false,
        error: errorMessage,
        details: err.response?.data
      };
    } finally {
      setLoading(false);
    }
  };

  return { loading, registeredUser, registerAPI };
}

export default useRegister;
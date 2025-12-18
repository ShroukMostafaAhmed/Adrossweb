import React from 'react';
import JoinUs from "../../components/HeroSections/JoinUs.jsx";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin/useLogin.js";
import Swal from "sweetalert2";
import AuthBackground from "../../components/AuthBackground.jsx";

function Login() {
  const { loginAPI } = useLogin();
  const navigate = useNavigate();

  const fields = [
    { label: "البريد الالكتروني", name: "email", type: "text", placeholder: "ادخل البريد الالكتروني " },
    { label: "كلمة السر", name: "password", type: "password", placeholder: "ادخل كلمة السر" },
  ];

  const handleLogin = async (formData) => {
    const { success, error } = await loginAPI(formData);
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'تم تسجيل الدخول بنجاح',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'فشل تسجيل الدخول',
        text: error || 'حدث خطأ ما',
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* ✅ خلفيات وزخارف الصفحة */}
      <AuthBackground />

      {/* ✅ المحتوى الرئيسي */}
      <div className="relative z-10">
        <JoinUs
          title="مرحبا بك مرة اخرى!"
          subTitle={
            <>
              معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
            </>
          }
          hideBreadcrumb={true}
        />

        <AuthForm
          title="تسجيل دخول"
          fields={fields}
          buttonText="تسجيل دخول"
          footerText="ليس لديك حساب ؟"
          footerLink="/register"
          footerLinkText="إنشاء حساب"
          onSubmit={handleLogin}
          centered={true}
        />
      </div>
    </div>
  );
}

export default Login;

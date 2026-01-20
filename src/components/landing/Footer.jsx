import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-100 mt-20 rounded-t-3xl py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-right">

        {/* ===== Left ===== */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link
            to="/register"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            إنشاء حساب
          </Link>

          <Link
            to="/login"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            تسجيل دخول
          </Link>
        </div>

        {/* ===== Center ===== */}
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="أدرس" className="w-28 mb-4" />

          <p className="text-gray-600 max-w-md text-lg">
            معًا، لنصنع مستقبلًا مشرقًا. انضم إلى أدرس وابدأ رحلتك التعليمية اليوم!
          </p>

          <div className="flex gap-6 mt-6 text-xl">
            <a className="hover:text-red-600" href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            <a className="hover:text-blue-600" href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a className="hover:text-sky-500" href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a className="hover:text-pink-600" href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>

          <div className="flex gap-4 mt-6">
            <img src="/Google_Play.png" className="h-10" />
            <img src="/app_store.png" className="h-10" />
          </div>
        </div>

        {/* ===== Right ===== */}
        <div className="flex flex-col items-center md:items-end">
          <h4 className="text-xl font-bold text-gray-800 mb-2">
            روابط سريعة
          </h4>

          <ul className="space-y-3 text-gray-600">
            <li>
              <button onClick={() => scrollToSection("hero")}>
                الرئيسية
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("why-us")}>
                لماذا نحن
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("education-stages")}>
                المراحل التعليمية
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("plans")}>
                الباقات
              </button>
            </li>
          </ul>
        </div>
      </div>

      <p className="text-center text-gray-400 mt-10 text-sm">
        © {new Date().getFullYear()} أدرس — جميع الحقوق محفوظة
      </p>
    </footer>
  );
}

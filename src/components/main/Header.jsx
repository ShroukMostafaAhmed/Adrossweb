import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/register";
  const userImage = localStorage.getItem("userImage");

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("validTo");
    localStorage.removeItem("userImage");
    navigate("/login"); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white z-50">
      <div
        className="w-full flex flex-row justify-between items-center lg:justify-between py-5 px-6 shadow-2xl shadow-blue-100 border-blue-100 relative"
        dir="rtl"
        style={{ minHeight: "120px" }}
      >
        {/* ☰ زر القائمة - في الموبايل */}
        {isLoggedIn && (
          <div className="lg:hidden order-1 lg:order-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-blue-600 p-2 rounded-md hover:bg-blue-100 transition"
            >
              <Menu className="w-7 h-7" />
            </button>

            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 z-50 w-52 bg-white rounded-lg shadow-xl border border-gray-200"
                >
                  <div className="py-2 text-right">
                    <button
                      onClick={() => {
                        navigate("/app");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-right transition-colors ${
                        location.pathname === "/app" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      الصفحة الرئيسية
                    </button>

                    <button
                      onClick={() => {
                        navigate("/app/WatchLater");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-right transition-colors ${
                        location.pathname === "/app/WatchLater" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      التنزيلات
                    </button>

                    <button
                      onClick={() => {
                        navigate("/app/calendar");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-right transition-colors ${
                        location.pathname === "/app/calendar" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      التقويم
                    </button>

                    <button
                      onClick={() => {
                        navigate("/app/Subscription");
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-right transition-colors ${
                        location.pathname === "/app/Subscription" ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      الإعدادات
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 🖼 اللوجو في المنتصف */}
        <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 order-2 lg:order-1 flex items-center gap-2 mr-35">
          <img
            src="/logo.png"
            alt="Adrees Logo"
            className="h-20 w-18 cursor-pointer"
            onClick={() => navigate("/app")}
          />
        </div>

        {/* 🔗 روابط التنقل - تظهر فقط في الشاشات الكبيرة */}
        {isLoggedIn && (
          <nav className="hidden lg:flex gap-20 text-[#001F3F] font-medium text-[20px] order-3 lg:order-2">
            <button
              onClick={() => navigate("/app")}
              className={`hover:text-blue-600 ${location.pathname === "/app" ? "text-blue-600 font-bold" : ""}`}
            >
              الصفحة الرئيسية
            </button>
            <button
              onClick={() => navigate("/app/WatchLater")}
              className={`hover:text-blue-600 ${location.pathname === "/app/WatchLater" ? "text-blue-600 font-bold" : ""}`}
            >
              المفضلة
            </button>
            <button
              onClick={() => navigate("/app/calendar")}
              className={`hover:text-blue-600 ${location.pathname === "/app/calendar" ? "text-blue-600 font-bold" : ""}`}
            >
              التقويم
            </button>
            <button
              onClick={() => navigate("/app/Subscription")}
              className={`hover:text-blue-600 ${location.pathname === "/app/Subscription" ? "text-blue-600 font-bold" : ""}`}
            >
              الباقات
            </button>
          </nav>
        )}

        {isLoggedIn && (
          <div className="relative order-3 lg:order-2 mr-auto lg:mr-0 lg:ml-35" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-12 h-12 rounded-full hover:bg-blue-200 transition-all flex items-center justify-center border-2 border-blue-300 hover:border-blue-300"
            >
              {userImage ? (
                <img
                  src={userImage}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="text-blue-600 w-6 h-6" />
              )}
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-3 z-50 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
                >
                  <div className="absolute -top-2 left-4 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-200"></div>
                  <div className="py-2">
                    <div
                      onClick={() => {
                        navigate("/app/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">الملف الشخصي</span>
                    </div>

                    <hr className="border-gray-100 my-1" />

                    <div
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer text-gray-700 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">تسجيل الخروج</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

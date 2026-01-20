import React, { useState, useEffect, useCallback } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();

  const sectionIds = ["hero", "whyUs", "education", "subs"];

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -50% 0px", // Compensate for header height
      threshold: 0.3,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const getSectionName = (id) => {
    const names = {
      hero: "الرئيسية",
      whyUs: "لماذا نحن",
      education: "المراحل",
      subs: "الباقات",
    };
    return names[id] || id;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div dir="rtl" className="flex items-center justify-between px-4 lg:px-20 py-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg"
          aria-label="الرجوع إلى الرئيسية"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 lg:h-16"
          />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-10 pr-63" aria-label="Main navigation">
          {sectionIds.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={activeSection === id ? "page" : undefined}
              className={`relative text-lg transition-all duration-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded ${
                activeSection === id
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {getSectionName(id)}
              {activeSection === id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 right-0 left-0 h-0.5 bg-blue-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="border border-blue-500 text-blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            تسجيل دخول <GoArrowUpLeft className="inline ml-1" />
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            إنشاء حساب <GoArrowUpLeft className="inline ml-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-md lg:hidden"
          >
            <nav 
              dir="rtl" 
              className="flex flex-col p-4 gap-3"
              aria-label="Mobile navigation"
            >
              {sectionIds.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                  className={`text-right py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                    activeSection === id
                      ? "text-blue-600 font-bold bg-blue-50"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {getSectionName(id)}
                </button>
              ))}

              <div className="border-t border-gray-200 mt-2 pt-4">
                <button 
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-right py-3 px-4 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  تسجيل دخول
                </button>
                <button 
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-right py-3 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  إنشاء حساب
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
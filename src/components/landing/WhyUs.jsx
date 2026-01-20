import { GoArrowUpLeft } from "react-icons/go";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";


export default function WhyUs() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    const navigate = useNavigate();

    const features = [
        {
            title: "معلمون ذو خبرة",
            description:
                "انضم إلى مجتمع من المعلمين المتخصصين الذين يقدمون الدعم والإرشاد لتسهيل رحلتك التعليمية",
            color: "bg-blue-500",
            icon: "/graduation.png",
        },
        {
            title: "الاختبارات",
            description:
                "قم بتقييم تقدمك من خلال اختبارات مصممة بعناية لمساعدتك في تحقيق أهدافك التعليمية",
            color: "bg-red-400",
            icon: "/idea.png",
        },
        {
            title: "المهارات المتعددة",
            description:
                "اكتشف مجموعة واسعة من المهارات، من البرمجة إلى الفنون، لتطوير مهاراتك الشخصية والمهنية",
            color: "bg-yellow-400",
            icon: "/calc.png",
        },
        {
            title: "المراحل التعليمية",
            description:
                "نقدم محتوى تعليمي متنوع للمراحل الابتدائية، الإعدادية والثانوية، مع التركيز على تعزيز الفهم العميق",
            color: "bg-blue-500",
            icon: "/student.png",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-white text-center overflow-hidden">
            <div dir="rtl" className="w-fill flex lg:flex-row flex-col items-center justify-between max-w-7xl mx-auto px-6">
                <h2 className={`text-4xl font-bold text-blue-600 flex items-center gap-2 transition-all duration-1000 ${
                    isVisible ? 'animate-slide-in-right opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                }`}>
                    لماذا <span className={`text-yellow-300 ${isVisible ? 'animate-bounce-gentle' : ''}`}>نحن</span>
                    <img src="/stars.png" alt="Stars" className={`w-9 h-9 mb-6 md:block transition-all duration-1000 ${
                        isVisible ? 'animate-twinkle opacity-100 rotate-0' : 'opacity-0 rotate-180'
                    }`}/>

                </h2>
                  <p className={`text-gray-600 mt-4 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
                        isVisible ? 'animate-fade-in-up opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}>
                        في عالم سريع التغير، نحن في أدرس نؤمن بأن التعليم هو المفتاح لفتح الأبواب نحو المستقبل
                    </p>
                <div className={`text-center transition-all duration-1000 delay-300 ${
                    isVisible ? 'animate-slide-in-left opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}>
                  
                    <div dir="rtl" className="mt-6 flex justify-center sm:justify-end">
                       <button
            onClick={() => navigate("/register")}
            className={`mt-8 bg-blue-600 text-white px-8 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition-all ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            سجل الآن
            <ArrowRight className="animate-arrow-pulse" />
          </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg text-white ${feature.color} flex flex-col items-center shadow-lg transition-all duration-700 ease-out transform hover:scale-105 hover:rotate-1 hover:shadow-2xl group cursor-pointer ${
                            isVisible 
                                ? 'animate-card-entrance opacity-100 translate-y-0 scale-100' 
                                : 'opacity-0 translate-y-20 scale-90'
                        }`}
                        style={{ 
                            transitionDelay: isVisible ? `${1.2 + index * 0.2}s` : '0s',
                            animationDelay: isVisible ? `${1.2 + index * 0.2}s` : '0s' 
                        }}
                    >
                        <div dir="rtl" className="w-full flex flex-col lg:flex-row items-center justify-start px-2 gap-4 group-hover:gap-6 transition-all duration-300">
                            <img 
                                src={feature.icon} 
                                alt={feature.title} 
                                className={`w-16 lg:w-10 lg:h-10 h-16 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                                    isVisible ? 'animate-icon-float' : ''
                                }`}
                                style={{ animationDelay: isVisible ? `${1.5 + index * 0.3}s` : '0s' }}
                            />
                            <h3 className={`text-xl font-bold transition-all duration-500 group-hover:text-shadow-lg ${
                                isVisible ? 'animate-text-reveal' : ''
                            }`}
                                style={{ animationDelay: isVisible ? `${1.3 + index * 0.2}s` : '0s' }}>
                                {feature.title}
                            </h3>
                        </div>
                        <p className={`text-sm mt-2 text-center transition-all duration-500 group-hover:mt-4 ${
                            isVisible ? 'animate-text-fade-in' : ''
                        }`}
                           style={{ animationDelay: isVisible ? `${1.6 + index * 0.2}s` : '0s' }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(100px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-100px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes buttonSlideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                @keyframes arrowBounce {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    25% { transform: translateX(-3px) rotate(-5deg); }
                    75% { transform: translateX(-6px) rotate(-10deg); }
                }

                @keyframes bounceGentle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                @keyframes twinkle {
                    0%, 100% { transform: rotate(0deg) scale(1); opacity: 1; }
                    25% { transform: rotate(90deg) scale(1.1); opacity: 0.8; }
                    50% { transform: rotate(180deg) scale(1.2); opacity: 0.6; }
                    75% { transform: rotate(270deg) scale(1.1); opacity: 0.8; }
                }

                @keyframes cardEntrance {
                    from { 
                        opacity: 0; 
                        transform: translateY(50px) scale(0.8) rotateX(90deg); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1) rotateX(0deg); 
                    }
                }

                @keyframes iconFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }

                @keyframes textReveal {
                    from { 
                        opacity: 0; 
                        transform: translateX(20px); 
                        filter: blur(5px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                        filter: blur(0px); 
                    }
                }

                @keyframes textFadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }

                .animate-slide-in-right {
                    animation: slideInRight 1s ease-out both;
                }

                .animate-slide-in-left {
                    animation: slideInLeft 1s ease-out both;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 1s ease-out both;
                }

                .animate-button-slide-up {
                    animation: buttonSlideUp 0.8s ease-out both;
                }

                .animate-arrow-bounce {
                    animation: arrowBounce 0.6s ease-in-out;
                }

                .animate-bounce-gentle {
                    animation: bounceGentle 2s ease-in-out infinite;
                }

                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }

                .animate-card-entrance {
                    animation: cardEntrance 0.8s ease-out both;
                }

                .animate-icon-float {
                    animation: iconFloat 3s ease-in-out infinite;
                }

                .animate-text-reveal {
                    animation: textReveal 0.6s ease-out both;
                }

                .animate-text-fade-in {
                    animation: textFadeIn 0.8s ease-out both;
                }

                .text-shadow-lg {
                    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </section>
    );
}

import "./SubscriptionPlans.css"
import React from "react";

export default function SubscriptionPlans() {
    return (
        <div className="bg-blue-600 text-white py-16 px-4 text-center  ">
            <h2 dir="rtl" className="text-5xl text-center font-bold text-yellow-300 flex items-center justify-center gap-2 drop-shadow-lg mb-6">
                باقتنا
                <img src="/fire-yellow.png" alt="fire" className="w-9 h-9 mb-10  md:block"/>
            </h2>
            <p className="mt-2 text-lg">معًا لنصنع مستقبلًا مشرقًا. انضم إلى 'أدرس' وابدأ رحلتك التعليمية اليوم!</p>
            <div className="mt-10 flex flex-wrap lg:flex-row items-center justify-center gap-12">
                {plans.map((plan, index) => (
                    <div key={index} className="card transform transition-transform duration-300 hover:scale-105">
                        <div className={`trangle `}></div>
                        <div className={"header-content" + ' ' + plan.type }>
                            <p>{plan.label}</p>
                            <div className="trangle"></div>
                            <div className="trangle-2 "></div>
                        </div>
                        <ul className="space-y-3 px-4">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center justify-between text-gray-700">
                                    <span className={`text-white rounded-full px-2 ${plan.type == "extra-sub" ? "bg-red-500" : plan.type == "special-sub" ? "bg-blue-500" : "bg-yellow-300"} font-bold text-lg`}>
                                        ✓
                                    </span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <hr className="mx-auto my-6 border border-[#D4D1C9] h-[3px] bg-[#D4D1C9] w-[90%]"/>
                        <div className="text-center mb-6 mt-8">
                            <span className="text-3xl text-[#0A4A85] font-bold">{plan.price} $</span>
                        </div>
                        <button
                            className={`w-[90%] mx-auto p-2 text-white rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer`}
                        >
                            اشترك الآن
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const plans = [
    {
        label: "خطة الاشتراك الإضافية",
        labelBg: "bg-red-500",
        highlightColor: "border-red-500",
        price: 60,
        type: 'extra-sub',
        features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم", "حل الأسئلة والواجبات", "مساعد ذكي"],
    },
    {
        label: "خطة الاشتراك المميزة",
        labelBg: "bg-blue-500",
        highlightColor: "border-blue-500",
        price: 40,
        type: 'special-sub',
        features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم", "حل الأسئلة والواجبات"],
    },
    {
        label: "خطة الاشتراك الأساسية",
        labelBg: "bg-yellow-500",
        highlightColor: "border-yellow-500",
        price: 20,
        type: 'base-sub',
        features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم"],
    },
];

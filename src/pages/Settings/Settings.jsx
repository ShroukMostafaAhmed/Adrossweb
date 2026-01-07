import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Crown, CheckCircle2, Loader } from 'lucide-react';
import useSubscriptionPlans from '../../hooks/useSubscribe/useSubscriptionPlans';

export default function ModernSubscriptionPlans() {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [pendingSelection, setPendingSelection] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const { plans: apiPlans, loading, error } = useSubscriptionPlans();
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const savedPlan = localStorage.getItem('selectedPlanId');
        if (savedPlan) setSelectedPlanId(savedPlan);
    }, []);

    useEffect(() => {
        if (apiPlans && apiPlans.length > 0) {

            const planStyles = {
                basic: {
                    icon: <Star className="w-8 h-8" />,
                    gradient: "from-amber-400 to-orange-500",
                    borderGradient: "from-amber-200 to-orange-300",
                    subtitle: "مثالية للبداية"
                },
                premium: {
                    icon: <Zap className="w-8 h-8" />,
                    gradient: "from-blue-500 to-indigo-600",
                    borderGradient: "from-blue-200 to-indigo-300",
                    subtitle: "الأكثر شعبية"
                },
                ultimate: {
                    icon: <Crown className="w-8 h-8" />,
                    gradient: "from-purple-500 to-pink-600",
                    borderGradient: "from-purple-200 to-pink-300",
                    subtitle: "للطلاب المتميزين"
                }
            };

            // Map API data to UI format
            const processedPlans = apiPlans.map((apiPlan, index) => {
                // Determine plan type based on API data or index
                const planTypes = ['basic', 'premium', 'ultimate'];
                const planType = apiPlan.type?.toLowerCase() || planTypes[index] || 'basic';

                return {
                    id: apiPlan.id?.toString() || planTypes[index],
                    label: apiPlan.name || apiPlan.title || `الباقة ${index + 1}`,
                    price: apiPlan.price || apiPlan.cost || 0,
                    period: apiPlan.period || "شهرياً",
                    features: apiPlan.features || apiPlan.description?.split(',') || [],
                    ...planStyles[planType]
                };
            });

            setPlans(processedPlans);
        } else {
            // Fallback to default plans if API fails or returns empty
            setPlans([
                {
                    id: 'basic',
                    label: "الباقة الأساسية",
                    subtitle: "مثالية للبداية",
                    price: 20,
                    period: "شهرياً",
                    icon: <Star className="w-8 h-8" />,
                    gradient: "from-amber-400 to-orange-500",
                    borderGradient: "from-amber-200 to-orange-300",
                    features: [
                        "تشمل جميع المراحل الدراسية",
                        "دروس تعليمية شاملة",
                        "فيديوهات تعليمية شاملة",
                        "اختبارات متطورة لتقييم الفهم"
                    ],
                },
                {
                    id: 'premium',
                    label: "الباقة المميزة",
                    subtitle: "الأكثر شعبية",
                    price: 40,
                    period: "شهرياً",
                    icon: <Zap className="w-8 h-8" />,
                    gradient: "from-blue-500 to-indigo-600",
                    borderGradient: "from-blue-200 to-indigo-300",
                    features: [
                        "جميع ميزات الباقة الأساسية",
                        "دروس تعليمية شاملة",
                        "فيديوهات تعليمية شاملة",
                        "اختبارات متطورة لتقييم الفهم",
                        "حل الأسئلة والواجبات"
                    ],
                },
                {
                    id: 'ultimate',
                    label: "الباقة الفائقة",
                    subtitle: "للطلاب المتميزين",
                    price: 60,
                    period: "شهرياً",
                    icon: <Crown className="w-8 h-8" />,
                    gradient: "from-purple-500 to-pink-600",
                    borderGradient: "from-purple-200 to-pink-300",
                    features: [
                        "جميع ميزات الباقة المميزة",
                        "دروس تعليمية شاملة",
                        "فيديوهات تعليمية شاملة",
                        "اختبارات متطورة لتقييم الفهم",
                        "حل الأسئلة والواجبات",
                        "مساعد ذكي متقدم",
                        "دعم فني متقدم 24/7"
                    ],
                }
            ]);
        }
    }, [apiPlans]);

    const confirmChange = () => {
        setSelectedPlanId(pendingSelection);
        localStorage.setItem('selectedPlanId', pendingSelection);
        setPendingSelection(null);
        setShowConfirm(false);
    };

    const handlePlanClick = (id) => {
        if (selectedPlanId && selectedPlanId !== id) {
            setPendingSelection(id);
            setShowConfirm(true);
        } else {
            setSelectedPlanId(id);
            localStorage.setItem('selectedPlanId', id);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen py-10 px-4 flex items-center justify-center" dir="rtl">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">جاري تحميل الباقات...</h2>
                    <p className="text-gray-500">يرجى الانتظار بينما نجلب أحدث الباقات المتاحة</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen py-10 px-4 flex items-center justify-center" dir="rtl">
                <div className="text-center max-w-md">
                    <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-500 text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">حدث خطأ في التحميل</h2>
                    <p className="text-gray-500 mb-6">لم نتمكن من تحميل الباقات. يرجى المحاولة مرة أخرى.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-6 sm:py-10 px-4 relative" dir="rtl">
            <div className="text-center mb-16 sm:mb-20 md:mb-30">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-3 sm:mb-4">باقاتنا المميزة</h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
                    اختر الباقة المناسبة لك وابدأ رحلتك التعليمية مع أفضل المحتوى والأدوات التعليمية
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {plans.map((plan) => (
                    <div key={plan.id} className={`relative group`}>
                        <div className={`
                            relative bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl 
                            border border-gray-200 hover:border-blue-400 transition-colors
                            transition-all duration-500 hover:scale-102 sm:hover:scale-105 hover:shadow-2xl
                            ${selectedPlanId === plan.id ? 'ring-2 ring-blue-500/50 shadow-blue-500/25' : ''}
                            group-hover:bg-white/90
                        `}>
                            <div className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>

                            <div className="text-center mb-6 sm:mb-8">
                                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${plan.gradient} rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {React.cloneElement(plan.icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-white" })}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{plan.label}</h3>
                                <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                            </div>

                            <div className="text-center mb-6 sm:mb-8">
                                <div className="flex items-baseline justify-center gap-2">
                                    <span className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                        ${plan.price}
                                    </span>
                                    <span className="text-gray-500 text-sm sm:text-base">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3 group/item hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200">
                                        <div className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${plan.gradient} rounded-full flex items-center justify-center group-hover/item:scale-110 transition-transform duration-200`}>
                                            <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                        </div>
                                        <span className="text-gray-700 text-right flex-1 text-sm sm:text-base">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePlanClick(plan.id)}
                                className={`
                                    w-full py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r ${plan.gradient} text-white font-semibold rounded-xl sm:rounded-2xl text-sm sm:text-base
                                    shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                                    hover:scale-102 sm:hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/30
                                    relative overflow-hidden group/btn
                                `}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {selectedPlanId === plan.id && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
                                    {selectedPlanId === plan.id ? 'الباقة المختارة' : 'اشترك الآن'}
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform translate-x-full group-hover/btn:-translate-x-full transition-transform duration-500"></div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showConfirm && (
                <div className="fixed bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-blue-200 shadow-xl rounded-xl p-4 sm:p-6 z-50 w-[90%] max-w-md text-center space-y-3 sm:space-y-4">
                    <p className="text-gray-800 text-base sm:text-lg font-medium">هل تريد تغيير باقتك الحالية إلى <span className="text-blue-600 font-bold">{plans.find(p => p.id === pendingSelection)?.label}</span>؟</p>
                    <div className="flex justify-center gap-3 sm:gap-4">
                        <button
                            onClick={confirmChange}
                            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-sm sm:text-base"
                        >
                            نعم، غير الباقة
                        </button>
                        <button
                            onClick={() => setShowConfirm(false)}
                            className="px-4 sm:px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition text-sm sm:text-base"
                        >
                            إلغاء
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
import { useState, useRef, useEffect } from 'react';
import { Trash2, CheckCircle, Clock1, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LessonsSlider({ lessons = [
  {
    id: 1,
    title: "حساب المثلثات",
    description: "تعلم أساسيات حساب المثلثات والزوايا",
    duration: "30 دقيقة",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=320&fit=crop&crop=center",
    completed: true
  },
  {
    id: 2,
    title: "الجبر الخطي",
    description: "مفاهيم أساسية في الجبر الخطي والمصفوفات",
    duration: "45 دقيقة",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=320&fit=crop&crop=center",
    completed: false
  },
  {
    id: 3,
    title: "حساب التفاضل والتكامل",
    description: "دروس متقدمة في التفاضل والتكامل",
    duration: "60 دقيقة",
    image: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400&h=320&fit=crop&crop=center",
    completed: false
  },
  {
    id: 4,
    title: "الإحصاء والاحتمالات",
    description: "مقدمة في علم الإحصاء والاحتمالات",
    duration: "40 دقيقة",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=320&fit=crop&crop=center",
    completed: false
  },
  {
    id: 5,
    title: "الهندسة التحليلية",
    description: "دراسة الأشكال الهندسية باستخدام الإحداثيات",
    duration: "35 دقيقة",
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=320&fit=crop&crop=center",
    completed: true
  }
] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handlePrevious = () => {
    if (isMobile) {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else {
      const container = sliderRef.current?.querySelector('.flex.overflow-x-auto');
      container?.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (isMobile) {
      setCurrentIndex(prev => (prev < lessons.length - 1 ? prev + 1 : prev));
    } else {
      const container = sliderRef.current?.querySelector('.flex.overflow-x-auto');
      container?.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6" dir="rtl">
      <div className="flex justify-between items-center pb-2 sm:pb-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">دروسك</h2>

        {isMobile && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-2 rounded-lg transition-colors ${
                currentIndex === 0
                  ? 'text-gray-300 bg-gray-100'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <ChevronRight size={18} /> {/* Fixed: Right is previous in RTL */}
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === lessons.length - 1}
              className={`p-2 rounded-lg transition-colors ${
                currentIndex === lessons.length - 1
                  ? 'text-gray-300 bg-gray-100'
                  : 'text-blue-600 bg-blue-50 hover:bg-blue-100'
              }`}
            >
              <ChevronLeft size={18} /> {/* Fixed: Left is next in RTL */}
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        {!isMobile && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 hover:shadow-xl"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleNext}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 sm:p-3 hover:bg-gray-50 hover:shadow-xl"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
          </>
        )}

        <div ref={sliderRef}>
          {isMobile ? (
            <div className="w-full flex justify-center px-2">
              <LessonCard lesson={lessons[currentIndex]} />
            </div>
          ) : (
            <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-6 scrollbar-hide px-0">
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              {lessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <div className="flex justify-center mt-4 sm:mt-6 gap-2">
          {lessons.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                currentIndex === index ? 'bg-blue-500 w-4 sm:w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LessonCard({ lesson }) {
  return (
    <div className="flex-shrink-0 bg-white rounded-xl overflow-hidden w-full max-w-xs sm:max-w-sm shadow-lg hover:shadow-xl shadow-blue-200">
      {/* الصورة */}
      <div className="relative group">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* زر التشغيل */}
        <button className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <img 
            src="/icon.png" 
            alt="Play Icon" 
            className="w-12 h-12 sm:w-15 sm:h-15 bg-white rounded-full shadow-lg"
          />
        </button>
      </div>

      {/* النصوص */}
      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
        {/* العنوان وزر الحذف في صف واحد */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-blue-600 font-bold text-base sm:text-lg text-right flex-1 leading-tight">
            {lesson.title}
          </h3>
          <button className="rounded-full transition-colors group flex-shrink-0">
            <Trash2 size={18} className="text-gray-500 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        <p className="text-gray-600 text-sm sm:text-md text-right leading-relaxed line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 sm:gap-2 text-blue-500">
            <span className="text-xs sm:text-sm font-medium">{lesson.duration}</span>
            <Clock1 size={14} className="sm:size-4" />
          </div>
          {lesson.completed ? (
            <div className="bg-green-500 p-1 rounded-full">
              <CheckCircle className="text-white" size={14} />
            </div>
          ) : (
            <CheckCircle className="text-gray-400" size={14} />
          )}
        </div>
      </div>
    </div>
  );
}
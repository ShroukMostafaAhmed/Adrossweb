import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const Slider = ({ products }) => {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            dir={"rtl"}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            speed={3000} 
            loop={true} 
            grabCursor={true} 
            slidesPerView="auto" 
            spaceBetween={20} 
            className="w-full overflow-hidden" 
        >
            {products.map((product) => (
                <SwiperSlide
                    key={product.id}
                    className="max-w-[100%] sm:max-w-[400px] lg:max-w-[800px]" 
                >
                    <div className="w-full bg-white my-6 rounded-[60px] sm:rounded-[120px] shadow-amber-50">
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="rounded-[50px] sm:rounded-lg w-full h-auto object-cover" 
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
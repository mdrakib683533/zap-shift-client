import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import "swiper/css";

const reviews = [
  {
    id: 1,
    name: "Md. Hasan",
    location: "Dhaka, Bangladesh",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Excellent delivery service! My parcel arrived on time, and the tracking system was very helpful.",
  },
  {
    id: 2,
    name: "Tania Akter",
    location: "Chittagong, Bangladesh",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    review:
      "Very professional service. My parcel reached on time, and the whole process was smooth and easy.",
  },
  {
    id: 3,
    name: "Rifat Ahmed",
    location: "Rajshahi, Bangladesh",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    review:
      "Affordable, reliable and easy to use. I will definitely use Zap Shift again!",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    location: "Feni, Bangladesh",
    image: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    review:
      "Great experience with Zap Shift. My package was delivered safely, and customer support was helpful.",
  },
  {
    id: 5,
    name: "Sabbir Hossain",
    location: "Cumilla, Bangladesh",
    image: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    review:
      "Fast delivery and excellent service. The real-time tracking feature makes everything convenient.",
  },
  {
    id: 6,
    name: "Sumaiya Islam",
    location: "Sylhet, Bangladesh",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
    review:
      "I love how easy it is to send parcels. The service is reliable, and the delivery updates are useful.",
  },
  {
    id: 7,
    name: "Arif Hossain",
    location: "Khulna, Bangladesh",
    image: "https://i.pravatar.cc/150?img=14",
    rating: 5,
    review:
      "My parcel was delivered safely and quickly. A great choice for hassle-free parcel delivery.",
  },
  {
    id: 8,
    name: "Mim Akter",
    location: "Barishal, Bangladesh",
    image: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    review:
      "Amazing experience from pickup to delivery. I would recommend Zap Shift to my friends and family.",
  },
];

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="overflow-hidden bg-base-100 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading animation */}
        <div
          className="mb-10 text-center md:mb-14"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00BF83]/10 px-5 py-2 font-medium text-[#00BF83]">
            <FaStar />
            What Our Customers Say
          </p>

          <h2 className="mb-4 text-3xl font-bold text-base-content md:text-5xl">
            Customer <span className="text-[#00BF83]">Reviews</span>
          </h2>

          <p className="mx-auto max-w-2xl text-base-content/60 md:text-lg">
            Real stories from real customers. Discover why people trust Zap
            Shift for fast, reliable and hassle-free delivery.
          </p>
        </div>

        {/* Review carousel animation */}
        <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
          <Swiper
            modules={[Autoplay]}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.15}
            spaceBetween={12}
            speed={700}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.4,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 1.7,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.1,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 2.7,
                spaceBetween: 30,
              },
            }}
            className="customer-reviews-swiper !overflow-visible !py-8"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                {({ isActive }) => (
                  <div
                    className={`h-full rounded-2xl border border-base-200 bg-base-100 p-5 transition-all duration-700 sm:p-6 md:p-8 ${
                      isActive
                        ? "scale-100 opacity-100 shadow-2xl ring-1 ring-[#00BF83]/20"
                        : "scale-[0.90] opacity-60 shadow-md"
                    }`}
                  >
                    {/* Customer profile */}
                    <div className="mb-6 flex items-center gap-3 sm:gap-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        loading="lazy"
                        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#00BF83]/20 sm:h-14 sm:w-14"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-bold text-base-content">
                          {review.name}
                        </h3>

                        <p className="text-xs text-base-content/60 sm:text-sm">
                          {review.location}
                        </p>

                        {/* Star rating */}
                        <div className="mt-2 flex gap-1 text-amber-400">
                          {Array.from({ length: review.rating }, (_, index) => (
                            <FaStar key={index} size={13} />
                          ))}
                        </div>
                      </div>

                      <FaQuoteLeft className="shrink-0 text-xl text-[#00BF83]/30 sm:text-2xl" />
                    </div>

                    {/* Customer review */}
                    <p className="text-sm leading-7 text-base-content/70 sm:text-base">
                      {review.review}
                    </p>

                    {/* Review badge */}
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[#00BF83]/10 px-3 py-2 text-xs font-medium text-[#00BF83] sm:text-sm">
                        <span>✓</span>
                        Happy Customer
                      </span>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Clickable pagination dots */}
        <div
          className="mt-5 flex justify-center gap-2"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="200"
        >
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => swiperInstance?.slideToLoop(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-7 bg-[#00BF83]"
                  : "w-2.5 bg-base-300 hover:bg-[#00BF83]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;

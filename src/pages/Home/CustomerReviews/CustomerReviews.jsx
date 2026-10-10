import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Customer reviews
const reviews = [
  {
    name: "Nina Khan",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Zap Shift delivers my parcels quickly and safely. The real-time tracking system is very helpful.",
  },
  {
    name: "Michael Jordan",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "Excellent delivery service with professional support. My business deliveries have become much easier.",
  },
  {
    name: "Emma Watson",
    role: "Online Shopper",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    review:
      "My parcels always arrive on time. I really appreciate the smooth delivery experience.",
  },
  {
    name: "John Doe",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    review:
      "Fast, reliable, and affordable delivery. I would definitely recommend Zap Shift to others.",
  },
  {
    name: "Jane Smith",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
    review:
      "Their delivery service helps me manage my online business efficiently. Great customer support!",
  },
  {
    name: "Alex Brown",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4,
    review:
      "The tracking updates are useful, and the delivery process is simple and convenient.",
  },
  {
    name: "Sarah Ahmed",
    role: "Online Seller",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    review:
      "A dependable courier service for my daily orders. My customers are happy with the delivery speed.",
  },
  {
    name: "David Miller",
    role: "Regular Customer",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    review:
      "Booking a parcel is easy, and the service is reliable. I have had a great experience so far.",
  },
];

// Review card
const ReviewCard = ({ customer }) => {
  return (
    <article className="review-card card bg-base-100">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00BF83]/10 text-[#00BF83]">
          <FaQuoteLeft size={16} />
        </span>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src={customer.image}
            alt={customer.name}
            loading="lazy"
            className="h-12 w-12 shrink-0 rounded-full border-2 border-[#00BF83]/40 object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-base-content sm:text-base">
              {customer.name}
            </h3>

            <p className="mt-1 text-xs text-base-content/60">{customer.role}</p>

            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm font-bold text-amber-600">
                {customer.rating.toFixed(1)}
              </span>

              <div className="flex gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} size={11} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="line-clamp-3 flex-1 overflow-hidden text-sm leading-6 text-base-content/75">
        "{customer.review}"
      </p>
    </article>
  );
};

const CustomerReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselRef = useRef(null);
  const slideRef = useRef(null);

  // Measure each slide for responsive positioning
  useEffect(() => {
    const slide = slideRef.current;

    if (!slide) return;

    const updateWidth = () => {
      setSlideWidth(slide.getBoundingClientRect().width);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(slide);

    return () => observer.disconnect();
  }, []);

  // Automatically move to the next card
  useEffect(() => {
    if (isPaused || slideWidth === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, slideWidth]);

  return (
    <section className="overflow-hidden bg-base-200/40 py-16 sm:py-20">
      {/* Section heading */}
      <div className="mx-auto mb-16 max-w-7xl px-5 text-center sm:mb-20 sm:px-8">
        <span className="inline-block rounded-full bg-[#00BF83]/10 px-4 py-2 text-sm font-semibold text-[#00BF83]">
          Customer Reviews
        </span>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl lg:text-5xl">
          What Our Customers <span className="text-[#00BF83]">Say</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base">
          Thousands of customers trust our delivery service for speed,
          reliability, and exceptional support.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="review-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="review-carousel-track"
          style={{
            transform: `translateX(calc(50vw - ${
              activeIndex * slideWidth + slideWidth / 2
            }px))`,
          }}
        >
          {reviews.map((customer, index) => (
            <div
              key={customer.name}
              ref={index === 0 ? slideRef : null}
              className={`review-carousel-item ${
                index === activeIndex ? "is-active" : ""
              }`}
            >
              <ReviewCard customer={customer} />
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="mt-10 flex justify-center gap-2">
        {reviews.map((customer, index) => (
          <button
            key={customer.name}
            type="button"
            aria-label={`Show review ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`review-indicator ${
              activeIndex === index ? "is-active" : ""
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;

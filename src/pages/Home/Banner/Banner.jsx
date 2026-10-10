import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";

import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const banners = [
  {
    image: bannerImg1,
    tag: "DELIVERY MADE SIMPLE",
    title: "Fast & Reliable Parcel Delivery",
    subtitle:
      "Your trusted delivery partner for fast, safe, and hassle-free parcel shipping across Bangladesh.",
  },
  {
    image: bannerImg2,
    tag: "SAFE • SECURE • RELIABLE",
    title: "Your Parcels, Delivered with Care",
    subtitle:
      "Every parcel matters. We deliver your packages with care, reliability, and peace of mind.",
  },
  {
    image: bannerImg3,
    tag: "YOUR TRUSTED DELIVERY PARTNER",
    title: "Connecting People Through Delivery",
    subtitle:
      "Bringing people and businesses closer with smarter parcel delivery solutions.",
  },
];

const floatingCircles = [
  {
    size: "h-24 w-24 sm:h-36 sm:w-36",
    position: "left-[8%] top-[12%]",
    color: "border-[#00BF83]/40 bg-[#00BF83]/10",
    duration: 7,
    x: [0, 35, -15, 0],
    y: [0, -30, 25, 0],
  },
  {
    size: "h-20 w-20 sm:h-28 sm:w-28",
    position: "right-[12%] top-[18%]",
    color: "border-[#B8D469]/50 bg-[#B8D469]/10",
    duration: 8,
    x: [0, -25, 20, 0],
    y: [0, 35, -20, 0],
  },
  {
    size: "h-28 w-28 sm:h-40 sm:w-40",
    position: "bottom-[12%] left-[22%]",
    color: "border-white/25 bg-white/5",
    duration: 9,
    x: [0, -30, 25, 0],
    y: [0, 20, -30, 0],
  },
  {
    size: "h-16 w-16 sm:h-24 sm:w-24",
    position: "bottom-[18%] right-[18%]",
    color: "border-[#00BF83]/50 bg-[#00BF83]/10",
    duration: 6,
    x: [0, 20, -25, 0],
    y: [0, -25, 20, 0],
  },
  {
    size: "h-14 w-14 sm:h-20 sm:w-20",
    position: "left-[48%] top-[10%]",
    color: "border-[#B8D469]/40 bg-[#B8D469]/10",
    duration: 7.5,
    x: [0, 25, -20, 0],
    y: [0, 30, -15, 0],
  },
  {
    size: "h-20 w-20 sm:h-28 sm:w-28",
    position: "right-[5%] bottom-[12%]",
    color: "border-white/30 bg-white/5",
    duration: 8.5,
    x: [0, -20, 30, 0],
    y: [0, -20, 25, 0],
  },
];

const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Banner = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full overflow-hidden py-2 sm:py-3"
    >
      <div className="mx-auto w-full px-2 sm:px-3 lg:px-5">
        <Carousel
          autoPlay
          infiniteLoop
          interval={4500}
          transitionTime={900}
          animationHandler="fade"
          showThumbs={false}
          showStatus={false}
          showArrows
          showIndicators
          swipeable
          emulateTouch
          stopOnHover
          className="zap-banner"
        >
          {banners.map((banner, index) => (
            <div
              key={banner.title}
              className="relative overflow-hidden rounded-2xl bg-[#03373D] text-left sm:rounded-3xl"
            >
              {/* Background image */}
              <motion.img
                src={banner.image}
                alt={banner.title}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1.02 }}
                transition={{
                  duration: 5.5,
                  ease: "linear",
                }}
                className="h-[460px] w-full object-cover sm:h-[580px] md:h-[680px] lg:h-[760px] xl:h-[820px]"
              />

              {/* Dark overlay - keeps text readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#03373D]/95 via-[#03373D]/65 to-[#03373D]/20" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#03373D]/45 via-transparent to-[#03373D]/20" />

              {/* Animated light streak */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
                initial={{ x: "-150%" }}
                animate={{ x: "450%" }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear",
                }}
              />

              {/* Six moving glass circles */}
              {floatingCircles.map((circle, circleIndex) => (
                <motion.div
                  key={circleIndex}
                  aria-hidden="true"
                  className={`pointer-events-none absolute ${circle.position} ${circle.size} rounded-full border ${circle.color} backdrop-blur-[1px]`}
                  initial={{ x: 0, y: 0 }}
                  animate={{
                    x: circle.x,
                    y: circle.y,
                    rotate: [0, 45, -25, 0],
                    scale: [1, 1.08, 0.96, 1],
                  }}
                  transition={{
                    duration: circle.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  }}
                >
                  {/* Subtle inner ring */}
                  <div className="absolute inset-[15%] rounded-full border border-white/15" />

                  {/* Small highlight */}
                  <div className="absolute left-[20%] top-[18%] h-3 w-3 rounded-full bg-white/30 blur-[1px] sm:h-4 sm:w-4" />
                </motion.div>
              ))}

              {/* Content */}
              <div className="absolute inset-0 z-10 flex items-center">
                <div className="w-full max-w-3xl px-6 py-12 sm:px-12 md:px-16 lg:px-20">
                  <motion.div
                    key={`${index}-content`}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.16,
                          delayChildren: 0.15,
                        },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Tag */}
                    <motion.div variants={textVariants}>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#00BF83]/40 bg-[#03373D]/40 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#B8D469] backdrop-blur-[2px] sm:text-xs">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#00BF83]" />
                        {banner.tag}
                      </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                      variants={textVariants}
                      className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                      {banner.title.split(" ").map((word, wordIndex, words) => {
                        const isLastWord = wordIndex === words.length - 1;

                        return (
                          <span
                            key={`${word}-${wordIndex}`}
                            className={
                              isLastWord
                                ? "mr-2 inline-block bg-gradient-to-r from-[#00BF83] to-[#B8D469] bg-clip-text text-transparent"
                                : "mr-2 inline-block"
                            }
                          >
                            {word}
                          </span>
                        );
                      })}
                    </motion.h1>

                    {/* Accent line */}
                    <motion.div
                      variants={textVariants}
                      className="mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-[#00BF83] to-[#B8D469] sm:w-28"
                    />

                    {/* Subtitle */}
                    <motion.p
                      variants={textVariants}
                      className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8 md:text-lg"
                    >
                      {banner.subtitle}
                    </motion.p>

                    {/* Bottom label */}
                    <motion.div
                      variants={textVariants}
                      className="mt-8 flex items-center gap-3 text-xs font-semibold tracking-widest text-white/70 sm:text-sm"
                    >
                      <span className="h-px w-10 bg-[#00BF83]" />
                      ZAP SHIFT
                      <span className="text-[#B8D469]">·</span>
                      BEYOND DELIVERY
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Decorative bottom line */}
              <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/10">
                <motion.div
                  key={`${index}-progress`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 4.5,
                    ease: "linear",
                  }}
                  className="h-full bg-gradient-to-r from-[#00BF83] to-[#B8D469]"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Carousel styling */}
      <style>{`
        .zap-banner .carousel,
        .zap-banner .slider-wrapper,
        .zap-banner .slider {
          width: 100%;
        }

        .zap-banner .slider {
          display: flex;
          align-items: stretch;
        }

        .zap-banner .slide {
          min-width: 100%;
          background: #03373D;
        }

        .zap-banner .slide > div {
          height: 100%;
        }

        .zap-banner .control-dots {
          bottom: 18px;
          z-index: 30;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
        }

        .zap-banner .control-dots .dot {
          width: 8px;
          height: 8px;
          margin: 0 4px;
          opacity: 0.65;
          background: #ffffff;
          box-shadow: none;
          transition: all 0.35s ease;
        }

        .zap-banner .control-dots .dot.selected {
          width: 28px;
          border-radius: 20px;
          opacity: 1;
          background: #00BF83;
        }

        .zap-banner .control-arrow {
          z-index: 30;
          top: 50%;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin: 0 14px;
          opacity: 0.8;
          background: rgba(3, 55, 61, 0.55);
          backdrop-filter: blur(3px);
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        .zap-banner .control-arrow:hover {
          opacity: 1;
          background: rgba(0, 191, 131, 0.8);
        }

        .zap-banner .control-arrow:before {
          border-top: 2px solid white;
          border-right: 2px solid white;
          border-left: 0;
          border-bottom: 0;
          width: 9px;
          height: 9px;
        }

        @media (max-width: 640px) {
          .zap-banner .control-arrow {
            width: 32px;
            height: 32px;
            margin: 0 5px;
          }

          .zap-banner .control-dots {
            bottom: 12px;
          }

          .zap-banner .control-dots .dot {
            width: 6px;
            height: 6px;
            margin: 0 3px;
          }

          .zap-banner .control-dots .dot.selected {
            width: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .zap-banner .control-dots .dot {
            transition: none;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Banner;

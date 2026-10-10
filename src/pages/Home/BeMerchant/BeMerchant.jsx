import location from "../../../assets/location.png";
import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle, FaStore } from "react-icons/fa";

const BeMerchant = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const benefits = [
    "Easy parcel management",
    "Reliable delivery service",
    "Convenient shipment tracking",
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className="w-full overflow-hidden py-1.5 sm:py-3 lg:py-4"
    >
      <div className="relative w-full overflow-hidden bg-[#03373D]">
        {/* Decorative Background Shapes */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-[#00BF83]/20 sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#00BF83]/10 blur-3xl" />

        <div className="pointer-events-none absolute right-1/3 top-0 h-64 w-64 rounded-full bg-[#00BF83]/5 blur-3xl" />

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          <div className="flex flex-col-reverse items-center gap-3 lg:flex-row-reverse lg:gap-5">
            {/* Illustration */}
            <motion.div
              variants={fadeUp}
              className="relative flex w-full justify-center lg:w-5/12"
            >
              <div className="absolute inset-5 rounded-full bg-[#00BF83]/10 blur-2xl" />

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex w-full max-w-xs items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 sm:p-5"
              >
                <img
                  src={location}
                  alt="Location illustration for parcel delivery"
                  loading="lazy"
                  className="w-full object-contain drop-shadow-2xl"
                />

                {/* Floating Delivery Badge */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-3 -left-2 flex items-center gap-2 rounded-xl border border-white/10 bg-[#06474B] p-2.5 shadow-xl sm:-left-4 sm:p-3"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00BF83]/15 text-[#00BF83]">
                    <FaStore size={16} />
                  </span>

                  <div>
                    <p className="text-xs font-bold text-white sm:text-sm">
                      Grow Your Business
                    </p>
                    <p className="mt-1 text-[10px] text-gray-300 sm:text-xs">
                      Partner with Zap Shift
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              variants={staggerContainer}
              className="w-full lg:w-7/12"
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-[#00BF83]/25 bg-[#00BF83]/10 px-3 py-1.5 text-xs font-semibold text-[#B8D469] sm:text-sm"
              >
                <FaStore />
                Grow with Zap Shift
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl"
              >
                Your Business Deserves{" "}
                <span className="bg-gradient-to-r from-[#00BF83] to-[#B8D469] bg-clip-text text-transparent">
                  Better Delivery
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-3 max-w-2xl text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7"
              >
                Merchant and customer satisfaction is our first priority. Zap
                Shift helps businesses manage parcel bookings, track shipments,
                and deliver packages conveniently with reliable service and
                clear pricing.
              </motion.p>

              {/* Benefits */}
              <motion.div
                variants={staggerContainer}
                className="mt-3 space-y-2"
              >
                {benefits.map((benefit) => (
                  <motion.div
                    key={benefit}
                    variants={fadeUp}
                    className="flex items-center gap-2.5 text-xs text-gray-200 sm:text-sm"
                  >
                    <FaCheckCircle
                      className="shrink-0 text-[#00BF83]"
                      size={15}
                    />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={fadeUp}
                className="mt-5 flex flex-wrap gap-3"
              >
                <button
                  type="button"
                  className="btn min-h-10 h-10 rounded-full border-none bg-[#00BF83] px-4 text-xs text-white shadow-none hover:bg-[#00BF83] sm:px-6 sm:text-sm"
                >
                  Become a Merchant
                  <FaArrowRight />
                </button>

                <button
                  type="button"
                  className="btn min-h-10 h-10 rounded-full border border-[#B8D469]/60 bg-transparent px-4 text-xs text-[#B8D469] shadow-none hover:border-[#B8D469]/60 hover:bg-transparent hover:text-[#B8D469] sm:px-6 sm:text-sm"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default BeMerchant;

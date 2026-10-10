import location from "../../../assets/location.png";
import { motion } from "framer-motion";

const BeMerchant = () => {
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
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
        staggerChildren: 0.18,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16"
    >
      <div className="overflow-hidden rounded-3xl bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] bg-cover bg-center bg-no-repeat p-6 sm:p-10 md:p-14 lg:p-16">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row-reverse lg:gap-14">
          {/* Illustration */}
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -8, rotate: 1 }}
            transition={{ duration: 0.3 }}
            className="flex w-full justify-center lg:w-5/12"
          >
            <motion.img
              src={location}
              alt="Location illustration for parcel delivery"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-xs rounded-2xl object-contain sm:max-w-sm"
            />
          </motion.div>

          {/* Content */}
          <motion.div variants={staggerContainer} className="w-full lg:w-7/12">
            <motion.span
              variants={fadeUp}
              className="inline-block rounded-full bg-[#00BF83]/15 px-4 py-2 text-sm font-semibold text-[#B8D469]"
            >
              Grow with Zap Shift
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              Merchant and Customer Satisfaction is Our First Priority
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="py-6 text-sm leading-7 text-gray-300 sm:text-base"
            >
              We aim to provide convenient parcel delivery with clear pricing
              and shipment management tools. Zap Shift helps customers manage
              their parcel bookings and delivery information in one place.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn rounded-full border-none bg-[#00BF83] px-6 text-white hover:bg-[#009D6B]"
              >
                Become a Merchant
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn rounded-full border-[#B8D469] bg-transparent px-6 text-[#B8D469] hover:border-[#B8D469] hover:bg-[#B8D469] hover:text-[#03373D]"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default BeMerchant;

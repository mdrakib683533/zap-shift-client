import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaGlobeAsia,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
  FaArrowUp,
} from "react-icons/fa";

const icons = {
  express: FaShippingFast,
  nationwide: FaGlobeAsia,
  fulfillment: FaBoxes,
  cash: FaMoneyBillWave,
  corporate: FaBuilding,
  return: FaUndoAlt,
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const ServiceCard = ({ service, index = 0 }) => {
  const Icon = icons[service.icon];

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -7,
        transition: { duration: 0.25 },
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-colors duration-300 hover:border-[#00BF83]/50 hover:shadow-xl sm:p-7"
    >
      {/* Hover Background */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#00BF83]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card Top */}
      <div className="relative flex items-start justify-between">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ duration: 0.25 }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00BF83]/10 text-3xl text-[#009966] transition-colors duration-300 group-hover:bg-[#00BF83] group-hover:text-white"
        >
          {Icon && <Icon />}
        </motion.div>

        {/* Service Number */}
        <span className="text-3xl font-extrabold tracking-tight text-base-content/10 transition-colors duration-300 group-hover:text-[#00BF83]/35">
          {service.number || String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card Content */}
      <div className="relative mt-6 flex flex-1 flex-col">
        <h3 className="text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-[#009966] sm:text-xl">
          {service.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-7 text-base-content/65">
          {service.description}
        </p>

        {/* Bottom Accent */}
        <div className="mt-6 flex items-center justify-between border-t border-base-300/80 pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-base-content/45 transition-colors duration-300 group-hover:text-[#009966]">
            Zap Shift Service
          </span>

          <motion.span
            whileHover={{ rotate: 45 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-base-200 text-sm text-primary transition-colors duration-300 group-hover:bg-[#00BF83] group-hover:text-white"
          >
            <FaArrowUp />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
};

export default ServiceCard;

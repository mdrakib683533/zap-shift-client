import { motion } from "framer-motion";

import {
  FaShippingFast,
  FaGlobe,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const icons = {
  express: FaShippingFast,
  nationwide: FaGlobe,
  fulfillment: FaBoxes,
  cash: FaMoneyBillWave,
  corporate: FaBuilding,
  return: FaUndo,
};

const ServiceCard = ({ service, index = 0 }) => {
  const Icon = icons[service.icon];

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
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -8,
        transition: { duration: 0.25 },
      }}
      className="group rounded-2xl border border-base-300 bg-base-100 p-7 text-center shadow-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-xl"
    >
      {/* Animated Icon */}
      <motion.div
        whileHover={{ scale: 1.12, rotate: 5 }}
        transition={{ duration: 0.25 }}
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-content"
      >
        {Icon && <Icon />}
      </motion.div>

      {/* Service Title */}
      <h3 className="text-xl font-bold leading-tight text-primary transition-colors duration-300">
        {service.title}
      </h3>

      {/* Service Description */}
      <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-base-content/60 transition-colors duration-300 group-hover:text-base-content/80">
        {service.description}
      </p>
    </motion.div>
  );
};

export default ServiceCard;

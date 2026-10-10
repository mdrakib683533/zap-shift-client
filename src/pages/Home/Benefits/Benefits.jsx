import { motion } from "framer-motion";

import BenefitCard from "./BenefitCard";
import tracking from "../../../assets/benefits/tracking.png";
import delivery from "../../../assets/benefits/delivery.png";
import call from "../../../assets/benefits/call.png";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: tracking,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: delivery,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: call,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="overflow-hidden py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 text-center sm:mb-8"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#00BF83]">
            The Zap Shift Advantage
          </p>

          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Why Choose Us
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
            Reliable delivery, real-time tracking, and dedicated support to make
            every parcel delivery easier.
          </p>
        </motion.div>

        {/* Animated Benefit Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-5"
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;

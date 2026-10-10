import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in major cities, with express delivery available in Dhaka within 4–6 hours.",
    icon: "express",
    number: "01",
  },
  {
    title: "Nationwide Delivery",
    description:
      "Reach customers across all 64 districts with reliable home delivery and smooth parcel transportation.",
    icon: "nationwide",
    number: "02",
  },
  {
    title: "Fulfillment Solution",
    description:
      "Simplify your business with inventory management, order processing, packaging, and fulfillment support.",
    icon: "fulfillment",
    number: "03",
  },
  {
    title: "Cash on Delivery",
    description:
      "Make online shopping easier for your customers with convenient cash-on-delivery services across Bangladesh.",
    icon: "cash",
    number: "04",
  },
  {
    title: "Corporate Logistics",
    description:
      "Flexible logistics solutions for businesses, including warehouse coordination and inventory management support.",
    icon: "corporate",
    number: "05",
  },
  {
    title: "Parcel Return",
    description:
      "Manage returns and exchanges with a convenient reverse-logistics service designed for online businesses.",
    icon: "return",
    number: "06",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const Services = () => {
  return (
    <section className="relative overflow-hidden bg-base-200 py-16 md:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#00BF83]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#B8D469]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00BF83]/20 bg-[#00BF83]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#009966]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00BF83]" />
            What We Offer
          </span>

          <h2 className="mt-5 text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl">
            Delivery Solutions
            <span className="mt-1 block bg-gradient-to-r from-[#00BF83] to-[#8EBC48] bg-clip-text text-transparent">
              Built Around You
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base">
            From a single parcel to your entire business operation, Zap Shift
            makes delivery simple, dependable, and hassle-free.
          </p>

          {/* Heading Accent */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-[#00BF83] to-[#B8D469]"
          />
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:flex-row sm:p-8"
        >
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-primary sm:text-2xl">
              Ready to deliver smarter?
            </h3>
            <p className="mt-2 text-sm text-base-content/60">
              Let Zap Shift handle your delivery while you grow your business.
            </p>
          </div>

          <a
            href="/send-parcel"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#00BF83] px-6 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-300 hover:bg-[#009966] focus:outline-none focus:ring-2 focus:ring-[#00BF83] focus:ring-offset-2"
          >
            Send a Parcel
            <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

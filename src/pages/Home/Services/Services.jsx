import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: "express",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: "nationwide",
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: "fulfillment",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: "cash",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: "corporate",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: "return",
  },
];

const Services = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  return (
    <section className="overflow-hidden bg-base-200 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#00BF83]">
            What We Offer
          </p>

          <h2 className="text-3xl font-bold text-primary md:text-4xl">
            Our Services
          </h2>

          <p className="mt-4 text-sm leading-6 text-base-content/60 md:text-base">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </motion.div>

        {/* Animated Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

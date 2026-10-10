import { Link } from "react-router";
import {
  FaArrowRight,
  FaBoxOpen,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  // Animation: content smoothly appears from below
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation: children appear one after another
  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const features = [
    {
      icon: FaShippingFast,
      title: "Easy Parcel Booking",
      description:
        "Book your parcels through a simple and convenient booking process.",
    },
    {
      icon: FaBoxOpen,
      title: "Parcel Tracking",
      description:
        "Check available tracking updates and stay informed about your shipments.",
    },
    {
      icon: FaCheckCircle,
      title: "Transparent Pricing",
      description:
        "View delivery costs based on parcel type, weight, and destination.",
    },
    {
      icon: FaTruck,
      title: "Convenient Service",
      description:
        "Manage your parcel bookings and shipment details from your dashboard.",
    },
    {
      icon: FaCheckCircle,
      title: "Payment History",
      description:
        "Review your recorded payments and transaction details in one place.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Coverage Information",
      description:
        "Explore our coverage page to find service areas and available locations.",
    },
  ];

  // Reusable animation settings for sections
  const scrollAnimation = {
    variants: fadeUp,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, amount: 0.15 },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#E9FFF6] via-base-100 to-[#F4F9DD]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Hero Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeUp}
                className="mb-6 inline-block rounded-full bg-[#00BF83]/10 px-4 py-2 text-sm font-semibold text-[#008F63]"
              >
                About Zap Shift
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="text-4xl font-extrabold leading-tight text-base-content sm:text-5xl md:text-6xl"
              >
                Delivering Trust,
                <span className="block text-[#00BF83]">
                  One Parcel at a Time.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-8 text-base-content/70 sm:text-lg"
              >
                We make parcel delivery easier with convenient booking, clear
                delivery costs, and shipment tracking features. Your delivery
                journey starts with Zap Shift.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3 sm:gap-4"
              >
                <Link
                  to="/sendParcel"
                  className="btn rounded-xl border-none bg-[#00BF83] px-5 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#009D6B] hover:shadow-lg sm:px-6"
                >
                  Send a Parcel
                  <FaArrowRight />
                </Link>

                <Link
                  to="/coverage"
                  className="btn rounded-xl border-[#00BF83] px-5 text-[#008F63] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00BF83] hover:text-white sm:px-6"
                >
                  Explore Coverage
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-base-content/70"
              >
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="shrink-0 text-[#00BF83]" />
                  Convenient Booking
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="shrink-0 text-[#00BF83]" />
                  Shipment Tracking
                </span>
              </motion.div>
            </motion.div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative flex min-h-64 items-center justify-center py-6"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute h-56 w-56 rounded-full bg-[#00BF83]/10 sm:h-72 sm:w-72 md:h-80 md:w-80"
              />

              <motion.div
                whileHover={{ y: -6, rotate: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl border border-base-300/50 bg-base-100 p-8 shadow-xl sm:p-10 md:p-14"
              >
                <FaTruck className="text-7xl text-[#00BF83] sm:text-8xl md:text-9xl" />

                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-4 -top-4 rounded-2xl bg-[#B8D469] p-3 shadow-lg sm:-right-5 sm:-top-5 sm:p-4"
                >
                  <FaBoxOpen className="text-2xl text-[#34451A] sm:text-3xl" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    duration: 2.5,
                    delay: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-lg sm:-bottom-5 sm:-left-5 sm:p-4"
                >
                  <FaCheckCircle className="text-2xl text-[#00BF83] sm:text-3xl" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <motion.section {...scrollAnimation} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <motion.div variants={fadeUp}>
              <p className="text-sm font-bold uppercase tracking-widest text-[#00BF83]">
                Who We Are
              </p>

              <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Making Parcel Delivery Simpler for Everyone
              </h2>

              <p className="mt-5 leading-8 text-base-content/70">
                Zap Shift is a parcel delivery platform designed to help
                customers create bookings, manage parcel information, review
                delivery costs, and access available tracking updates from one
                convenient place.
              </p>

              <p className="mt-4 leading-8 text-base-content/70">
                We focus on a straightforward digital experience so customers
                can manage important delivery tasks without unnecessary
                complications.
              </p>

              <Link
                to="/sendParcel"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-[#00A875] transition-all duration-300 hover:gap-3"
              >
                Start Sending <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-base-200/60 p-6 transition-shadow duration-300 hover:shadow-lg sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00BF83]/15">
                  <FaBoxOpen className="text-2xl text-[#00BF83]" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Our Purpose</h3>

                <p className="leading-7 text-base-content/70">
                  Make everyday parcel booking and management more convenient.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-base-200/60 p-6 transition-shadow duration-300 hover:shadow-lg sm:translate-y-8 sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#B8D469]/30">
                  <FaCheckCircle className="text-2xl text-[#6B8E23]" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Our Commitment</h3>

                <p className="leading-7 text-base-content/70">
                  Provide a clear, organized, and user-friendly delivery
                  experience.
                </p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-base-200/60 p-6 transition-shadow duration-300 hover:shadow-lg sm:col-span-2 sm:p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00BF83]/15">
                  <FaShippingFast className="text-2xl text-[#00BF83]" />
                </div>

                <h3 className="mb-3 text-xl font-bold">Our Focus</h3>

                <p className="leading-7 text-base-content/70">
                  Bring parcel booking, tracking, and payment information
                  together in one convenient platform.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        {...scrollAnimation}
        className="bg-base-200/50 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[#00BF83]">
              Our Direction
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Our Mission & Vision
            </h2>

            <p className="mt-4 leading-7 text-base-content/70">
              Our goal is to make parcel delivery more accessible, organized,
              and convenient for individuals and businesses.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {/* Mission */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8 md:p-10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#00BF83]/15">
                <FaShippingFast className="text-2xl text-[#00BF83]" />
              </div>

              <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>

              <p className="leading-7 text-base-content/70">
                To simplify parcel delivery through convenient booking, clear
                delivery costs, and accessible shipment tracking information.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-base-300/60 bg-base-100 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8 md:p-10"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#B8D469]/25">
                <FaBoxOpen className="text-2xl text-[#6B8E23]" />
              </div>

              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>

              <p className="leading-7 text-base-content/70">
                To build a trusted delivery experience where customers can
                manage their shipments with greater confidence, convenience, and
                peace of mind.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Why Choose Zap Shift Section */}
      <motion.section {...scrollAnimation} className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-[#00BF83]">
              The Zap Shift Advantage
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Why Choose Zap Shift?
            </h2>

            <p className="mt-4 leading-7 text-base-content/70">
              Explore the tools designed to make your parcel delivery experience
              easier to manage.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl border border-base-300 bg-base-100 p-6 transition-colors duration-300 hover:border-[#00BF83] hover:shadow-lg sm:p-7"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${
                      index % 2 === 0 ? "bg-[#00BF83]/15" : "bg-[#B8D469]/25"
                    }`}
                  >
                    <Icon
                      className={`text-2xl ${
                        index % 2 === 0 ? "text-[#00BF83]" : "text-[#6B8E23]"
                      }`}
                    />
                  </motion.div>

                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>

                  <p className="leading-7 text-base-content/70">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* Call To Action Section */}
      <motion.section {...scrollAnimation} className="px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00A875] to-[#00BF83] px-6 py-10 text-white sm:px-8 sm:py-12 md:px-14 md:py-16">
            {/* Decorative Circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10"
            />

            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-24 -right-6 h-56 w-56 rounded-full border-[30px] border-white/10"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-widest text-white/80">
                  Ready to Get Started?
                </p>

                <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                  Your Next Delivery Starts Here
                </h2>

                <p className="mt-4 leading-7 text-white/85">
                  Create a parcel booking and manage your delivery details with
                  Zap Shift.
                </p>
              </div>

              <Link
                to="/sendParcel"
                className="btn shrink-0 rounded-xl border-none bg-white px-6 text-[#008F63] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4F9DD] hover:shadow-lg sm:px-7"
              >
                Send a Parcel
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;

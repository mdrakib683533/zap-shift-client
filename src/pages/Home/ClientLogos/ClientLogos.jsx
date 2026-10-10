import MarqueeModule from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaHandshake, FaShippingFast, FaCheckCircle } from "react-icons/fa";

import client1 from "../../../assets/brands/amazon.png";
import client2 from "../../../assets/brands/amazon_vector.png";
import client3 from "../../../assets/brands/casio.png";
import client4 from "../../../assets/brands/moonstar.png";
import client5 from "../../../assets/brands/randstad.png";
import client6 from "../../../assets/brands/star.png";
import client7 from "../../../assets/brands/start_people.png";

const Marquee = MarqueeModule?.default || MarqueeModule;

const brands = [
  { id: 1, logo: client1, name: "Amazon" },
  { id: 2, logo: client2, name: "Amazon Vector" },
  { id: 3, logo: client3, name: "Casio" },
  { id: 4, logo: client4, name: "Moonstar" },
  { id: 5, logo: client5, name: "Randstad" },
  { id: 6, logo: client6, name: "Star" },
  { id: 7, logo: client7, name: "Start People" },
];

const ClientLogos = () => {
  return (
    <section className="relative overflow-hidden bg-base-100 py-16 sm:py-20 lg:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#00BF83]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#B8D469]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        >
          {/* Eyebrow */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00BF83]/25 bg-[#00BF83]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#009966]">
            <FaHandshake className="text-sm" />
            Trusted Partnerships
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold leading-tight text-primary sm:text-4xl md:text-5xl">
            Moving Businesses
            <span className="mt-1 block bg-gradient-to-r from-[#00BF83] to-[#8EBC48] bg-clip-text text-transparent">
              Forward Together
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base">
            Great deliveries start with great partnerships. We help businesses
            connect with customers through dependable parcel delivery and
            logistics support.
          </p>

          {/* Decorative Accent */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 76 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-[#00BF83] to-[#B8D469]"
          />
        </motion.div>

        {/* Brand Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-base-300/70 bg-base-200/50 py-8 shadow-sm sm:py-10"
        >
          {/* Showcase Top Label */}
          <div className="mb-7 flex items-center justify-center gap-2 px-4 text-center sm:mb-9">
            <span className="h-px w-8 bg-[#00BF83]/50 sm:w-12" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-base-content/55 sm:text-sm">
              Brands on the Move
            </span>
            <span className="h-px w-8 bg-[#00BF83]/50 sm:w-12" />
          </div>

          {/* Moving Logos */}
          <Marquee
            direction="left"
            speed={40}
            pauseOnHover
            gradient
            gradientColor="var(--fallback-b1,oklch(var(--b1)))"
            gradientWidth={55}
            autoFill
          >
            {brands.map((brand,) => (
              <motion.div
                key={brand.id}
                whileHover={{
                  scale: 1.1,
                  y: -4,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group mx-5 flex h-20 min-w-32 items-center justify-center rounded-2xl border border-transparent bg-base-100/70 px-5 shadow-sm transition-colors duration-300 hover:border-[#00BF83]/40 hover:bg-base-100 sm:mx-7 sm:min-w-40 sm:px-7"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  draggable="false"
                  className="max-h-9 w-auto max-w-28 object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-11 sm:max-w-32"
                />
              </motion.div>
            ))}
          </Marquee>

          {/* Bottom Accent */}
          <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-gradient-to-r from-[#00BF83] to-[#B8D469] sm:mt-9" />
        </motion.div>

        {/* Partnership Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="flex items-center gap-4 rounded-2xl border border-base-300/70 bg-base-100 p-5 transition-colors duration-300 hover:border-[#00BF83]/40">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00BF83]/10 text-xl text-[#009966]">
              <FaShippingFast />
            </div>

            <div>
              <h3 className="font-bold text-primary">
                Reliable Delivery Network
              </h3>
              <p className="mt-1 text-sm leading-6 text-base-content/60">
                Designed to support smooth parcel movement.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-base-300/70 bg-base-100 p-5 transition-colors duration-300 hover:border-[#00BF83]/40">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B8D469]/20 text-xl text-[#64852B]">
              <FaCheckCircle />
            </div>

            <div>
              <h3 className="font-bold text-primary">
                Customer-Focused Service
              </h3>
              <p className="mt-1 text-sm leading-6 text-base-content/60">
                Helping businesses deliver with confidence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;

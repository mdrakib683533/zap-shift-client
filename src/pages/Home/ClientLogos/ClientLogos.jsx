import MarqueeModule from "react-fast-marquee";
import { motion } from "framer-motion";

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
  { id: 2, logo: client2, name: "Amazon" },
  { id: 3, logo: client3, name: "Casio" },
  { id: 4, logo: client4, name: "Moonstar" },
  { id: 5, logo: client5, name: "Randstad" },
  { id: 6, logo: client6, name: "Star" },
  { id: 7, logo: client7, name: "Start People" },
];

const ClientLogos = () => {
  return (
    <section className="overflow-hidden bg-base-100 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00BF83] sm:text-sm">
            Trusted By
          </p>

          <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl md:text-4xl">
            Our Valued Brands
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-base-content/60 sm:text-base">
            Trusted by businesses across Bangladesh for fast, reliable, and
            hassle-free delivery services.
          </p>
        </motion.div>

        {/* Animated Brand Logos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-base-300/60 bg-base-200/40 py-7 sm:py-9"
        >
          <Marquee
            direction="left"
            speed={45}
            pauseOnHover
            gradient
            gradientWidth={60}
            autoFill
          >
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                whileHover={{ scale: 1.15, y: -3 }}
                transition={{ duration: 0.25 }}
                className="mx-8 flex h-12 items-center justify-center sm:mx-12 md:mx-[50px]"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  className="h-6 w-auto max-w-28 object-contain grayscale transition-[filter] duration-300 hover:grayscale-0 sm:h-7 md:h-8"
                />
              </motion.div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;

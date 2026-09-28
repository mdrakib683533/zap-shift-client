import MarqueeModule from "react-fast-marquee";

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
    <section className="bg-base-100 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary sm:text-sm">
            Trusted By
          </p>

          <h2 className="mt-2 text-primary text-2xl font-bold sm:text-3xl md:text-4xl">
            Our Valued Brands
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-base-content/60 sm:text-base">
            Trusted by businesses across Bangladesh for fast, reliable, and
            hassle-free delivery services.
          </p>
        </div>

        <div className="overflow-hidden">
          <Marquee
            direction="left"
            speed={45}
            pauseOnHover={true}
            gradient={true}
            gradientWidth={60}
            autoFill={true}
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="mx-[50px] flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-[24px] w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;

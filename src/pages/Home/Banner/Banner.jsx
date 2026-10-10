import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const Banner = () => {
  const banners = [
    {
      image: bannerImg1,
      legend: "Fast & Reliable Parcel Delivery",
    },
    {
      image: bannerImg2,
      legend: "Your Parcels, Delivered with Care",
    },
    {
      image: bannerImg3,
      legend: "Connecting People Through Delivery",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full overflow-hidden"
    >
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows
        showIndicators
        interval={5000}
        transitionTime={700}
        swipeable
        emulateTouch
        stopOnHover
      >
        {banners.map((banner, index) => (
          <div key={banner.image}>
            <div className="relative overflow-hidden">
              <motion.img
                src={banner.image}
                alt={banner.legend}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-56 w-full object-cover sm:h-80 md:h-[450px] lg:h-[520px]"
              />
            </div>

            <motion.p
              key={`legend-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: "easeOut",
              }}
              className="legend"
            >
              {banner.legend}
            </motion.p>
          </div>
        ))}
      </Carousel>
    </motion.section>
  );
};

export default Banner;

import { motion } from "framer-motion";

const BenefitCard = ({ benefit, index }) => {
  const { title, description, image } = benefit;

  const isReversed = index % 2 === 1;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
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

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -5,
        transition: { duration: 0.25 },
      }}
      className={`flex flex-col items-center gap-7 rounded-3xl border border-base-300/70 bg-base-100 p-6 shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-8 lg:gap-10 lg:p-10 ${
        isReversed ? "sm:flex-row-reverse" : "sm:flex-row"
      }`}
    >
      {/* Decorative Image Border */}
      <motion.div
        whileHover={{ scale: 1.04, rotate: 1 }}
        transition={{ duration: 0.3 }}
        className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-3xl border-2 border-dashed border-[#00BF83]/50 bg-[#00BF83]/5 p-5 sm:h-48 sm:w-48 lg:h-56 lg:w-56"
      >
        {/* Inner Border */}
        <div className="absolute inset-2 rounded-2xl border border-[#B8D469]/70" />

        {/* Corner Decorations */}
        <span className="absolute -left-1.5 top-7 h-8 w-1.5 rounded-full bg-[#00BF83]" />
        <span className="absolute -right-1.5 bottom-7 h-8 w-1.5 rounded-full bg-[#B8D469]" />

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="relative z-10 h-28 w-28 object-contain sm:h-32 sm:w-32 lg:h-36 lg:w-36"
        />
      </motion.div>

      {/* Divider */}
      <div
        className={`h-px w-full bg-gradient-to-r from-transparent via-[#00BF83]/60 to-transparent sm:h-32 sm:w-1 sm:bg-gradient-to-b ${
          isReversed
            ? "sm:from-transparent sm:via-[#B8D469] sm:to-transparent"
            : "sm:from-transparent sm:via-[#00BF83] sm:to-transparent"
        }`}
      />

      {/* Content */}
      <div
        className={`flex-1 text-center ${
          isReversed ? "sm:text-right" : "sm:text-left"
        }`}
      >
        <span className="inline-block rounded-full bg-[#00BF83]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#008F63]">
          Benefit 0{index + 1}
        </span>

        <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-base-content sm:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-[#00BF83] to-[#79B93D] bg-clip-text text-transparent">
            {title}
          </span>
        </h3>

        <p className="mt-4 text-sm leading-7 text-base-content/65 sm:text-base sm:leading-8 lg:text-lg">
          {description}
        </p>

        {/* Decorative Accent */}
        <div
          className={`mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#00BF83] to-[#B8D469] sm:mx-0 ${
            isReversed ? "sm:ml-auto sm:mr-0" : ""
          }`}
        />
      </div>
    </motion.div>
  );
};

export default BenefitCard;

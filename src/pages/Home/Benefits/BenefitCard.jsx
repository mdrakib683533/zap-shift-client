const BenefitCard = ({ benefit }) => {
  const { title, description, image } = benefit;

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl bg-base-100 p-6 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:p-8">
      {/* Image */}
      <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28">
        <img
          src={image}
          alt={title}
          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-base-300 sm:h-20 sm:w-px" />

      {/* Content */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>

        <p className="mt-2 max-w-4xl text-sm leading-6 text-base-content/60 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;

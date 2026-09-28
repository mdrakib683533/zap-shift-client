import {
  FaShippingFast,
  FaGlobe,
  FaBoxes,
  FaMoneyBillWave,
  FaBuilding,
  FaUndo,
} from "react-icons/fa";

const icons = {
  express: FaShippingFast,
  nationwide: FaGlobe,
  fulfillment: FaBoxes,
  cash: FaMoneyBillWave,
  corporate: FaBuilding,
  return: FaUndo,
};

const ServiceCard = ({ service }) => {
  const Icon = icons[service.icon];

  return (
    <div className="group rounded-2xl border border-base-300 bg-base-100 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:bg-primary/5 hover:shadow-xl">
      {/* Icon */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-content group-hover:scale-110">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-primary">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-base-content/60 transition-colors duration-300 group-hover:text-base-content/80">
        {service.description}
      </p>
    </div>
  );
};

export default ServiceCard;

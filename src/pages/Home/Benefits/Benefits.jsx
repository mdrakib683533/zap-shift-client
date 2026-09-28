import BenefitCard from "./BenefitCard";
import tracking from "../../../assets/benefits/tracking.png";
import delivery from "../../../assets/benefits/delivery.png";
import call from "../../../assets/benefits/call.png";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: tracking,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: delivery,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: call,
    },
  ];

  return (
    <section className="pt-4 pb-10 sm:pt-6 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-2 text-center sm:mb-4">
          <h2 className="text-3xl text-primary font-bold sm:text-4xl">Why Choose Us</h2>
        </div>

        {/* Benefit Cards */}
        <div className="space-y-5 bg-base-200">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;

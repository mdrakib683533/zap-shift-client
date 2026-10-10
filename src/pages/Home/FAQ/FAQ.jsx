import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How can I send a parcel with Zap Shift?",
    answer:
      "Visit the Send Parcel page, provide the sender and receiver details, select your parcel type, and submit your booking request.",
  },
  {
    question: "How much does parcel delivery cost?",
    answer:
      "Delivery charges depend on the parcel type, weight, and delivery distance. You can check the delivery cost while booking your parcel.",
  },
  {
    question: "How can I track my parcel?",
    answer:
      "Visit the Track Parcel page and enter your unique tracking ID to check the latest updates about your parcel.",
  },
  {
    question: "How long does parcel delivery take?",
    answer:
      "Delivery time depends on the destination and delivery conditions. You can check your parcel tracking page for the latest status updates.",
  },
  {
    question: "Which payment methods are available?",
    answer:
      "You can pay online using the payment options available during checkout.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? -1 : index));
  };

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 lg:px-8 xl:py-20">
      <div className="w-full">
        {/* Section Heading */}
        <div
          className="mx-auto mb-10 max-w-4xl text-center sm:mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="mb-3 inline-block rounded-full bg-[#E7F8F1] px-4 py-2 text-sm font-bold text-[#008F63]">
            Got Questions?
          </span>

          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-[#00BF83]">Questions</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Find answers to common questions about our parcel delivery services,
            tracking, payments, and more.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto w-full max-w-5xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#00BF83]/40 bg-[#F7FCF9] shadow-md shadow-[#00BF83]/5"
                    : "border-gray-200 bg-white hover:border-[#00BF83]/50 hover:shadow-sm"
                }`}
              >
                {/* Question Button */}
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={`text-base font-bold sm:text-lg ${
                      isOpen ? "text-[#008F63]" : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-[#00BF83] text-white"
                        : "bg-[#E7F8F1] text-[#008F63]"
                    }`}
                  >
                    {isOpen ? <FaMinus size={13} /> : <FaPlus size={13} />}
                  </span>
                </button>

                {/* Answer Animation */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-7 text-gray-600 sm:px-6 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Message */}
        <div
          className="mx-auto mt-10 max-w-5xl rounded-2xl bg-[#E7F8F1] p-6 text-center sm:mt-12 sm:p-8"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Still have questions?
          </h3>

          <p className="mt-2 text-gray-600">
            We are here to help you with your parcel delivery needs.
          </p>

          <a
            href="/about"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#00BF83] px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#009E6C] hover:shadow-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

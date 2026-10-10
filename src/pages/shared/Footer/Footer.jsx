import { Link } from "react-router";
import {
  FaShippingFast,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Coverage", to: "/coverage" },
    { label: "Send a Parcel", to: "/sendParcel" },
  ];

  const stats = [
    { number: "64+", label: "Districts" },
    { number: "10K+", label: "Deliveries" },
    { number: "24/7", label: "Support" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://facebook.com/",
      Icon: FaFacebookF,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/",
      Icon: FaLinkedinIn,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/",
      Icon: FaInstagram,
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl  px-3 py-9 sm:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_1.5fr_auto] md:gap-8 lg:gap-12">
          {/* Left: Logo and Description */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00BF83] text-2xl text-white">
                <FaShippingFast />
              </span>

              <span className="text-3xl font-extrabold tracking-tight">
                Zap<span className="text-[#00BF83]">Shift</span>
              </span>
            </Link>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-white/65 md:mx-0">
              Fast, secure and reliable parcel delivery across Bangladesh. We
              deliver your packages with care, speed and trust.
            </p>
          </div>

          {/* Middle: Statistics and Links */}
          <div className="text-center">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-5">
              {stats.map(({ number, label }) => (
                <div key={label}>
                  <h3 className="text-2xl font-extrabold text-[#00BF83] sm:text-3xl">
                    {number}
                  </h3>
                  <p className="mt-2 text-xs text-white/60 sm:text-sm">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Navigation Links */}
            <nav
              aria-label="Footer navigation"
              className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3"
            >
              {quickLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-sm text-white/65 transition-colors hover:text-[#00BF83]"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Social Icons */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="mb-4 text-sm font-semibold text-white">Follow Us</h3>

            <div className="flex gap-3">
              {socialLinks.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-200 hover:-translate-y-1 hover:border-[#00BF83] hover:bg-[#00BF83] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/50 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-white/80">Zap Shift</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

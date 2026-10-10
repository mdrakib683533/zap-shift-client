import { Link, NavLink } from "react-router";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import useAuth from "../../../hooks/useAuth";

import {
  FaHome,
  FaBoxOpen,
  FaMapMarkedAlt,
  FaUserShield,
  FaMotorcycle,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navItems = [
    {
      name: "Home",
      to: "/",
      icon: FaHome,
    },
    {
      name: "Send Parcel",
      to: "/sendParcel",
      icon: FaBoxOpen,
    },
    {
      name: "Coverage",
      to: "/coverage",
      icon: FaMapMarkedAlt,
    },
    ...(user
      ? [
          {
            name: "Dashboard",
            to: "/dashboard",
            icon: FaUserShield,
          },
        ]
      : []),
    {
      name: "Be a Rider",
      to: "/beARider",
      icon: FaMotorcycle,
    },
    {
      name: "About Us",
      to: "/about",
      icon: FaInfoCircle,
    },
  ];

  const renderNavLinks = (mobile = false) =>
    navItems.map(({ name, to, icon: Icon }) => (
      <li key={to}>
        <NavLink
          to={to}
          end={to === "/"}
          onClick={() => {
            if (to === window.location.pathname) {
              window.scrollTo(0, 0);
            }
          }}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 ${
              mobile ? "px-4 py-3 text-sm" : "px-3 py-2 text-sm"
            } ${
              isActive
                ? "bg-[#E7F8F1] text-[#008F63]"
                : "text-gray-600 hover:bg-[#F0FBF6] hover:text-[#008F63]"
            }`
          }
        >
          <Icon className="text-base" />
          <span>{name}</span>
        </NavLink>
      </li>
    ));

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar min-h-[76px] px-0">
          {/* Logo and Mobile Menu */}
          <div className="navbar-start gap-2">
            <div className="dropdown">
              <button
                type="button"
                tabIndex={0}
                aria-label="Open navigation menu"
                className="btn btn-ghost btn-circle lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-[#008F63]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <ul
                tabIndex={0}
                className="menu dropdown-content z-[60] mt-3 w-64 gap-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl"
              >
                {renderNavLinks(true)}
              </ul>
            </div>

            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              aria-label="Zap Shift home"
              className="flex items-center"
            >
              <ProFastLogo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="navbar-center hidden lg:flex"
          >
            <ul className="menu menu-horizontal items-center gap-1 px-0">
              {renderNavLinks()}
            </ul>
          </nav>

          {/* Authentication */}
          <div className="navbar-end gap-2">
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Avatar */}
                <div
                  className="tooltip tooltip-bottom hidden sm:block"
                  data-tip={user.displayName || user.email}
                >
                  <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-[#B8D469] bg-[#E7F8F1]">
                      <img
                        src={
                          user.photoURL ||
                          "https://ui-avatars.com/api/?name=Zap+Shift&background=E7F8F1&color=008F63"
                        }
                        alt={user.displayName || "User"}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="btn h-10 min-h-10 rounded-xl border-0 bg-[#E7F8F1] px-3 text-sm font-bold text-[#008F63] shadow-none hover:bg-[#D2F2E5] sm:px-4"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn h-11 min-h-11 rounded-xl border-0 bg-[#00BF83] px-4 font-bold text-white shadow-md shadow-[#00BF83]/20 transition-all hover:-translate-y-0.5 hover:bg-[#009E6C] sm:px-6"
              >
                <FaSignInAlt />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/shared/ProFastLogo/ProFastLogo";
import {
  LuHouse,
  LuPackage,
  LuCreditCard,
  LuMapPin,
  LuUserRoundPen,
  LuBike,
  LuClock3,
  LuUserCog,
  LuUserCheck,
  LuClipboardList,
  LuCircleCheckBig,
  LuWallet,
} from "react-icons/lu";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, isLoading } = useUserRole();
  console.log("role:", role);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProFastLogo></ProFastLogo>
          <li>
            <NavLink to="/" className="flex items-center gap-3">
              <LuHouse size={20} />
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/myParcels"
              className="flex items-center gap-3"
            >
              <LuPackage size={20} />
              <span>My Parcels</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/paymentHistory"
              className="flex items-center gap-3"
            >
              <LuCreditCard size={20} />
              <span>Payment History</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/track" className="flex items-center gap-3">
              <LuMapPin size={20} />
              <span>Track Package</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/updateProfile"
              className="flex items-center gap-3"
            >
              <LuUserRoundPen size={20} />
              <span>Update Profile</span>
            </NavLink>
          </li>

          {/* rider links */}
          {!isLoading && role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/pending-deliveries"
                  className="flex items-center gap-3"
                >
                  <LuClipboardList size={20} />
                  <span>Pending Deliveries</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/completed-deliveries"
                  className="flex items-center gap-3"
                >
                  <LuCircleCheckBig size={20} />
                  <span>Completed Deliveries</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/cashout"
                  className="flex items-center gap-3"
                >
                  <LuWallet size={20} />
                  <span>My Earning</span>
                </NavLink>
              </li>
            </>
          )}

          {/* admin link */}
          {!isLoading && role == "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/assignRider"
                  className="flex items-center gap-3"
                >
                  <LuUserCheck size={20} />
                  <span>Assign Rider</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activeRiders"
                  className="flex items-center gap-3"
                >
                  <LuBike size={20} />
                  <span>Active Riders</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/pendingRiders"
                  className="flex items-center gap-3"
                >
                  <LuClock3 size={20} />
                  <span>Pending Riders</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeAdmin"
                  className="flex items-center gap-3"
                >
                  <LuUserCog size={20} />
                  <span>Make Admin</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manageCashouts"
                  className="flex items-center gap-3"
                >
                  <LuWallet size={20} />
                  <span>Cash Out Management</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import {
  FaBox,
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaPlus,
  FaShippingFast,
  FaTruck,
} from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch the current user's parcels
  const {
    data: parcels = [],
    isPending: parcelsLoading,
    isError: parcelsError,
  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels?email=${encodeURIComponent(user.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch the current user's payment history
  const {
    data: payments = [],
    isPending: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments?email=${encodeURIComponent(user.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Calculate dashboard summary
  const totalParcels = parcels.length;

  const deliveredParcels = parcels.filter(
    (parcel) => parcel.delivery_status === "delivered",
  ).length;

  const pendingParcels = totalParcels - deliveredParcels;

  const totalPaid = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0,
  );

  // Show a loading state while data is being fetched
  if (parcelsLoading || paymentsLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#00BF83]"></span>
      </div>
    );
  }

  // Show an error message if an API request fails
  if (parcelsError || paymentsError) {
    return (
      <div className="rounded-2xl bg-base-100 p-8 text-center shadow-sm">
        <p className="mb-4 text-lg font-semibold text-error">
          Failed to load dashboard data.
        </p>
        <p className="text-sm opacity-70">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  // Dashboard summary card data
  const summaryCards = [
    {
      title: "Total Parcels",
      value: totalParcels,
      icon: <FaBox />,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Pending Parcels",
      value: pendingParcels,
      icon: <FaClock />,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Delivered Parcels",
      value: deliveredParcels,
      icon: <FaCheckCircle />,
      color: "bg-sky-100 text-sky-700",
    },
    {
      title: "Total Paid",
      value: `৳${totalPaid}`,
      icon: <FaCreditCard />,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  // Display the latest five parcels first
  const recentParcels = [...parcels]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-8 mx-2 my-2">
      {/* Welcome banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00BF83] to-[#B8D469] p-6 text-white shadow-md sm:p-10">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-wider">
            User Dashboard
          </p>

          <h1 className="text-2xl font-bold sm:text-4xl">
            Welcome back, {user?.displayName || "User"}!
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 sm:text-base">
            Manage your parcels, track deliveries, and check your payment
            history—all in one place.
          </p>

          <Link
            to="/sendParcel"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-[#087A58] shadow-sm transition hover:bg-gray-100"
          >
            <FaPlus />
            Send a Parcel
          </Link>
        </div>

        <FaShippingFast className="absolute -bottom-5 -right-3 hidden text-[170px] text-white/20 sm:block" />
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Quick Actions</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            to="/sendParcel"
            className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-[#00BF83] hover:shadow-md"
          >
            <div className="rounded-xl bg-emerald-100 p-3 text-xl text-emerald-700">
              <FaPlus />
            </div>
            <div>
              <h3 className="font-bold">Send a Parcel</h3>
              <p className="mt-1 text-sm opacity-60">Create a delivery</p>
            </div>
          </Link>

          <Link
            to="/dashboard/myParcels"
            className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-[#00BF83] hover:shadow-md"
          >
            <div className="rounded-xl bg-sky-100 p-3 text-xl text-sky-700">
              <FaBoxOpen />
            </div>
            <div>
              <h3 className="font-bold">My Parcels</h3>
              <p className="mt-1 text-sm opacity-60">Manage your parcels</p>
            </div>
          </Link>

          <Link
            to="/dashboard/track"
            className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-[#00BF83] hover:shadow-md"
          >
            <div className="rounded-xl bg-amber-100 p-3 text-xl text-amber-700">
              <FaTruck />
            </div>
            <div>
              <h3 className="font-bold">Track a Parcel</h3>
              <p className="mt-1 text-sm opacity-60">Check delivery updates</p>
            </div>
          </Link>

          <Link
            to="/dashboard/paymentHistory"
            className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-1 hover:border-[#00BF83] hover:shadow-md"
          >
            <div className="rounded-xl bg-purple-100 p-3 text-xl text-purple-700">
              <FaCreditCard />
            </div>
            <div>
              <h3 className="font-bold">Payment History</h3>
              <p className="mt-1 text-sm opacity-60">Review your payments</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Summary cards */}
      <section>
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Your Overview</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm opacity-65">{card.title}</p>
                  <h3 className="mt-2 text-3xl font-bold">{card.value}</h3>
                </div>

                <div className={`rounded-2xl p-4 text-2xl ${card.color}`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent parcels */}
      <section className="overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 p-5">
          <div>
            <h2 className="text-xl font-bold">Recent Parcels</h2>
            <p className="mt-1 text-sm opacity-60">
              Your latest parcel activity
            </p>
          </div>

          <Link
            to="/dashboard/myParcels"
            className="rounded-lg bg-[#00BF83] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#009D6B]"
          >
            View All
          </Link>
        </div>

        {recentParcels.length === 0 ? (
          // Empty state for a new user
          <div className="px-5 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
              <FaBoxOpen />
            </div>

            <h3 className="text-lg font-bold">No parcels yet!</h3>

            <p className="mx-auto mt-2 max-w-md text-sm opacity-65">
              You have not sent any parcels yet. Create your first delivery to
              get started.
            </p>

            <Link
              to="/sendParcel"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#00BF83] px-5 py-3 font-semibold text-white transition hover:bg-[#009D6B]"
            >
              <FaPlus />
              Send Your First Parcel
            </Link>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Parcel</th>
                  <th>Tracking ID</th>
                  <th>Delivery Status</th>
                  <th>Payment</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {recentParcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td>
                      <p className="font-semibold">
                        {parcel.parcelName || "Unnamed Parcel"}
                      </p>
                      <p className="text-xs opacity-60">
                        {parcel.createdAt
                          ? new Date(parcel.createdAt).toLocaleDateString()
                          : "Date unavailable"}
                      </p>
                    </td>

                    <td>
                      <span className="font-mono text-xs">
                        {parcel.trackingId || "N/A"}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-outline badge-sm capitalize">
                        {(parcel.delivery_status || "pending").replace(
                          /_/g,
                          " ",
                        )}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          parcel.payment_status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.payment_status || "unpaid"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap font-semibold">
                      ৳{parcel.deliveryCost ?? 0}
                    </td>

                    <td>
                      <Link
                        to={
                          parcel.trackingId
                            ? `/dashboard/track?trackingId=${encodeURIComponent(
                                parcel.trackingId,
                              )}`
                            : "/dashboard/track"
                        }
                        className="font-semibold text-[#009D6B] hover:underline"
                      >
                        Track
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;

import { useQuery } from "@tanstack/react-query";
import {
  LuClipboardList,
  LuCircleCheckBig,
  LuWallet,
  LuBanknote,
  LuTrendingUp,
  LuArrowUpRight,
  LuPackage,
  LuCalendarDays,
  LuClock,
} from "react-icons/lu";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const RiderDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch pending delivery tasks
  const {
    data: tasks = [],
    isPending: tasksLoading,
    isError: tasksError,
  } = useQuery({
    queryKey: ["rider-tasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/tasks?email=${encodeURIComponent(user.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch completed deliveries and earnings
  const {
    data: completedData = {
      totalDeliveries: 0,
      totalEarnings: 0,
      deliveries: [],
    },
    isPending: completedLoading,
    isError: completedError,
  } = useQuery({
    queryKey: ["completed-deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-deliveries?email=${encodeURIComponent(user.email)}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch cash-out summary
  const {
    data: earnings = {
      totalEarnings: 0,
      availableBalance: 0,
      requestedAmount: 0,
      cashedOut: 0,
      todayIncome: 0,
      thisWeekIncome: 0,
      thisMonthIncome: 0,
      thisYearIncome: 0,
    },
    isPending: earningsLoading,
    isError: earningsError,
  } = useQuery({
    queryKey: ["cashout-summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/cashouts/summary");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Format currency
  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-BD", {
      maximumFractionDigits: 2,
    });

  // Statistics cards
  const stats = [
    {
      title: "Pending Deliveries",
      value: tasks.length,
      description: "Tasks assigned to you",
      icon: LuClipboardList,
      iconBg: "bg-lime-100",
      iconColor: "text-lime-700",
      link: "/dashboard/pending-deliveries",
      isMoney: false,
    },
    {
      title: "Completed Deliveries",
      value: completedData.totalDeliveries,
      description: "Successfully completed",
      icon: LuCircleCheckBig,
      iconBg: "bg-green-100",
      iconColor: "text-green-700",
      link: "/dashboard/completed-deliveries",
      isMoney: false,
    },
    {
      title: "Total Earnings",
      value: earnings.totalEarnings,
      description: "Your total delivery income",
      icon: LuWallet,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      link: "/dashboard/cashout",
      isMoney: true,
    },
    {
      title: "Available Balance",
      value: earnings.availableBalance,
      description: "Available for cash out",
      icon: LuBanknote,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      link: "/dashboard/cashout",
      isMoney: true,
    },
  ];

  // Income overview cards
  const incomeCards = [
    {
      title: "Today's Income",
      value: earnings.todayIncome,
      icon: LuClock,
      color: "text-lime-700",
    },
    {
      title: "This Week",
      value: earnings.thisWeekIncome,
      icon: LuTrendingUp,
      color: "text-green-700",
    },
    {
      title: "This Month",
      value: earnings.thisMonthIncome,
      icon: LuCalendarDays,
      color: "text-blue-700",
    },
  ];

  const isLoading = tasksLoading || completedLoading || earningsLoading;
  const isError = tasksError || completedError || earningsError;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="m-4 rounded-xl border border-error/30 bg-base-100 p-8 text-center">
        <h3 className="text-xl font-bold text-error">
          Failed to Load Dashboard
        </h3>
        <p className="mt-2 text-base-content/60">
          Dashboard information could not be loaded. Please refresh the page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-8 p-4 sm:p-6">
      {/* Welcome header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#CAEB66] to-[#E6F6B5] p-6 sm:p-8">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-700">
            Rider Dashboard
          </p>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-4xl">
            Welcome back, {user?.displayName || "Rider"}!
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-700 sm:text-base">
            Manage your deliveries, track your earnings, and keep every parcel
            moving with Zap Shift.
          </p>

          <Link
            to="/dashboard/pending-deliveries"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            View My Tasks
            <LuArrowUpRight size={18} />
          </Link>
        </div>

        <LuPackage
          className="absolute -bottom-6 -right-4 hidden text-gray-900/10 sm:block"
          size={180}
        />
      </section>

      {/* Statistics cards */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">Dashboard Overview</h2>
          <p className="mt-1 text-sm text-base-content/60">
            A quick look at your delivery performance and earnings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="group min-w-0 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon size={24} />
                  </div>

                  <LuArrowUpRight
                    size={20}
                    className="text-base-content/40 transition group-hover:text-success"
                  />
                </div>

                <p className="mt-5 text-sm font-medium text-base-content/60">
                  {stat.title}
                </p>

                <h3 className="mt-2 break-words text-2xl font-extrabold sm:text-3xl">
                  {stat.isMoney ? `৳${formatAmount(stat.value)}` : stat.value}
                </h3>

                <p className="mt-2 text-xs text-base-content/50">
                  {stat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Income overview */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">Income Overview</h2>
          <p className="mt-1 text-sm text-base-content/60">
            Your earnings from completed deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {incomeCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-base-200 p-3">
                    <Icon size={22} className={card.color} />
                  </div>

                  <p className="text-sm font-medium text-base-content/60">
                    {card.title}
                  </p>
                </div>

                <h3 className={`mt-4 text-2xl font-extrabold ${card.color}`}>
                  ৳{formatAmount(card.value)}
                </h3>
              </div>
            );
          })}
        </div>

        <Link
          to="/dashboard/cashout"
          className="mt-4 inline-flex items-center gap-2 font-semibold text-success hover:underline"
        >
          View all earnings and cash-out history
          <LuArrowUpRight size={18} />
        </Link>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold sm:text-2xl">Quick Actions</h2>
          <p className="mt-1 text-sm text-base-content/60">
            Quickly access your rider activities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            to="/dashboard/pending-deliveries"
            className="flex items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:border-[#9FC83F] hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-lime-100 p-3 text-lime-800">
                <LuClipboardList size={25} />
              </div>

              <div>
                <h3 className="font-bold">Manage Deliveries</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  Pick up and deliver assigned parcels.
                </p>
              </div>
            </div>

            <LuArrowUpRight className="shrink-0" size={22} />
          </Link>

          <Link
            to="/dashboard/completed-deliveries"
            className="flex items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:border-[#9FC83F] hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3 text-green-800">
                <LuCircleCheckBig size={25} />
              </div>

              <div>
                <h3 className="font-bold">Delivery History</h3>
                <p className="mt-1 text-sm text-base-content/60">
                  Review your completed deliveries.
                </p>
              </div>
            </div>

            <LuArrowUpRight className="shrink-0" size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RiderDashboard;

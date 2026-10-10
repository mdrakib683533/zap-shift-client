import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CashOut = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Get cash out summary and income by period
  const {
    data: summary = {
      totalEarnings: 0,
      availableBalance: 0,
      requestedAmount: 0,
      cashedOut: 0,
      todayIncome: 0,
      thisWeekIncome: 0,
      thisMonthIncome: 0,
      thisYearIncome: 0,
    },
    isPending: summaryLoading,
    isError: summaryError,
  } = useQuery({
    queryKey: ["cashout-summary", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/cashouts/summary");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Get cash out history
  const {
    data: cashouts = [],
    isPending: historyLoading,
    isError: historyError,
  } = useQuery({
    queryKey: ["cashouts", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/cashouts");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Loading state
  if (summaryLoading || historyLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error state
  if (summaryError || historyError) {
    return (
      <div className="py-20 text-center">
        <p className="font-semibold text-error">
          Failed to load cash out information.
        </p>
      </div>
    );
  }

  // Format money
  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-BD", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Overall summary cards
  const summaryCards = [
    {
      title: "Total Earnings",
      amount: summary.totalEarnings,
      color: "text-primary",
    },
    {
      title: "Available Balance",
      amount: summary.availableBalance,
      color: "text-success",
    },
    {
      title: "Pending Requests",
      amount: summary.requestedAmount,
      color: "text-warning",
    },
    {
      title: "Cashed Out",
      amount: summary.cashedOut,
      color: "text-info",
    },
  ];

  // Income period cards
  const incomeCards = [
    {
      title: "Today's Income",
      amount: summary.todayIncome,
      color: "text-primary",
    },
    {
      title: "This Week",
      amount: summary.thisWeekIncome,
      color: "text-success",
    },
    {
      title: "This Month",
      amount: summary.thisMonthIncome,
      color: "text-info",
    },
    {
      title: "This Year",
      amount: summary.thisYearIncome,
      color: "text-secondary",
    },
  ];

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">My Earnings</h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Track your earnings, income periods, cash out requests, and payments.
        </p>
      </div>

      {/* Overall Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-xl bg-base-100 p-4 shadow sm:p-5"
          >
            <p className="text-sm text-gray-500">{card.title}</p>

            <h3 className={`mt-3 break-words text-2xl font-bold ${card.color}`}>
              ৳{formatAmount(card.amount)}
            </h3>
          </div>
        ))}
      </div>

      {/* Income By Period */}
      <div className="mb-5">
        <h3 className="text-xl font-bold sm:text-2xl">Income Overview</h3>

        <p className="mt-2 text-sm text-gray-500">
          Your income from completed deliveries during each period.
        </p>
      </div>

      {/* Income Period Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {incomeCards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm sm:p-5"
          >
            <p className="text-sm text-gray-500">{card.title}</p>

            <h3 className={`mt-3 break-words text-2xl font-bold ${card.color}`}>
              ৳{formatAmount(card.amount)}
            </h3>
          </div>
        ))}
      </div>

      {/* Cash Out History Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold sm:text-2xl">Cash Out History</h3>

        <p className="mt-2 text-sm text-gray-500">
          View the status of your cash out requests and payments.
        </p>
      </div>

      {/* Cash Out History */}
      {cashouts.length > 0 ? (
        <div className="w-full min-w-0 rounded-xl bg-base-100 shadow">
          {/* Mobile and tablet: card layout */}
          <div className="grid grid-cols-1 gap-3 p-3 lg:hidden sm:p-4">
            {cashouts.map((cashout, index) => (
              <div
                key={cashout._id || index}
                className="min-w-0 rounded-xl border border-base-300 p-4"
              >
                <div className="flex min-w-0 items-start justify-between gap-3 border-b border-base-300 pb-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">
                      Cash Out #{index + 1}
                    </p>

                    <p className="mt-1 break-all text-sm font-semibold">
                      {cashout.trackingId || "N/A"}
                    </p>
                  </div>

                  <span
                    className={`badge badge-sm shrink-0 ${
                      cashout.status === "paid"
                        ? "badge-success"
                        : cashout.status === "requested"
                          ? "badge-warning"
                          : "badge-info"
                    }`}
                  >
                    {cashout.status === "paid"
                      ? "Paid"
                      : cashout.status === "requested"
                        ? "Pending"
                        : "Available"}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="min-w-0 rounded-lg bg-base-200 p-3">
                    <p className="text-xs text-gray-500">Amount</p>
                    <p className="mt-1 break-words text-lg font-bold">
                      ৳{formatAmount(cashout.earningAmount)}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-base-200 p-3">
                    <p className="text-xs text-gray-500">Requested At</p>
                    <p className="mt-1 break-words text-sm">
                      {formatDate(cashout.requestedAt)}
                    </p>
                  </div>

                  <div className="min-w-0 rounded-lg bg-base-200 p-3 sm:col-span-2">
                    <p className="text-xs text-gray-500">Paid At</p>
                    <p className="mt-1 break-words text-sm">
                      {formatDate(cashout.paidAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: full table */}
          <div className="hidden w-full overflow-x-auto lg:block">
            <table className="table w-full text-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tracking ID</th>
                  <th>Amount</th>
                  <th>Requested At</th>
                  <th>Paid At</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {cashouts.map((cashout, index) => (
                  <tr key={cashout._id || index} className="hover">
                    <td>{index + 1}</td>

                    <td className="break-all text-xs">
                      {cashout.trackingId || "N/A"}
                    </td>

                    <td className="whitespace-nowrap font-semibold">
                      ৳{formatAmount(cashout.earningAmount)}
                    </td>

                    <td className="text-xs">
                      {formatDate(cashout.requestedAt)}
                    </td>

                    <td className="text-xs">{formatDate(cashout.paidAt)}</td>

                    <td>
                      <span
                        className={`badge badge-sm ${
                          cashout.status === "paid"
                            ? "badge-success"
                            : cashout.status === "requested"
                              ? "badge-warning"
                              : "badge-info"
                        }`}
                      >
                        {cashout.status === "paid"
                          ? "Paid"
                          : cashout.status === "requested"
                            ? "Pending"
                            : "Available"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-base-100 py-12 text-center shadow">
          <h4 className="text-lg font-semibold">No Cash Out History</h4>

          <p className="mt-2 text-sm text-gray-500">
            Your cash out requests will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default CashOut;

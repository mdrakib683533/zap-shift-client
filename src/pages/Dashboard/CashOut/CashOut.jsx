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

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-4">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Earning</h2>

        <p className="mt-2 text-gray-500">
          Track your earnings, income periods, cash out requests, and payments.
        </p>
      </div>

      {/* Overall Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-xl bg-base-100 p-5 shadow"
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
        <h3 className="text-2xl font-bold">Income Overview</h3>

        <p className="mt-2 text-sm text-gray-500">
          Your income from completed deliveries during each period.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {incomeCards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm"
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
        <h3 className="text-2xl font-bold">Cash Out History</h3>

        <p className="mt-2 text-sm text-gray-500">
          View the status of your cash out requests and payments.
        </p>
      </div>

      {/* Cash Out History */}
      {cashouts.length > 0 ? (
        <div className="w-full overflow-hidden rounded-xl bg-base-100 shadow">
          <table className="table table-fixed w-full text-sm">
            <thead>
              <tr>
                <th className="w-[7%]">#</th>
                <th className="w-[24%]">Tracking ID</th>
                <th className="w-[15%]">Amount</th>
                <th className="w-[20%]">Requested At</th>
                <th className="w-[16%]">Paid At</th>
                <th className="w-[18%]">Status</th>
              </tr>
            </thead>

            <tbody>
              {cashouts.map((cashout, index) => (
                <tr key={cashout._id} className="hover">
                  <td>{index + 1}</td>

                  <td className="break-all text-xs">{cashout.trackingId}</td>

                  <td className="break-words font-semibold">
                    ৳{formatAmount(cashout.earningAmount)}
                  </td>

                  <td className="break-words text-xs">
                    {formatDate(cashout.requestedAt)}
                  </td>

                  <td className="break-words text-xs">
                    {formatDate(cashout.paidAt)}
                  </td>

                  <td className="break-words">
                    <span
                      className={`badge badge-sm whitespace-normal ${
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

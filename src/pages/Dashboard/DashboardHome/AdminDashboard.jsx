import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const COLORS = ["#00BF83", "#F59E0B", "#64748B", "#EF4444"];

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard statistics
  const {
    data: stats = {},
    isLoading: statsLoading,
    isError: statsError,
  } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  // Fetch pending riders count
  const {
    data: pendingRidersData = { count: 0 },
    isLoading: pendingRidersLoading,
    isError: pendingRidersError,
  } = useQuery({
    queryKey: ["admin-pending-riders-count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/pending-riders-count");
      return res.data;
    },
  });

  // Fetch delivery status statistics
  const {
    data: statusStats = [],
    isLoading: statusLoading,
    isError: statusError,
  } = useQuery({
    queryKey: ["admin-delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/delivery-status-stats");
      return res.data;
    },
  });

  // Fetch monthly delivery statistics
  const {
    data: monthlyStats = [],
    isLoading: monthlyLoading,
    isError: monthlyError,
  } = useQuery({
    queryKey: ["admin-monthly-deliveries"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/monthly-deliveries");
      return res.data;
    },
  });

  // Fetch recent parcels
  const {
    data: recentParcels = [],
    isLoading: parcelsLoading,
    isError: parcelsError,
  } = useQuery({
    queryKey: ["admin-recent-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/recent-parcels");
      return res.data;
    },
  });

  // Fetch recent successful payments
  const {
    data: recentPayments = [],
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["admin-recent-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/recent-payments");
      return res.data;
    },
  });

  // Show loading while requests are running
  if (
    statsLoading ||
    pendingRidersLoading ||
    statusLoading ||
    monthlyLoading ||
    parcelsLoading ||
    paymentsLoading
  ) {
    return <Loading />;
  }

  // Show an error if any API request fails
  if (
    statsError ||
    pendingRidersError ||
    statusError ||
    monthlyError ||
    parcelsError ||
    paymentsError
  ) {
    return (
      <p className="rounded-xl border border-error/20 bg-error/5 p-5 text-sm text-error">
        Failed to load dashboard data. Please try again.
      </p>
    );
  }

  // Human-readable delivery status labels
  const statusLabels = {
    not_collected: "Pending Collection",
    rider_assigned: "Rider Assigned",
    in_transit: "In Transit",
    delivered: "Delivered",
  };

  // Prepare delivery status chart data
  const chartData = statusStats.map((item) => ({
    name: statusLabels[item._id] || item._id,
    value: item.count,
  }));

  // Format monthly labels
  const formattedMonthlyStats = monthlyStats.map((item) => {
    const [year, month] = item.month.split("-");

    const monthName = new Date(Number(year), Number(month) - 1).toLocaleString(
      "en-US",
      {
        month: "short",
      },
    );

    return {
      ...item,
      month: `${monthName} ${year}`,
    };
  });

  // Dashboard KPI cards
  const cards = [
    {
      title: "Total Parcels",
      value: stats.totalParcels ?? 0,
    },
    {
      title: "In Transit",
      value: stats.inTransit ?? 0,
    },
    {
      title: "Delivered",
      value: stats.delivered ?? 0,
    },
    {
      title: "Total Payments",
      value: `৳${(stats.totalPayments ?? 0).toLocaleString("en-US")}`,
    },
    {
      title: "Pending Riders",
      value: pendingRidersData.count ?? 0,
    },
  ];

  // Format parcel delivery status
  const formatStatus = (status) => statusLabels[status] || status || "Unknown";

  // Delivery status badge styles
  const getStatusClass = (status) => {
    if (status === "delivered") {
      return "bg-success/15 text-success";
    }

    if (status === "in_transit") {
      return "bg-info/15 text-info";
    }

    if (status === "rider_assigned") {
      return "bg-warning/15 text-warning";
    }

    return "bg-base-300 text-base-content";
  };

  return (
    <div className="my-2 min-w-0 space-y-5 px-1 sm:space-y-6 sm:px-2 lg:space-y-8">
      {/* Dashboard heading */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Admin Dashboard
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            Monitor your parcels, deliveries and payments.
          </p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="min-w-0 rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl sm:p-5 lg:p-6"
          >
            <p className="text-xs font-medium leading-5 text-base-content/60 sm:text-sm">
              {card.title}
            </p>

            <h3 className="mt-2 break-words text-xl font-bold text-primary sm:mt-3 sm:text-2xl lg:text-3xl">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Dashboard charts */}
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Monthly deliveries chart */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base font-bold sm:text-xl">
              Monthly Deliveries
            </h3>

            <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
              Delivery performance by month
            </p>
          </div>

          {formattedMonthlyStats.length === 0 ? (
            <p className="py-10 text-center text-sm text-base-content/60">
              No monthly delivery data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={formattedMonthlyStats}
                margin={{ top: 10, right: 5, left: -22, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="currentColor"
                  opacity={0.12}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  minTickGap={12}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="deliveries"
                  name="Deliveries"
                  fill="#00BF83"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Delivery status chart */}
        <div className="min-w-0 overflow-hidden rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base font-bold sm:text-xl">Delivery Status</h3>

            <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
              Current parcel status breakdown
            </p>
          </div>

          {chartData.length === 0 ? (
            <p className="py-10 text-center text-sm text-base-content/60">
              No delivery status data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  outerRadius="65%"
                  paddingAngle={2}
                  label={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent parcels table */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm sm:rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 p-3 sm:gap-3 sm:p-5 lg:p-6">
          <div>
            <h3 className="text-base font-bold sm:text-xl">Recent Parcels</h3>

            <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
              Latest 5 parcels in your system
            </p>
          </div>

          <span className="badge badge-outline badge-sm sm:badge-md">
            {recentParcels.length} parcels
          </span>
        </div>

        {recentParcels.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-base-content/60 sm:px-6">
            No parcels found.
          </p>
        ) : (
          <div className="w-full min-w-0 overflow-x-auto">
            <table className="table table-sm w-full sm:table-md">
              <thead>
                <tr>
                  {/* Hide tracking ID on mobile */}
                  <th className="hidden sm:table-cell">Tracking ID</th>
                  <th>Sender</th>
                  <th className="hidden md:table-cell">Receiver</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>Delivery Status</th>
                  <th className="hidden lg:table-cell">Created Date</th>
                </tr>
              </thead>

              <tbody>
                {recentParcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td className="hidden max-w-[125px] break-all text-xs font-medium sm:table-cell sm:text-sm">
                      {parcel.trackingId || "N/A"}
                    </td>

                    <td className="max-w-[120px] break-words text-xs sm:text-sm">
                      {parcel.sender?.name || "N/A"}
                    </td>

                    <td className="hidden max-w-[120px] break-words text-xs md:table-cell sm:text-sm">
                      {parcel.receiver?.name || "N/A"}
                    </td>

                    <td className="whitespace-nowrap text-xs sm:text-sm">
                      ৳{(parcel.deliveryCost ?? 0).toLocaleString("en-US")}
                    </td>

                    <td>
                      <span
                        className={`badge badge-xs whitespace-nowrap sm:badge-sm ${
                          parcel.payment_status === "paid"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {parcel.payment_status || "unpaid"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`inline-flex whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-semibold sm:px-3 sm:text-xs ${getStatusClass(
                          parcel.delivery_status,
                        )}`}
                      >
                        {formatStatus(parcel.delivery_status)}
                      </span>
                    </td>

                    <td className="hidden whitespace-nowrap lg:table-cell">
                      {parcel.createdAt
                        ? new Date(parcel.createdAt).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent payments table */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-sm sm:rounded-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 p-3 sm:gap-3 sm:p-5 lg:p-6">
          <div>
            <h3 className="text-base font-bold sm:text-xl">Recent Payments</h3>

            <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
              Latest 5 successful transactions
            </p>
          </div>

          <span className="badge badge-outline badge-sm sm:badge-md">
            {recentPayments.length} payments
          </span>
        </div>

        {recentPayments.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-base-content/60 sm:px-6">
            No successful payments found.
          </p>
        ) : (
          <div className="w-full min-w-0 overflow-x-auto">
            <table className="table table-xs w-full sm:table-sm lg:table-md">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="hidden sm:table-cell">User Email</th>
                  <th>Payment Date</th>
                  <th className="hidden lg:table-cell">Parcel ID</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="max-w-[100px] break-all text-[11px] font-medium sm:max-w-[160px] sm:text-xs lg:text-sm">
                      {payment.transactionId || "N/A"}
                    </td>

                    <td className="whitespace-nowrap text-xs font-semibold sm:text-sm">
                      ৳{(payment.amount ?? 0).toLocaleString("en-US")}
                    </td>

                    <td>
                      <span className="badge badge-success badge-xs whitespace-nowrap">
                        {payment.payment_status || "paid"}
                      </span>
                    </td>

                    <td className="hidden max-w-[180px] break-words text-xs sm:table-cell sm:text-sm">
                      {payment.userEmail || "N/A"}
                    </td>

                    <td className="whitespace-nowrap text-[11px] sm:text-xs lg:text-sm">
                      {payment.paid_at
                        ? new Date(payment.paid_at).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>

                    <td className="hidden max-w-[130px] break-all text-xs lg:table-cell">
                      {payment.parcelId || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

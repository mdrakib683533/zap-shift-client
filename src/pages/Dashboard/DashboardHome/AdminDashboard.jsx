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

  // Show loading component while requests are running
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
      <p className="text-error">
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

  // Format monthly labels: 2026-10 -> Oct 2026
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

  // Format delivery status for the parcel table
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
    <div className="space-y-8 ml-2 my-2">
      {/* Dashboard heading */}
      <h2 className="text-3xl font-bold md:text-4xl">Admin Dashboard</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm font-medium text-base-content/60">
              {card.title}
            </p>

            <h3 className="mt-3 text-3xl font-bold text-primary">
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Dashboard charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Monthly deliveries chart */}
        <div className="min-w-0 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm md:p-6">
          <h3 className="mb-6 text-xl font-bold">Monthly Deliveries</h3>

          {formattedMonthlyStats.length === 0 ? (
            <p className="py-10 text-center text-base-content/60">
              No monthly delivery data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={formattedMonthlyStats}
                margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="deliveries"
                  name="Deliveries"
                  fill="#00BF83"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Delivery status chart */}
        <div className="min-w-0 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm md:p-6">
          <h3 className="mb-6 text-xl font-bold">Delivery Status</h3>

          {chartData.length === 0 ? (
            <p className="py-10 text-center text-base-content/60">
              No delivery status data available.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent parcels table */}
      <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 md:p-6">
          <div>
            <h3 className="text-xl font-bold">Recent Parcels</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Latest 5 parcels in your system
            </p>
          </div>

          <span className="badge badge-outline">
            {recentParcels.length} parcels
          </span>
        </div>

        {recentParcels.length === 0 ? (
          <p className="px-6 py-10 text-center text-base-content/60">
            No parcels found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Cost</th>
                  <th>Payment</th>
                  <th>Delivery Status</th>
                  <th>Created Date</th>
                </tr>
              </thead>

              <tbody>
                {recentParcels.map((parcel) => (
                  <tr key={parcel._id}>
                    <td className="font-medium">
                      {parcel.trackingId || "N/A"}
                    </td>

                    <td>{parcel.sender?.name || "N/A"}</td>

                    <td>{parcel.receiver?.name || "N/A"}</td>

                    <td>
                      ৳{(parcel.deliveryCost ?? 0).toLocaleString("en-US")}
                    </td>

                    <td>
                      <span
                        className={`badge ${
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
                        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          parcel.delivery_status,
                        )}`}
                      >
                        {formatStatus(parcel.delivery_status)}
                      </span>
                    </td>

                    <td className="whitespace-nowrap">
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
      <div className="rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 md:p-6">
          <div>
            <h3 className="text-xl font-bold">Recent Payments</h3>
            <p className="mt-1 text-sm text-base-content/60">
              Latest 5 successful transactions
            </p>
          </div>

          <span className="badge badge-outline">
            {recentPayments.length} payments
          </span>
        </div>

        {recentPayments.length === 0 ? (
          <p className="px-6 py-10 text-center text-base-content/60">
            No successful payments found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>User Email</th>
                  <th>Parcel ID</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="font-medium">
                      {payment.transactionId || "N/A"}
                    </td>

                    <td>{payment.userEmail || "N/A"}</td>

                    <td>{payment.parcelId || "N/A"}</td>

                    <td className="font-semibold">
                      ৳{(payment.amount ?? 0).toLocaleString("en-US")}
                    </td>

                    <td className="whitespace-nowrap">
                      {payment.paid_at
                        ? new Date(payment.paid_at).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>

                    <td>
                      <span className="badge badge-success">
                        {payment.payment_status || "paid"}
                      </span>
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

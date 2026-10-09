import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get completed deliveries
  const {
    data: completedData = {
      totalDeliveries: 0,
      totalEarnings: 0,
      deliveries: [],
    },
    isPending,
    isError,
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

  // Get cash out history
  const { data: cashouts = [] } = useQuery({
    queryKey: ["cashouts", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get("/cashouts");
      return res.data;
    },

    enabled: !!user?.email,
  });

  // Create cash out request
  const cashoutMutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.post("/cashouts", {
        parcelId,
      });

      return res.data;
    },

    onSuccess: (data) => {
      // Refresh cash out history and completed deliveries
      queryClient.invalidateQueries({
        queryKey: ["cashouts", user?.email],
      });

      queryClient.invalidateQueries({
        queryKey: ["completed-deliveries", user?.email],
      });

      Swal.fire({
        icon: "success",
        title: "Cash Out Requested!",
        text: `Your request for ৳${data.earningAmount} has been submitted.`,
        confirmButtonText: "OK",
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Cash Out Failed",
        text:
          error.response?.data?.message || "Failed to submit cash out request.",
      });
    },
  });

  // Handle cash out
  const handleCashout = (delivery) => {
    Swal.fire({
      title: "Request Cash Out?",
      text: `Do you want to request ৳${delivery.riderEarning} for this delivery?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Request",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        cashoutMutation.mutate(delivery._id);
      }
    });
  };

  const { totalDeliveries, totalEarnings, deliveries } = completedData;

  // Loading
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="font-semibold text-error">
          Failed to load completed deliveries.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Completed Deliveries</h2>

        <p className="mt-2 text-gray-500">
          View your completed delivery history and earnings.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-base-100 rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Total Deliveries</p>
          <h3 className="text-3xl font-bold mt-2">{totalDeliveries}</h3>
        </div>

        <div className="bg-base-100 rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h3 className="text-3xl font-bold mt-2">৳{totalEarnings}</h3>
        </div>
      </div>

      {/* Completed Delivery Count */}
      <div className="mb-5">
        <span className="badge badge-success badge-lg">
          {totalDeliveries} Completed Deliveries
        </span>
      </div>

      {/* Completed Deliveries Table */}
      {deliveries.length > 0 ? (
        <div className="w-full bg-base-100 rounded-xl shadow overflow-hidden">
          <table className="table table-fixed w-full text-sm">
            <thead>
              <tr>
                <th className="w-[4%]">#</th>
                <th className="w-[11%]">Tracking ID</th>
                <th className="w-[9%]">Parcel</th>
                <th className="w-[11%]">Sender</th>
                <th className="w-[11%]">Receiver</th>
                <th className="w-[12%]">Pickup</th>
                <th className="w-[10%]">Delivered</th>
                <th className="w-[7%]">Fee</th>
                <th className="w-[8%]">Earning</th>
                <th className="w-[8%]">Status</th>
                <th className="w-[12%]">Cash Out</th>
              </tr>
            </thead>

            <tbody>
              {deliveries.map((delivery, index) => {
                // Find cash out request for this delivery
                const cashout = cashouts.find(
                  (item) => item.parcelId === delivery._id,
                );

                return (
                  <tr key={delivery._id} className="hover">
                    <td>{index + 1}</td>

                    <td className="break-all text-xs">{delivery.trackingId}</td>

                    <td className="break-words">
                      <p className="font-medium">{delivery.parcelName}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {delivery.parcelType}
                      </p>
                    </td>

                    <td className="break-words">
                      <p className="font-medium">{delivery.sender?.name}</p>
                      <p className="text-xs text-gray-500 break-all">
                        {delivery.sender?.contact}
                      </p>
                    </td>

                    <td className="break-words">
                      <p className="font-medium">{delivery.receiver?.name}</p>
                      <p className="text-xs text-gray-500 break-all">
                        {delivery.receiver?.contact}
                      </p>
                    </td>

                    <td className="break-words text-xs">
                      {delivery.pickedUpAt
                        ? new Date(delivery.pickedUpAt).toLocaleString(
                            "en-BD",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          )
                        : "N/A"}
                    </td>

                    <td className="break-words text-xs">
                      {delivery.deliveredAt
                        ? new Date(delivery.deliveredAt).toLocaleString(
                            "en-BD",
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          )
                        : "N/A"}
                    </td>

                    <td>৳{delivery.deliveryFee}</td>

                    <td>
                      <p className="font-semibold">৳{delivery.riderEarning}</p>
                      <p className="text-xs text-gray-500">
                        {delivery.earningRate}%
                      </p>
                    </td>

                    <td>
                      <span className="badge badge-success badge-sm whitespace-normal">
                        {delivery.delivery_status === "service_center_delivered"
                          ? "Service Center"
                          : "Delivered"}
                      </span>
                    </td>

                    {/* Cash Out Action */}
                    <td>
                      {cashout ? (
                        <span
                          className={`badge badge-sm whitespace-normal ${
                            cashout.status === "paid"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {cashout.status === "paid" ? "Paid" : "Requested"}
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={cashoutMutation.isPending}
                          onClick={() => handleCashout(delivery)}
                          className="btn btn-xs w-full bg-[#CAEB66] hover:bg-[#9FC83F] border-0 text-black"
                        >
                          Cash Out
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center">
          <h3 className="text-lg font-semibold">No Completed Deliveries</h3>
          <p className="mt-2 text-sm text-gray-500">
            You have not completed any deliveries yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;

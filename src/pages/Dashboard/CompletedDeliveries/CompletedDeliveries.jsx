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
      const res = await axiosSecure.post("/cashouts", { parcelId });
      return res.data;
    },

    onSuccess: (data) => {
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
    <div className="w-full min-w-0 max-w-full overflow-x-hidden p-3 sm:p-4 lg:p-4">
      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Completed Deliveries</h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          View your completed delivery history and earnings.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-base-100 p-4 shadow sm:p-5">
          <p className="text-sm text-gray-500">Total Deliveries</p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            {totalDeliveries}
          </h3>
        </div>

        <div className="rounded-xl bg-base-100 p-4 shadow sm:p-5">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
            ৳{totalEarnings}
          </h3>
        </div>
      </div>

      {/* Completed Delivery Count */}
      <div className="mb-5">
        <span className="badge badge-success badge-lg whitespace-normal">
          {totalDeliveries} Completed Deliveries
        </span>
      </div>

      {/* Completed Deliveries Table */}
      {deliveries.length > 0 ? (
        <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-base-100 shadow">
          <table className="table w-full min-w-[360px] table-fixed text-xs sm:min-w-0 sm:text-sm">
            <thead>
              <tr>
                {/* Desktop only */}
                <th className="hidden lg:table-cell lg:w-[4%]">#</th>

                {/* Tracking ID: tablet and desktop */}
                <th className="hidden sm:table-cell sm:w-[20%] lg:w-[11%]">
                  Tracking ID
                </th>

                {/* All devices */}
                <th className="w-[30%] sm:w-[24%] lg:w-[9%]">Parcel</th>

                {/* Desktop only */}
                <th className="hidden lg:table-cell lg:w-[11%]">Sender</th>
                <th className="hidden lg:table-cell lg:w-[11%]">Receiver</th>
                <th className="hidden lg:table-cell lg:w-[12%]">Pickup</th>
                <th className="hidden lg:table-cell lg:w-[10%]">Delivered</th>
                <th className="hidden lg:table-cell lg:w-[7%]">Fee</th>

                {/* All devices */}
                <th className="w-[23%] sm:w-[20%] lg:w-[8%]">Earning</th>
                <th className="w-[22%] sm:w-[18%] lg:w-[8%]">Status</th>
                <th className="w-[25%] sm:w-[18%] lg:w-[12%]">Cash Out</th>
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
                    {/* Serial number: desktop only */}
                    <td className="hidden lg:table-cell">{index + 1}</td>

                    {/* Tracking ID: tablet and desktop */}
                    <td className="hidden break-all text-xs sm:table-cell">
                      {delivery.trackingId}
                    </td>

                    {/* Parcel */}
                    <td className="break-words">
                      <p className="font-medium">{delivery.parcelName}</p>
                      <p className="hidden text-xs capitalize text-gray-500 sm:block">
                        {delivery.parcelType}
                      </p>
                    </td>

                    {/* Sender: desktop only */}
                    <td className="hidden break-words lg:table-cell">
                      <p className="font-medium">{delivery.sender?.name}</p>
                      <p className="break-all text-xs text-gray-500">
                        {delivery.sender?.contact}
                      </p>
                    </td>

                    {/* Receiver: desktop only */}
                    <td className="hidden break-words lg:table-cell">
                      <p className="font-medium">{delivery.receiver?.name}</p>
                      <p className="break-all text-xs text-gray-500">
                        {delivery.receiver?.contact}
                      </p>
                    </td>

                    {/* Pickup: desktop only */}
                    <td className="hidden break-words text-xs lg:table-cell">
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

                    {/* Delivered: desktop only */}
                    <td className="hidden break-words text-xs lg:table-cell">
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

                    {/* Fee: desktop only */}
                    <td className="hidden whitespace-nowrap lg:table-cell">
                      ৳{delivery.deliveryFee}
                    </td>

                    {/* Earning */}
                    <td className="break-words">
                      <p className="font-semibold">৳{delivery.riderEarning}</p>
                      <p className="hidden text-xs text-gray-500 lg:block">
                        {delivery.earningRate}%
                      </p>
                    </td>

                    {/* Status */}
                    <td className="break-words">
                      <span className="badge badge-success badge-xs whitespace-normal sm:badge-sm">
                        {delivery.delivery_status === "service_center_delivered"
                          ? "Service Center"
                          : "Delivered"}
                      </span>
                    </td>

                    {/* Cash Out Action */}
                    <td className="min-w-0">
                      {cashout ? (
                        <span
                          className={`badge badge-xs whitespace-normal sm:badge-sm ${
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
                          className="btn btn-xs min-h-8 w-full min-w-0 whitespace-nowrap border-0 bg-[#CAEB66] px-1 text-[10px] text-black hover:bg-[#9FC83F] sm:px-2 sm:text-xs"
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

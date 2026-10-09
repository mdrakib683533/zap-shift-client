import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageCashouts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get all cash out requests
  const {
    data: cashouts = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["admin-cashouts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/cashouts");
      return res.data;
    },
  });

  // Update cash out status to paid
  const payMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/admin/cashouts/${id}/pay`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-cashouts"] });
      queryClient.invalidateQueries({ queryKey: ["cashouts"] });
      queryClient.invalidateQueries({ queryKey: ["cashout-summary"] });

      Swal.fire({
        icon: "success",
        title: "Payment Completed",
        text: "Cash out request has been marked as paid.",
      });
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          error.response?.data?.message || "Failed to update cash out status.",
      });
    },
  });

  // Confirm before marking as paid
  const handleMarkAsPaid = (cashout) => {
    Swal.fire({
      title: "Confirm Payment?",
      text: `Pay ৳${cashout.earningAmount} to ${
        cashout.riderName || cashout.riderEmail
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark as Paid",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        payMutation.mutate(cashout._id);
      }
    });
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="font-semibold text-error">
          Failed to load cash out requests.
        </p>
      </div>
    );
  }

  // Calculate pending amount
  const pendingAmount = cashouts
    .filter((cashout) => cashout.status === "requested")
    .reduce((total, cashout) => total + Number(cashout.earningAmount || 0), 0);

  // Calculate total paid amount
  const paidAmount = cashouts
    .filter((cashout) => cashout.status === "paid")
    .reduce((total, cashout) => total + Number(cashout.earningAmount || 0), 0);

  return (
    <div className="w-full min-w-0 overflow-x-hidden p-3 sm:p-4 lg:p-6">
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">Cash Out Management</h2>
        <p className="mt-2 text-sm text-gray-500">
          Review rider payment requests and update payment status.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0 rounded-xl bg-base-100 p-4 shadow sm:p-5">
          <p className="text-sm text-gray-500">Pending Requests</p>
          <h3 className="mt-2 break-words text-2xl font-bold text-warning">
            ৳{pendingAmount.toLocaleString("en-BD")}
          </h3>
        </div>

        <div className="min-w-0 rounded-xl bg-base-100 p-4 shadow sm:p-5">
          <p className="text-sm text-gray-500">Total Paid</p>
          <h3 className="mt-2 break-words text-2xl font-bold text-success">
            ৳{paidAmount.toLocaleString("en-BD")}
          </h3>
        </div>
      </div>

      {/* Cash out requests */}
      <h3 className="mb-4 text-xl font-bold sm:text-2xl">
        All Cash Out Requests
      </h3>

      {cashouts.length === 0 ? (
        <div className="rounded-xl bg-base-100 px-4 py-12 text-center shadow">
          <h4 className="text-lg font-semibold">No Cash Out Requests</h4>
          <p className="mt-2 text-sm text-gray-500">
            Rider payment requests will appear here.
          </p>
        </div>
      ) : (
        <div className="w-full min-w-0 overflow-hidden rounded-xl bg-base-100 shadow">
          <table className="table table-fixed w-full text-xs sm:text-sm">
            <colgroup>
              <col className="w-[6%]" />
              <col className="w-[17%]" />
              <col className="w-[13%]" />
              <col className="w-[12%]" />
              <col className="w-[14%]" />
              <col className="w-[12%]" />
              <col className="w-[9%]" />
              <col className="w-[10%]" />
            </colgroup>

            <thead>
              <tr>
                <th className="whitespace-normal px-2">#</th>
                <th className="whitespace-normal px-1">Rider</th>
                <th className="whitespace-normal px-1">Tracking ID</th>
                <th className="whitespace-normal px-1 pl-4">Amount</th>
                <th className="whitespace-normal px-1">Requested At</th>
                <th className="whitespace-normal px-1 pl-6">Paid At</th>
                <th className="whitespace-normal px-1">Status</th>
                <th className="whitespace-normal px-1">Action</th>
              </tr>
            </thead>

            <tbody>
              {cashouts.map((cashout, index) => (
                <tr key={cashout._id}>
                  <td className="break-words px-1">{index + 1}</td>

                  <td className="break-words px-1">
                    <p className="font-semibold">
                      {cashout.riderName || "N/A"}
                    </p>
                    <p className="mt-1 break-all text-[10px] text-gray-500 sm:text-xs">
                      {cashout.riderEmail}
                    </p>
                  </td>

                  <td className="break-all px-1 text-[10px] sm:text-xs">
                    {cashout.trackingId}
                  </td>

                  <td className="break-words px-1 font-semibold pl-6">
                    ৳
                    {Number(cashout.earningAmount || 0).toLocaleString("en-BD")}
                  </td>

                  <td className="break-words px-1 text-[10px] sm:text-xs">
                    {formatDate(cashout.requestedAt)}
                  </td>

                  <td className="break-words px-1 pl-8 text-[10px] sm:text-xs">
                    {formatDate(cashout.paidAt)}
                  </td>

                  <td className="px-1">
                    <span
                      className={`badge badge-sm whitespace-normal ${
                        cashout.status === "paid"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {cashout.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>

                  <td className="px-1">
                    {cashout.status === "requested" ? (
                      <button
                        onClick={() => handleMarkAsPaid(cashout)}
                        disabled={payMutation.isPending}
                        className="btn btn-xs h-auto min-h-8 w-full whitespace-normal bg-[#00BF83] px-1 py-2 text-white hover:bg-[#00a873] disabled:opacity-60 sm:btn-sm sm:px-2"
                      >
                        {payMutation.isPending ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Mark as Paid"
                        )}
                      </button>
                    ) : (
                      <span className="flex flex-wrap items-center gap-1 font-semibold text-success">
                        <span>✓</span>
                        <span>Paid</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCashouts;

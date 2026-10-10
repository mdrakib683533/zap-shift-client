import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#00BF83]"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4 p-3 sm:p-5 lg:p-6">
      {/* Page heading */}
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Payment History</h1>

        <p className="mt-1 text-sm text-base-content/60">
          View your previous parcel payments.
        </p>
      </div>

      {/* Responsive payment table */}
      <div className="w-full min-w-0 overflow-x-auto rounded-2xl bg-base-100 shadow-sm">
        <table className="table w-full">
          <thead>
            <tr>
              {/* Tablet and desktop */}
              <th className="hidden sm:table-cell">#</th>

              {/* All devices */}
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Status</th>

              {/* Desktop only */}
              <th className="hidden lg:table-cell">Transaction ID</th>

              <th className="hidden lg:table-cell">Paid At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                {/* Serial number */}
                <th className="hidden sm:table-cell">{index + 1}</th>

                {/* Parcel ID */}
                <td className="max-w-[110px] sm:max-w-none">
                  <span className="break-all font-medium text-xs sm:text-sm">
                    {payment.parcelId}
                  </span>
                </td>

                {/* Amount */}
                <td className="whitespace-nowrap">
                  <span className="font-semibold">৳{payment.amount}</span>
                </td>

                {/* Payment status */}
                <td>
                  <span className="badge badge-success badge-sm">
                    {payment.payment_status}
                  </span>
                </td>

                {/* Transaction ID: desktop only */}
                <td className="hidden lg:table-cell">
                  <span className="break-all font-mono text-xs">
                    {payment.transactionId}
                  </span>
                </td>

                {/* Payment date: desktop only */}
                <td className="hidden whitespace-nowrap lg:table-cell">
                  {new Date(payment.paid_at).toLocaleString()}
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {payments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center">
                  <p className="font-semibold">No payment history found.</p>

                  <p className="mt-1 text-sm text-base-content/60">
                    Your completed payments will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;

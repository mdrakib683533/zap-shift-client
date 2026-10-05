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
    return "loading...";
  }
  return (
    <div className="w-full overflow-x-auto bg-base-100 rounded-2xl shadow-sm">
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Amount</th>
            <th>Transaction ID</th>
            <th>Status</th>
            <th>Paid At</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment._id}>
              <th>{index + 1}</th>

              <td className="whitespace-nowrap">
                <span className="font-medium">{payment.parcelId}</span>
              </td>

              <td className="whitespace-nowrap">
                <span className="font-semibold">৳{payment.amount}</span>
              </td>

              <td>
                <span className="text-xs font-mono break-all">
                  {payment.transactionId}
                </span>
              </td>

              <td>
                <span className="badge badge-success badge-sm">
                  {payment.payment_status}
                </span>
              </td>

              <td className="whitespace-nowrap">
                {new Date(payment.paid_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;

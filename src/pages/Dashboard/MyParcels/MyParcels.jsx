
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels);

  const handleView = (id) => {
    console.log("View parcel ID:", id);
  };

  const handlePay = (id) => {
    console.log("Pay parcel ID:", id);

    navigate(`/dashboard/payment/${id}`)
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this parcel!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);

          console.log(res.data);

          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Parcel has been deleted successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });

            refetch();
          }
        } catch (error) {
          console.error(error);

          Swal.fire({
            title: "Error!",
            text: "Failed to delete the parcel.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              {/* Serial */}
              <th>{index + 1}</th>

              {/* Parcel */}
              <td>
                <p className="font-semibold">{parcel.parcelName}</p>
                <p className="text-xs text-gray-500">
                  {parcel.trackingId}
                </p>
              </td>

              {/* Type */}
              <td className="capitalize">{parcel.parcelType}</td>

              {/* Date + Time */}
              <td>
                {new Date(parcel.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </td>

              {/* Cost */}
              <td className="font-semibold">
                {parcel.deliveryCost} TK
              </td>

              {/* Payment */}
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {parcel.payment_status}
                </span>
              </td>

              {/* Actions */}
              <td>
                <div className="flex gap-2">
                  {/* View */}
                  <button
                    onClick={() => handleView(parcel._id)}
                    className="btn btn-sm btn-info btn-outline"
                    title="View Details"
                  >
                    View
                  </button>

                  {/* Pay */}
                  {parcel.payment_status === "unpaid" && (
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-sm bg-[#00BF83] hover:bg-[#009B6B] text-white"
                      title="Pay Now"
                    >
                      Pay
                    </button>
                  )}

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error btn-outline"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;

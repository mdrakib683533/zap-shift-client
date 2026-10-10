import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { FaEye, FaCheck, FaTrash } from "react-icons/fa";

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
    navigate(`/dashboard/payment/${id}`);
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
    <div className="w-full min-w-0 space-y-4 p-3 sm:p-5 lg:p-6">
      {/* Page heading */}
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">My Parcels</h1>
        <p className="mt-1 text-sm text-base-content/60">
          Manage and track all your parcels in one place.
        </p>
      </div>

      {/* Table: original structure preserved */}
      <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-base-100 shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="hidden lg:table-cell">#</th>
              <th>Parcel</th>
              <th className="hidden sm:table-cell">Type</th>
              <th className="hidden lg:table-cell">Created At</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th className="hidden lg:table-cell">{index + 1}</th>

                <td className="min-w-[100px]">
                  <p className="font-semibold">{parcel.parcelName}</p>
                  <p className="break-all font-mono text-xs text-base-content/60">
                    {parcel.trackingId}
                  </p>
                </td>

                <td className="hidden capitalize sm:table-cell">
                  {parcel.parcelType}
                </td>

                <td className="hidden whitespace-nowrap lg:table-cell">
                  {new Date(parcel.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>

                <td className="whitespace-nowrap font-semibold">
                  {parcel.deliveryCost} TK
                </td>

                <td>
                  <span
                    className={`badge badge-sm ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>

                {/* Mobile and tablet: icons only; desktop: icons + text */}
                <td>
                  <div className="flex items-center gap-1 lg:gap-2">
                    <button
                      onClick={() => handleView(parcel._id)}
                      className="btn btn-square btn-xs btn-info btn-outline lg:btn-sm lg:w-auto lg:px-3"
                      title="View Details"
                      aria-label="View parcel details"
                    >
                      <FaEye />
                      <span className="hidden lg:inline">View</span>
                    </button>

                    {parcel.payment_status === "unpaid" && (
                      <button
                        onClick={() => handlePay(parcel._id)}
                        className="btn btn-square btn-xs border-0 bg-[#00BF83] text-white hover:bg-[#009B6B] lg:btn-sm lg:w-auto lg:px-3"
                        title="Pay Now"
                        aria-label="Pay for parcel"
                      >
                        <FaCheck />
                        <span className="hidden lg:inline">Pay</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-square btn-xs btn-error btn-outline lg:btn-sm lg:w-auto lg:px-3"
                      title="Delete"
                      aria-label="Delete parcel"
                    >
                      <FaTrash />
                      <span className="hidden lg:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;

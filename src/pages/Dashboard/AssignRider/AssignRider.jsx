import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { LuUserCheck } from "react-icons/lu";
import Swal from "sweetalert2";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Selected parcel for rider assignment
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Load all parcels
  const {
    data: parcels = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["assignRiderParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  // Load riders based on selected parcel's district and region
  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: [
      "riders",
      selectedParcel?.sender?.region,
      selectedParcel?.sender?.district,
    ],
    queryFn: async () => {
      const region = selectedParcel.sender.region;
      const district = selectedParcel.sender.district;

      const res = await axiosSecure.get(
        `/riders?region=${encodeURIComponent(
          region,
        )}&district=${encodeURIComponent(district)}`,
      );

      return res.data;
    },
    // Only fetch riders when a parcel is selected
    enabled:
      !!selectedParcel?.sender?.region && !!selectedParcel?.sender?.district,
  });

  // Only paid and not collected parcels
  const assignableParcels = parcels.filter(
    (parcel) =>
      parcel.payment_status === "paid" &&
      parcel.delivery_status === "not_collected",
  );

  // Loading parcels
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Parcel loading error
  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="font-semibold text-error">Failed to load parcels.</p>
      </div>
    );
  }

  return (
    <div className="ml-2 mt-2 min-w-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Assign Rider</h1>

        <p className="mt-2 text-gray-500">
          View paid parcels that are waiting to be collected and assign them to
          riders.
        </p>
      </div>

      {/* Parcel Count */}
      <div className="mb-5">
        <span className="badge badge-primary badge-lg">
          {assignableParcels.length} Parcels Waiting
        </span>
      </div>

      {/* Parcel Table */}
      {assignableParcels.length > 0 ? (
        <div className="w-full min-w-0 overflow-x-auto">
          <table className="table table-sm w-full sm:table-md">
            <thead>
              <tr>
                <th>#</th>

                {/* Hidden on mobile */}
                <th className="hidden lg:table-cell">Tracking ID</th>

                <th>Parcel Name</th>

                {/* Visible from small devices */}
                <th className="hidden sm:table-cell">Type</th>

                {/* Visible from medium devices */}
                <th className="hidden md:table-cell">Sender</th>

                {/* Visible on large devices */}
                <th className="hidden lg:table-cell">Receiver</th>

                <th>Delivery Cost</th>

                {/* Visible from medium devices */}
                <th className="hidden whitespace-nowrap md:table-cell">
                  Created At
                </th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assignableParcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover">
                  {/* Serial */}
                  <td className="whitespace-nowrap">{index + 1}</td>

                  {/* Tracking ID: large devices only */}
                  <td className="hidden lg:table-cell">
                    <span className="font-medium">
                      {parcel.trackingId || "N/A"}
                    </span>
                  </td>

                  {/* Parcel Name */}
                  <td className="max-w-[100px] break-words sm:max-w-none">
                    <span className="font-medium">
                      {parcel.parcelName || "N/A"}
                    </span>
                  </td>

                  {/* Parcel Type */}
                  <td className="hidden sm:table-cell">
                    <span className="capitalize">
                      {parcel.parcelType || "N/A"}
                    </span>
                  </td>

                  {/* Sender */}
                  <td className="hidden md:table-cell">
                    <span className="font-medium">
                      {parcel.sender?.name || "N/A"}
                    </span>
                  </td>

                  {/* Receiver */}
                  <td className="hidden lg:table-cell">
                    <span className="font-medium">
                      {parcel.receiver?.name || "N/A"}
                    </span>
                  </td>

                  {/* Delivery Cost */}
                  <td className="whitespace-nowrap">
                    <span className="font-semibold">
                      ৳{parcel.deliveryCost ?? 0}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="hidden whitespace-nowrap md:table-cell">
                    <span className="text-sm text-gray-500">
                      {parcel.createdAt
                        ? new Date(parcel.createdAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedParcel(parcel)}
                      className="btn btn-sm gap-2 border-0 bg-[#CAEB66] font-semibold text-black hover:bg-[#9FC83F] sm:btn-md"
                    >
                      <LuUserCheck size={18} />
                      <span>Assign Rider</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-10 text-center">
          <h3 className="text-lg font-semibold">No Parcels Available</h3>

          <p className="mt-2 text-sm text-gray-500">
            There are currently no paid parcels waiting to be collected.
          </p>
        </div>
      )}

      {/* Assign Rider Modal */}
      {selectedParcel && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg">
            {/* Modal Title */}
            <h3 className="text-xl font-bold">Assign Rider</h3>

            <p className="mt-2 text-gray-500">
              Select a rider for this parcel.
            </p>

            {/* Parcel Information */}
            <div className="mt-5 space-y-2">
              <p>
                <span className="font-semibold">Parcel:</span>{" "}
                {selectedParcel.parcelName}
              </p>

              <p>
                <span className="font-semibold">Tracking ID:</span>{" "}
                {selectedParcel.trackingId}
              </p>

              <p>
                <span className="font-semibold">Pickup Location:</span>{" "}
                {selectedParcel.sender?.district},{" "}
                {selectedParcel.sender?.region}
              </p>
            </div>

            {/* Rider List */}
            <div className="mt-5">
              {ridersLoading ? (
                <div className="flex justify-center py-5">
                  <span className="loading loading-spinner"></span>
                </div>
              ) : riders.length > 0 ? (
                <div className="space-y-3">
                  {riders.map((rider) => (
                    <div
                      key={rider._id}
                      className="flex items-center justify-between gap-3 rounded-lg border p-3"
                    >
                      {/* Rider Information */}
                      <div className="min-w-0">
                        <p className="font-semibold">
                          {rider.name || "No Name"}
                        </p>

                        <p className="break-all text-sm text-gray-500">
                          {rider.email}
                        </p>

                        <p className="text-sm text-gray-500">
                          District: {rider.district}
                        </p>
                      </div>

                      {/* Select Button */}
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            const res = await axiosSecure.patch(
                              `/parcels/${selectedParcel._id}/assign-rider`,
                              {
                                rider,
                              },
                            );

                            console.log(res.data);

                            await Swal.fire({
                              icon: "success",
                              title: "Rider Assigned!",
                              text: `${rider.name} has been assigned to this parcel.`,
                              confirmButtonText: "OK",
                            });

                            queryClient.invalidateQueries({
                              queryKey: ["assignRiderParcels"],
                            });

                            setSelectedParcel(null);
                          } catch (error) {
                            console.error("Failed to assign rider:", error);

                            Swal.fire({
                              icon: "error",
                              title: "Assignment Failed",
                              text: "Failed to assign rider. Please try again.",
                            });
                          }
                        }}
                        className="btn btn-sm shrink-0 border-0 bg-[#CAEB66] text-black hover:bg-[#9FC83F]"
                      >
                        Select
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-5 text-center text-gray-500">
                  No riders available in this district.
                </p>
              )}
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;

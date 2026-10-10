import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PendingRiders = () => {
  const [selectedRider, setSelectedRider] = useState(null);

  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  if (isPending) {
    return <p className="p-4">Loading...</p>;
  }

  // Approve rider
  const handleApprove = (id) => {
    Swal.fire({
      title: "Approve Rider?",
      text: "Are you sure you want to approve this rider?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/riders/${id}/status`, {
            status: "active",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();

              Swal.fire({
                icon: "success",
                title: "Approved!",
                text: "Rider application approved successfully.",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Failed to approve rider application.",
            });
          });
      }
    });
  };

  // Cancel rider application
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Application?",
      text: "Are you sure you want to cancel this rider application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/riders/${id}/status`, {
            status: "cancelled",
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();

              Swal.fire({
                icon: "success",
                title: "Cancelled!",
                text: "Rider application cancelled successfully.",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Failed to cancel rider application.",
            });
          });
      }
    });
  };

  return (
    <div className="min-w-0 w-full overflow-x-hidden p-2 sm:p-4">
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Pending Riders</h2>

      <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-base-100 shadow">
        <table className="table table-sm w-full sm:table-md">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="hidden md:table-cell">Email</th>
              <th className="hidden lg:table-cell">Phone</th>
              <th className="hidden md:table-cell">District</th>
              <th className="hidden lg:table-cell">Applied At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>

                <td className="max-w-28 break-words font-semibold sm:max-w-none">
                  {rider.name}
                </td>

                <td className="hidden break-all md:table-cell">
                  {rider.email}
                </td>

                <td className="hidden lg:table-cell">{rider.phone}</td>

                <td className="hidden md:table-cell">{rider.district}</td>

                <td className="hidden lg:table-cell">
                  {rider.appliedAt
                    ? new Date(rider.appliedAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A"}
                </td>

                <td>
                  <span className="badge badge-warning badge-sm">
                    {rider.status}
                  </span>
                </td>

                <td>
                  <div className="flex flex-row items-center gap-1 sm:gap-2">
                    {/* View button: icon on mobile */}
                    <button
                      onClick={() => setSelectedRider(rider)}
                      className="btn btn-xs btn-info sm:btn-sm"
                      title="View rider"
                      aria-label="View rider"
                    >
                      <FaEye className="text-sm" />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    {/* Approve button: icon on mobile */}
                    <button
                      onClick={() => handleApprove(rider._id)}
                      className="btn btn-xs btn-success sm:btn-sm"
                      title="Approve rider"
                      aria-label="Approve rider"
                    >
                      <FaCheck className="text-sm" />
                      <span className="hidden sm:inline">Approve</span>
                    </button>

                    {/* Cancel button: icon on mobile */}
                    <button
                      onClick={() => handleCancel(rider._id)}
                      className="btn btn-xs btn-error sm:btn-sm"
                      title="Cancel application"
                      aria-label="Cancel application"
                    >
                      <FaTimes className="text-sm" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {riders.length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rider information modal */}
      {selectedRider && (
        <dialog open className="modal">
          <div className="modal-box max-h-[90vh] max-w-2xl overflow-y-auto">
            <h3 className="mb-5 text-2xl font-bold">Rider Information</h3>

            <div className="grid grid-cols-1 gap-4 break-words sm:grid-cols-2">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {selectedRider.name}
              </p>

              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedRider.email}
              </p>

              <p>
                <span className="font-semibold">Age:</span> {selectedRider.age}
              </p>

              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedRider.phone}
              </p>

              <p>
                <span className="font-semibold">Region:</span>{" "}
                {selectedRider.region}
              </p>

              <p>
                <span className="font-semibold">District:</span>{" "}
                {selectedRider.district}
              </p>

              <p>
                <span className="font-semibold">National ID:</span>{" "}
                {selectedRider.nid}
              </p>

              <p>
                <span className="font-semibold">Bike Brand:</span>{" "}
                {selectedRider.bikeBrand}
              </p>

              <p>
                <span className="font-semibold">Bike Registration:</span>{" "}
                {selectedRider.bikeRegistrationNumber}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedRider.status}
              </p>

              <p>
                <span className="font-semibold">Applied At:</span>{" "}
                {selectedRider.appliedAt
                  ? new Date(selectedRider.appliedAt).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "N/A"}
              </p>
            </div>

            <div className="mt-5 break-words">
              <p className="mb-2 font-semibold">Other Information:</p>

              <p className="rounded-lg bg-base-200 p-4">
                {selectedRider.additionalInfo || "No additional information"}
              </p>
            </div>

            <div className="modal-action">
              <button onClick={() => setSelectedRider(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;

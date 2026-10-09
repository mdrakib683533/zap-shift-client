import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
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
    <div className="p-4 w-full max-w-full overflow-x-hidden">
      <h2 className="text-3xl font-bold mb-6">Pending Riders</h2>

      <div className="w-full overflow-x-hidden bg-base-100 rounded-xl shadow">
        <table className="table w-full table-fixed">
          <thead>
            <tr>
              <th className="w-[5%]">#</th>
              <th className="w-[16%]">Name</th>
              <th className="w-[20%]">Email</th>
              <th className="w-[20%]">Phone</th>
              <th className="w-[13%]">District</th>
              <th className="w-[17%]">Applied At</th>
              <th className="w-[30%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <td>{index + 1}</td>

                <td className="break-words">{rider.name}</td>

                <td className="break-words">{rider.email}</td>

                <td className="break-words">{rider.phone}</td>

                <td className="break-words">{rider.district}</td>

                <td className="break-words">
                  {rider.appliedAt
                    ? new Date(rider.appliedAt).toLocaleString("en-BD", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A"}
                </td>

                <td>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRider(rider)}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </button>

                    <button
                      onClick={() => handleApprove(rider._id)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleCancel(rider._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {riders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-8">
                  No pending riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRider && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-2xl mb-5">Rider Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 break-words">
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
              <p className="font-semibold mb-2">Other Information:</p>

              <p className="bg-base-200 p-4 rounded-lg">
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

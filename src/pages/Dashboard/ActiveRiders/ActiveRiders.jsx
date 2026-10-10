import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ActiveRiders = () => {
  const [searchText, setSearchText] = useState("");

  const axiosSecure = useAxiosSecure();

  // Load all active riders from server
  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });

  // Show loading message
  if (isPending) {
    return <p className="p-4">Loading...</p>;
  }

  // Search rider by name or phone number
  const filteredRiders = riders.filter((rider) => {
    const search = searchText.toLowerCase();

    const riderName = rider.name?.toLowerCase() || "";
    const riderPhone = rider.phone?.toLowerCase() || "";

    return riderName.includes(search) || riderPhone.includes(search);
  });

  // Handle deactivate button
  const handleDeactivate = (id) => {
    // Show confirmation alert
    Swal.fire({
      title: "Deactivate Rider?",
      text: "Are you sure you want to deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Deactivate",
      cancelButtonText: "Cancel",
    }).then((result) => {
      // If admin confirms
      if (result.isConfirmed) {
        // Update rider status to inactive
        axiosSecure
          .patch(`/riders/${id}/status`, {
            status: "inactive",
          })
          .then((res) => {
            // Check if rider was successfully deactivated
            if (res.data.modifiedCount > 0) {
              // Reload active riders
              refetch();

              // Show success message
              Swal.fire({
                icon: "success",
                title: "Deactivated!",
                text: "Rider has been deactivated successfully.",
                confirmButtonText: "Okay",
              });
            }
          })
          .catch((error) => {
            console.error("Failed to deactivate rider:", error);

            // Show error message
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Failed to deactivate rider.",
            });
          });
      }
    });
  };

  return (
    <div className="min-w-0 p-2 sm:p-4">
      {/* Page title */}
      <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Active Riders</h2>

      {/* Search box */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by rider name or phone number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Riders table */}
      <div className="w-full min-w-0 overflow-x-auto rounded-xl bg-base-100 shadow">
        <table className="table table-sm w-full sm:table-md">
          {/* Table header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>

              {/* Visible from medium devices */}
              <th className="hidden md:table-cell">Email</th>

              {/* Visible on large devices */}
              <th className="hidden lg:table-cell">Phone</th>

              {/* Visible from medium devices */}
              <th className="hidden md:table-cell">District</th>

              {/* Visible on large devices */}
              <th className="hidden lg:table-cell">Bike</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                {/* Serial number */}
                <td className="whitespace-nowrap">{index + 1}</td>

                {/* Rider name */}
                <td className="max-w-[120px] break-words font-semibold sm:max-w-none">
                  {rider.name || "N/A"}
                </td>

                {/* Rider email */}
                <td className="hidden max-w-[180px] break-words md:table-cell">
                  {rider.email || "N/A"}
                </td>

                {/* Rider phone */}
                <td className="hidden whitespace-nowrap lg:table-cell">
                  {rider.phone || "N/A"}
                </td>

                {/* Rider district */}
                <td className="hidden md:table-cell">
                  {rider.district || "N/A"}
                </td>

                {/* Bike brand */}
                <td className="hidden lg:table-cell">
                  {rider.bikeBrand || "N/A"}
                </td>

                {/* Rider status */}
                <td>
                  <span className="badge badge-success badge-xs whitespace-nowrap sm:badge-sm">
                    {rider.status || "active"}
                  </span>
                </td>

                {/* Deactivate button */}
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-xs btn-error whitespace-nowrap sm:btn-sm"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}

            {/* Show message when no rider is found */}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center">
                  No active rider found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;

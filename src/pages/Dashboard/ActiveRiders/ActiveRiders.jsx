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
    <div className="p-4">
      {/* Page title */}
      <h2 className="text-3xl font-bold mb-6">Active Riders</h2>

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
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          {/* Table header */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {filteredRiders.map((rider, index) => (
              <tr key={rider._id}>
                {/* Serial number */}
                <td>{index + 1}</td>

                {/* Rider name */}
                <td className="font-semibold">{rider.name}</td>

                {/* Rider email */}
                <td>{rider.email}</td>

                {/* Rider phone */}
                <td>{rider.phone}</td>

                {/* Rider district */}
                <td>{rider.district}</td>

                {/* Bike brand */}
                <td>{rider.bikeBrand}</td>

                {/* Rider status */}
                <td>
                  <span className="badge badge-success">{rider.status}</span>
                </td>

                {/* Deactivate button */}
                <td>
                  <button
                    onClick={() => handleDeactivate(rider._id)}
                    className="btn btn-sm btn-error"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}

            {/* Show message when no rider is found */}
            {filteredRiders.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-8">
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

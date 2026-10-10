import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get rider tasks
  const {
    data: tasks = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["rider-tasks", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/tasks?email=${encodeURIComponent(user.email)}`,
      );

      return res.data;
    },

    enabled: !!user?.email,
  });

  // Update delivery status
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/rider/tasks/${id}/status`, {
        status,
      });

      return res.data;
    },

    onSuccess: (data, variables) => {
      // Refresh rider tasks
      queryClient.invalidateQueries({
        queryKey: ["rider-tasks", user?.email],
      });

      if (variables.status === "in_transit") {
        Swal.fire({
          icon: "success",
          title: "Parcel Picked Up!",
          text: "The parcel is now in transit.",
          confirmButtonText: "OK",
        });
      }

      if (variables.status === "delivered") {
        Swal.fire({
          icon: "success",
          title: "Parcel Delivered!",
          text: "The parcel has been successfully delivered.",
          confirmButtonText: "OK",
        });
      }
    },

    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Failed to update delivery status. Please try again.",
      });
    },
  });

  // Handle delivery action
  const handleStatusUpdate = (task) => {
    const nextStatus =
      task.delivery_status === "rider_assigned" ? "in_transit" : "delivered";

    const actionText =
      nextStatus === "in_transit"
        ? "pick up this parcel"
        : "mark this parcel as delivered";

    Swal.fire({
      title:
        nextStatus === "in_transit" ? "Pick Up Parcel?" : "Mark as Delivered?",

      text: `Are you sure you want to ${actionText}?`,

      icon: "question",

      showCancelButton: true,

      confirmButtonText:
        nextStatus === "in_transit" ? "Yes, Pick Up" : "Yes, Delivered",

      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({
          id: task._id,
          status: nextStatus,
        });
      }
    });
  };

  // Loading
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="font-semibold text-error">
          Failed to load delivery tasks.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">My Tasks</h2>

        <p className="mt-2 text-gray-500">
          View and manage your assigned delivery parcels.
        </p>
      </div>

      {/* Task Count */}
      <div className="mb-5">
        <span className="badge badge-primary badge-lg">
          {tasks.length} Pending Deliveries
        </span>
      </div>

      {/* Table */}
      {tasks.length > 0 ? (
        <div className="w-full bg-base-100 rounded-xl shadow overflow-x-auto">
          <table className="table table-fixed w-full min-w-[340px] sm:min-w-[600px] lg:min-w-0">
            <thead>
              <tr>
                <th className="hidden lg:table-cell w-[4%]">#</th>
                <th className="hidden sm:table-cell w-[13%]">Tracking ID</th>
                <th className="w-[25%] sm:w-[12%] lg:w-[10%]">Parcel</th>
                <th className="hidden lg:table-cell w-[13%]">Sender</th>
                <th className="hidden sm:table-cell w-[20%] lg:w-[13%]">
                  Receiver
                </th>
                <th className="hidden lg:table-cell w-[11%]">Pickup</th>
                <th className="hidden lg:table-cell w-[12%]">Delivery</th>
                <th className="w-[25%] sm:w-[18%] lg:w-[10%]">Status</th>
                <th className="w-[25%] sm:w-[25%] lg:w-[14%]">Action</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id} className="hover">
                  {/* Serial */}
                  <td className="hidden lg:table-cell">{index + 1}</td>

                  {/* Tracking ID */}
                  <td className="hidden sm:table-cell break-all text-sm">
                    {task.trackingId}
                  </td>

                  {/* Parcel */}
                  <td className="break-words">
                    <p className="font-medium">{task.parcelName}</p>

                    <p className="text-xs text-gray-500 capitalize">
                      {task.parcelType}
                    </p>
                  </td>

                  {/* Sender */}
                  <td className="hidden lg:table-cell break-words">
                    <p className="font-medium">{task.sender?.name}</p>

                    <p className="text-xs text-gray-500 break-all">
                      {task.sender?.contact}
                    </p>
                  </td>

                  {/* Receiver */}
                  <td className="hidden sm:table-cell break-words">
                    <p className="font-medium">{task.receiver?.name}</p>

                    <p className="text-xs text-gray-500 break-all">
                      {task.receiver?.contact}
                    </p>
                  </td>

                  {/* Pickup Location */}
                  <td className="hidden lg:table-cell break-words text-sm">
                    {task.sender?.district}, {task.sender?.region}
                  </td>

                  {/* Delivery Location */}
                  <td className="hidden lg:table-cell break-words text-sm">
                    {task.receiver?.district}, {task.receiver?.region}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`badge badge-sm h-auto max-w-full whitespace-normal break-words text-center leading-tight ${
                        task.delivery_status === "rider_assigned"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {task.delivery_status === "rider_assigned"
                        ? "Assigned"
                        : "In Transit"}
                    </span>
                  </td>

                  {/* Action */}
                  <td>
                    <button
                      type="button"
                      disabled={statusMutation.isPending}
                      onClick={() => handleStatusUpdate(task)}
                      className="btn btn-sm whitespace-normal h-auto min-h-8 w-full bg-[#CAEB66] hover:bg-[#9FC83F] border-0 text-black"
                    >
                      {task.delivery_status === "rider_assigned"
                        ? "Pick Up"
                        : "Mark Delivered"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-12 text-center">
          <h3 className="text-lg font-semibold">No Pending Deliveries</h3>

          <p className="mt-2 text-sm text-gray-500">
            You currently have no delivery tasks.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;

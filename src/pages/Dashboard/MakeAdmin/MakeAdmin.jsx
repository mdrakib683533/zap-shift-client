import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Search input value
  const [email, setEmail] = useState("");

  // Message for empty search
  const [searchMessage, setSearchMessage] = useState("");

  // =========================
  // Search Handler
  // =========================
  const handleSearch = () => {
    // Check if search input is empty
    if (!email.trim()) {
      setSearchMessage("Please type an email address before searching.");
      return;
    }

    // Clear message
    setSearchMessage("");
  };

  // =========================
  // Enter Key Handler
  // =========================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // =========================
  // User Search
  // =========================
  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    // Email changes -> query runs again
    queryKey: ["userSuggestions", email.trim()],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/suggestions?email=${encodeURIComponent(email.trim())}`,
      );

      return res.data;
    },

    // Search automatically when user types
    enabled: email.trim().length > 0,
  });

  // =========================
  // Make Admin Mutation
  // =========================
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/make-admin`);

      return res.data;
    },

    onSuccess: (_, id) => {
      // Update current search result immediately
      // No page refresh required
      queryClient.setQueryData(
        ["userSuggestions", email.trim()],
        (oldUsers = []) =>
          oldUsers.map((user) =>
            user._id === id ? { ...user, role: "admin" } : user,
          ),
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User is now an admin.",
      });
    },

    onError: (error) => {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not make this user an admin.",
      });
    },
  });

  // =========================
  // Remove Admin Mutation
  // =========================
  const removeAdminMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/${id}/remove-admin`);

      return res.data;
    },

    onSuccess: (_, id) => {
      // Update current search result immediately
      // No page refresh required
      queryClient.setQueryData(
        ["userSuggestions", email.trim()],
        (oldUsers = []) =>
          oldUsers.map((user) =>
            user._id === id ? { ...user, role: "user" } : user,
          ),
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Admin role removed.",
      });
    },

    onError: (error) => {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not remove admin role.",
      });
    },
  });

  // =========================
  // Make Admin
  // =========================
  const handleMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Make Admin?",
      text: "Are you sure you want to make this user an admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      makeAdminMutation.mutate(id);
    }
  };

  // =========================
  // Remove Admin
  // =========================
  const handleRemoveAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Remove Admin?",
      text: "Are you sure you want to remove admin role?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      removeAdminMutation.mutate(id);
    }
  };

  // =========================
  // Mutation Loading
  // =========================
  const isMutationLoading =
    makeAdminMutation.isPending || removeAdminMutation.isPending;

  return (
    <div className="p-6">
      {/* =========================
          Page Heading
      ========================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Users</h1>

        <p className="mt-2 text-gray-500">
          Search users by email and manage their roles.
        </p>
      </div>

      {/* =========================
          Search Box
      ========================= */}
      <div className="mb-8 max-w-2xl">
        <div className="flex gap-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search user by email..."
            className="input input-bordered flex-1"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);

              // Clear message when user starts typing
              if (e.target.value.trim()) {
                setSearchMessage("");
              }
            }}
            onKeyDown={handleKeyDown}
          />

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-primary"
          >
            Search
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Type any part of an email to see up to 10 relevant users.
        </p>

        {/* Empty Search Message */}
        {searchMessage && (
          <p className="mt-2 text-sm font-medium text-error">{searchMessage}</p>
        )}
      </div>

      {/* =========================
          Loading
      ========================= */}
      {isUsersLoading && (
        <div className="py-8 text-center">
          <span className="loading loading-spinner loading-md"></span>

          <p className="mt-2 text-sm text-gray-500">Searching users...</p>
        </div>
      )}

      {/* =========================
          User Table
      ========================= */}
      {!isUsersLoading && email.trim() && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border bg-base-100 shadow">
          <table className="table">
            {/* Table Header */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Last Login</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover">
                  {/* Serial */}
                  <td>{index + 1}</td>

                  {/* Email */}
                  <td>
                    <div className="font-medium">{user.email}</div>
                  </td>

                  {/* Created At */}
                  <td>
                    <span className="text-sm">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleString()
                        : "N/A"}
                    </span>
                  </td>

                  {/* Last Login */}
                  <td>
                    <span className="text-sm">
                      {user.last_log_in
                        ? new Date(user.last_log_in).toLocaleString()
                        : "N/A"}
                    </span>
                  </td>

                  {/* Role */}
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-primary">Admin</span>
                    ) : (
                      <span className="badge badge-ghost">User</span>
                    )}
                  </td>

                  {/* Action */}
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user._id)}
                        className="btn btn-sm btn-error"
                        disabled={isMutationLoading}
                      >
                        {removeAdminMutation.isPending
                          ? "Removing..."
                          : "Remove Admin"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-sm btn-primary"
                        disabled={isMutationLoading}
                      >
                        {makeAdminMutation.isPending
                          ? "Making Admin..."
                          : "Make Admin"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* =========================
          No User Found
      ========================= */}
      {!isUsersLoading && email.trim() && users.length === 0 && (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium">No users found</p>

          <p className="mt-1 text-sm text-gray-500">
            No user matches "{email.trim()}".
          </p>
        </div>
      )}

      {/* =========================
          Initial Message
      ========================= */}
      {!email.trim() && !searchMessage && (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="font-medium">Search for users</p>

          <p className="mt-1 text-sm text-gray-500">
            Start typing an email address above.
          </p>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;

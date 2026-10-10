import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      photoURL: "",
    },
  });

  // Update form values when Firebase user data is available
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user, reset]);

  // Update profile using TanStack Query mutation
  const profileMutation = useMutation({
    mutationFn: async (profileData) => {
      if (!user) {
        throw new Error("Please log in first.");
      }

      await updateUserProfile({
        displayName: profileData.name.trim(),
        photoURL: profileData.photoURL.trim(),
      });

      // Refresh Firebase user information
      await user.reload();

      return user;
    },

    onSuccess: async () => {
      // Update the form with the latest Firebase profile information
      reset({
        name: user?.displayName || "",
        photoURL: user?.photoURL || "",
      });

      await Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        confirmButtonColor: "#00BF83",
      });
    },

    onError: (error) => {
      console.error("Profile update failed:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Could not update your profile.",
        confirmButtonColor: "#00BF83",
      });
    },
  });

  const handleUpdateProfile = (data) => {
    profileMutation.mutate(data);
  };

  const isUpdating = profileMutation.isPending;

  return (
    <div className="mt-3 mx-auto w-full max-w-2xl">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        {/* Page heading */}
        <h1 className="text-2xl font-bold sm:text-3xl">Update Profile</h1>

        <p className="mt-2 text-sm opacity-70">
          Update your name and profile photo.
        </p>

        {/* Current profile information */}
        <div className="my-6 flex items-center gap-4">
          <div className="avatar">
            <div className="w-20 rounded-full ring-2 ring-[#00BF83] ring-offset-2 ring-offset-base-100">
              <img
                src={user?.photoURL || "https://placehold.co/100x100?text=User"}
                alt="Profile"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold">
              {user?.displayName || "User"}
            </h2>

            <p className="truncate text-sm opacity-60">{user?.email}</p>
          </div>
        </div>

        {/* Update profile form */}
        <form
          onSubmit={handleSubmit(handleUpdateProfile)}
          className="space-y-5"
        >
          {/* Name field */}
          <div>
            <label className="mb-2 block font-medium">Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              className={`input input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters.",
                },
                validate: (value) =>
                  value.trim().length >= 2 || "Please enter a valid name.",
              })}
            />

            {errors.name && (
              <p className="mt-1 text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          {/* Profile photo URL field */}
          <div>
            <label className="mb-2 block font-medium">Profile Photo URL</label>

            <input
              type="url"
              placeholder="Paste your profile photo URL"
              className={`input input-bordered w-full ${
                errors.photoURL ? "input-error" : ""
              }`}
              {...register("photoURL", {
                validate: (value) => {
                  if (!value.trim()) return true;

                  try {
                    const url = new URL(value);
                    return (
                      ["http:", "https:"].includes(url.protocol) ||
                      "Please enter a valid photo URL."
                    );
                  } catch {
                    return "Please enter a valid photo URL.";
                  }
                },
              })}
            />

            {errors.photoURL && (
              <p className="mt-1 text-sm text-error">
                {errors.photoURL.message}
              </p>
            )}

            <p className="mt-1 text-xs opacity-60">
              Enter a publicly accessible image URL.
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!user || isUpdating}
            className="btn w-full border-none bg-[#00BF83] text-white hover:bg-[#009D6B] disabled:opacity-60"
          >
            {isUpdating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating Profile...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;

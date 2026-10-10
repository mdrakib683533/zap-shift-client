import { useState } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaClock,
  FaSearch,
  FaExclamationCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();

  const [searchParams] = useSearchParams();

  // Get tracking ID from URL
  const urlTrackingId = searchParams.get("trackingId") || "";

  // Store the tracking ID entered by the user
  const [trackingId, setTrackingId] = useState(urlTrackingId);

  // Store the tracking ID used for searching
  const [searchedTrackingId, setSearchedTrackingId] = useState(
    urlTrackingId.trim(),
  );

  // Fetch tracking updates using TanStack Query
  const {
    data: trackingUpdates = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tracking", searchedTrackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tracking/${encodeURIComponent(searchedTrackingId)}`,
      );

      return res.data;
    },
    enabled: Boolean(searchedTrackingId),
    retry: false,
  });

  // Handle tracking search
  const handleTrack = (e) => {
    e.preventDefault();

    const trimmedTrackingId = trackingId.trim();

    if (!trimmedTrackingId) {
      setSearchedTrackingId("");
      return;
    }

    setSearchedTrackingId(trimmedTrackingId);
  };

  // Format tracking status
  const formatStatus = (status = "") =>
    status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

  // Get an icon based on tracking status
  const getStatusIcon = (status = "") => {
    switch (status.toLowerCase()) {
      case "parcel_submitted":
        return <FaBoxOpen />;

      case "in_transit":
        return <FaTruck />;

      case "delivered":
        return <FaCheckCircle />;

      default:
        return <FaBoxOpen />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00BF83]/10 text-3xl text-[#00BF83]">
            <FaTruck />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Track Your Parcel
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base-content/60">
            Stay updated on your delivery journey. Enter your tracking ID to see
            the latest parcel status.
          </p>
        </div>

        {/* Tracking search card */}
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
          <form
            onSubmit={handleTrack}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter your tracking ID"
                aria-label="Tracking ID"
                className="input input-bordered h-12 w-full pl-11 focus:border-[#00BF83] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn h-12 border-none bg-[#B8D469] px-8 text-gray-900 hover:bg-[#A6C45B]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Tracking...
                </>
              ) : (
                <>
                  <FaSearch />
                  Track Parcel
                </>
              )}
            </button>
          </form>

          {/* Empty input message */}
          {!searchedTrackingId && trackingId.trim() === "" && (
            <p className="mt-3 flex items-center gap-2 text-sm text-error">
              <FaExclamationCircle />
              Enter a tracking ID to track your parcel.
            </p>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
            <span className="loading loading-spinner loading-lg text-[#00BF83]"></span>
            <p className="mt-3 font-medium text-base-content/60">
              Loading tracking information...
            </p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="mt-8 rounded-2xl border border-error/20 bg-base-100 p-6 text-center">
            <FaExclamationCircle className="mx-auto text-3xl text-error" />

            <h3 className="mt-3 text-lg font-bold">Unable to Track Parcel</h3>

            <p className="mt-2 text-sm text-base-content/60">
              {error?.response?.status === 404
                ? "Tracking information not found."
                : "Failed to load tracking information. Please try again."}
            </p>
          </div>
        )}

        {/* Empty tracking history */}
        {!isLoading &&
          !isError &&
          searchedTrackingId &&
          trackingUpdates.length === 0 && (
            <div className="mt-8 rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
              <FaBoxOpen className="mx-auto text-4xl text-base-content/30" />

              <h3 className="mt-3 text-lg font-bold">
                No Tracking Updates Yet
              </h3>

              <p className="mt-2 text-sm text-base-content/60">
                No tracking history was found for this parcel. Please check your
                tracking ID.
              </p>
            </div>
          )}

        {/* Tracking timeline */}
        {!isLoading && !isError && trackingUpdates.length > 0 && (
          <div className="mt-10">
            {/* Tracking history heading */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Tracking History</h3>

                <p className="mt-1 text-sm text-base-content/60">
                  Follow your parcel's delivery progress.
                </p>
              </div>

              <span className="badge badge-lg border-[#00BF83]/20 bg-[#00BF83]/10 py-4 text-[#008F63]">
                {trackingUpdates.length}{" "}
                {trackingUpdates.length === 1 ? "Update" : "Updates"}
              </span>
            </div>

            {/* Tracking ID summary */}
            <div className="mb-8 rounded-2xl bg-[#00BF83] p-5 text-white shadow-md sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
                  <FaBoxOpen />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-white/80">Tracking Number</p>

                  <h4 className="break-all text-lg font-bold sm:text-xl">
                    {searchedTrackingId}
                  </h4>
                </div>
              </div>
            </div>

            {/* Timeline entries */}
            <div className="space-y-0">
              {trackingUpdates.map((update, index) => {
                const isLast = index === trackingUpdates.length - 1;

                return (
                  <div
                    key={
                      update._id ||
                      `${update.status}-${update.createdAt}-${index}`
                    }
                    className="relative flex gap-4 sm:gap-6"
                  >
                    {/* Timeline icon and connecting line */}
                    <div className="flex w-12 shrink-0 flex-col items-center">
                      <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-base-100 bg-[#00BF83] text-lg text-white shadow-sm">
                        {getStatusIcon(update.status)}
                      </div>

                      {!isLast && (
                        <div className="min-h-16 w-0.5 flex-1 bg-[#00BF83]/30"></div>
                      )}
                    </div>

                    {/* Tracking update card */}
                    <div className="mb-6 min-w-0 flex-1 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="mb-2 inline-flex rounded-full bg-[#00BF83]/10 px-3 py-1 text-xs font-semibold text-[#008F63]">
                            Update {index + 1}
                          </span>

                          <h4 className="text-lg font-bold">
                            {formatStatus(update.status)}
                          </h4>
                        </div>

                        {update.status?.toLowerCase() === "delivered" && (
                          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#00BF83]/10 px-3 py-2 text-sm font-semibold text-[#008F63]">
                            <FaCheckCircle />
                            Delivered
                          </span>
                        )}
                      </div>

                      <p className="mt-3 leading-relaxed text-base-content/70">
                        {update.message}
                      </p>

                      <div className="mt-5 flex flex-col gap-3 border-t border-base-300 pt-4 text-sm text-base-content/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                        <p className="flex items-start gap-2">
                          <FaMapMarkerAlt className="mt-1 shrink-0 text-[#00BF83]" />
                          <span>
                            <span className="font-semibold text-base-content/80">
                              Location:
                            </span>{" "}
                            {update.location || "Not available"}
                          </span>
                        </p>

                        <p className="flex items-start gap-2">
                          <FaClock className="mt-1 shrink-0 text-[#00BF83]" />
                          <span>
                            {new Date(update.createdAt).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackParcel;

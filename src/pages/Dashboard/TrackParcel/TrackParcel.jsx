import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TrackParcel = () => {
  const axiosSecure = useAxiosSecure();

  const [searchParams] = useSearchParams();

  const urlTrackingId = searchParams.get("trackingId");

  const [trackingId, setTrackingId] = useState(urlTrackingId || "");
  const [trackingUpdates, setTrackingUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axiosSecure.get(`/tracking/${trackingId.trim()}`);

      setTrackingUpdates(res.data);
    } catch (error) {
      console.error(error);

      setTrackingUpdates([]);
      setError("Tracking information not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlTrackingId) {
      handleTrack();
    }
  }, [urlTrackingId]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Track Your Parcel</h2>

        <p className="text-gray-500 mt-2">
          Enter your tracking ID to see your parcel's latest updates.
        </p>
      </div>

      <div className="flex gap-3 max-w-2xl mx-auto">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Enter tracking ID"
          className="input input-bordered w-full"
        />

        <button
          onClick={handleTrack}
          className="btn bg-[#B8D469] hover:bg-[#A6C45B]"
          disabled={loading}
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Tracking timeline এখানে হবে */}
    </div>
  );
};

export default TrackParcel;

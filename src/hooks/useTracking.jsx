import { useCallback } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useTracking = () => {
  const axiosSecure = useAxiosSecure();

  const addTrackingUpdate = useCallback(
    async ({ parcelId, trackingId, status, message, location }) => {
      const trackingData = {
        parcelId,
        trackingId,
        status,
        message,
        location,
      };

      const res = await axiosSecure.post("/tracking", trackingData);

      return res.data;
    },
    [],
  );

  return {
    addTrackingUpdate,
  };
};

export default useTracking;

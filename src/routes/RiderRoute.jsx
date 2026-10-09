import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();

  if (loading || isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "rider") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }

  return children;
};

export default RiderRoute;

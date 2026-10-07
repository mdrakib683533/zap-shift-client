import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userRole", user?.email],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/role/${encodeURIComponent(user.email)}`,
      );

      return res.data.role;
    },

    enabled: !!user?.email,
  });

  return {
    role,
    isLoading,
    isError,
  };
};

export default useUserRole;

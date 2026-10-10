import Loading from "../../../components/Loading";
import useUserRole from "../../../hooks/useUserRole";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, isLoading} = useUserRole();

  if(isLoading){
    return <Loading></Loading>
  }

  if(role === 'user'){
    return <UserDashboard></UserDashboard>
  }
  else if(role === 'rider'){
    return <RiderDashboard></RiderDashboard>
  }
  else if(role === 'admin'){
    return <AdminDashboard></AdminDashboard>
  }
  else {
    return <Forbidden></Forbidden>
  }
};

export default DashboardHome;

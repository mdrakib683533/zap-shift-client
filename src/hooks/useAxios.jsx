import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://zap-shift-server-fnrucb1rz-mdrakib683533s-projects.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;

import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log(result.user);

        // Update user information in the database
        const userInfo = {
          email: user.email,
          role: "user",
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log("User update info", res.data);

        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full">
      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="group flex h-[50px] w-full items-center justify-center gap-3 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content transition-colors duration-200 hover:border-[#00BF83]/50 hover:bg-[#00BF83]/5 focus:outline-none focus:ring-4 focus:ring-[#00BF83]/10 active:scale-[0.99]"
      >
        {/* Google Logo */}
        <svg
          aria-label="Google logo"
          role="img"
          width="19"
          height="19"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            fill="#4285F4"
            d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
          />
          <path
            fill="#34A853"
            d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
          />
          <path
            fill="#FBBC05"
            d="M12.6 27.5a12 12 0 0 1 0-7v-5.3H5.8a20 20 0 0 0 0 17.6l6.8-5.3Z"
          />
          <path
            fill="#EA4335"
            d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
          />
        </svg>

        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;

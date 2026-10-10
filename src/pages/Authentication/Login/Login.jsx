import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { FaTruck, FaArrowRight, FaLock } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import authImage from "../../../assets/authImage.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const { signIn, resetPassword } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  // Login with email and password
  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      await Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "You have successfully signed in to Zap Shift.",
        confirmButtonColor: "#03373D",
      });

      navigate(from);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.code === "auth/invalid-credential"
            ? "Incorrect email or password. Please try again."
            : error.code === "auth/too-many-requests"
              ? "Too many attempts. Please try again later."
              : error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#03373D",
      });
    }
  };

  // Send password reset email
  const handleForgotPassword = async () => {
    const email = getValues("email")?.trim();

    if (!email) {
      Swal.fire({
        icon: "info",
        title: "Enter Your Email",
        text: "Please enter your email address first.",
        confirmButtonColor: "#03373D",
      });
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!validEmail) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#03373D",
      });
      return;
    }

    try {
      await resetPassword(email);

      await Swal.fire({
        icon: "success",
        title: "Reset Link Sent!",
        text: "Check your email inbox for the password reset link. If you don't see it, check your spam folder.",
        confirmButtonColor: "#03373D",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Unable to Send Reset Link",
        text:
          error.code === "auth/invalid-email"
            ? "Please check your email address."
            : error.code === "auth/too-many-requests"
              ? "Too many requests. Please try again later."
              : error.message || "Please try again later.",
        confirmButtonColor: "#03373D",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4FAF8] via-white to-[#F0F8E8] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#00BF83]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#B8D469]/20 blur-3xl" />

      {/* Main two-column layout */}
      <div className="relative mx-auto grid w-full max-w-[1500px] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 xl:gap-14">
        {/* Left side: Centered delivery image */}
        <div className="relative mx-auto flex w-full max-w-[650px] items-center justify-center lg:max-w-none">
          <div className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-[#00BF83]/10 via-white/40 to-[#B8D469]/20 blur-2xl sm:inset-12" />

          <div className="relative flex w-full items-center justify-center">
            <img
              src={authImage}
              alt="Zap Shift parcel delivery"
              className="mx-auto h-auto max-h-[620px] w-full object-contain drop-shadow-xl"
            />
          </div>
        </div>

        {/* Right side: Login form */}
        <div className="mx-auto w-full max-w-[620px] lg:ml-auto lg:mr-0">
          <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-2xl shadow-[#03373D]/10 sm:rounded-[32px]">
            {/* Brand accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#03373D] via-[#00BF83] to-[#B8D469]" />

            <div className="p-6 sm:p-9 lg:p-10 xl:p-11">
              {/* Centered Header */}
              <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00BF83]/10 text-[#009966] ring-1 ring-[#00BF83]/10">
                  <FaTruck className="text-2xl" />
                </div>

                <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#009966]">
                  ZAP SHIFT ACCOUNT
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-[#03373D] sm:text-4xl">
                  Welcome back<span className="text-[#00BF83]">.</span>
                </h1>

                <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
                  Sign in to manage your parcels and deliveries.
                </p>
              </div>

              {/* Login form */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="login-email"
                      className="mb-2 block text-sm font-bold text-[#03373D]"
                    >
                      Email address
                    </label>

                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      {...register("email", {
                        required: "Email address is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                      className={`h-[54px] w-full rounded-xl border bg-[#F8FAF9] px-4 text-sm text-[#03373D] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#00BF83] focus:bg-white focus:ring-4 focus:ring-[#00BF83]/10 ${
                        errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="login-password"
                        className="text-sm font-bold text-[#03373D]"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-xs font-bold text-[#009966] transition-colors hover:text-[#03373D] hover:underline sm:text-sm"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required.",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters.",
                        },
                      })}
                      className={`h-[54px] w-full rounded-xl border bg-[#F8FAF9] px-4 text-sm text-[#03373D] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#00BF83] focus:bg-white focus:ring-4 focus:ring-[#00BF83]/10 ${
                        errors.password ? "border-red-400" : "border-gray-200"
                      }`}
                    />

                    {errors.password && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Sign in button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#03373D] px-5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#00A873] focus:outline-none focus:ring-4 focus:ring-[#00BF83]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}

                    {!isSubmitting && (
                      <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </div>

                {/* Register link */}
                <p className="mt-6 text-center text-sm text-gray-500">
                  New to Zap Shift?
                  <Link
                    to="/register"
                    state={{ from }}
                    className="ml-1 font-extrabold text-[#009966] transition-colors hover:text-[#03373D]"
                  >
                    Create an account
                  </Link>
                </p>
              </form>

              {/* Google login */}
              <div className="mt-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] font-bold tracking-[0.15em] text-gray-400 sm:text-xs">
                    OR CONTINUE WITH
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <SocialLogin />
              </div>

              {/* Security note */}
              <div className="mt-7 flex items-center justify-center gap-2 text-xs text-gray-400">
                <FaLock className="text-[#00A873]" />
                Secure access to your delivery dashboard.
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Your delivery journey starts here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
